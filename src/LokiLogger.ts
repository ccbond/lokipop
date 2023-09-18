// Copyright (c) 2023 ccbond
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

interface LokiLogPayload {
  level: "debug" | "info" | "warn" | "error";
  message: string;
  timestamp: number; // Unix timestamp, for example from Date.now()
}

export interface LokiLoggerConfig {
  url: string;
  user?: string;
  secret?: string;
  mdc?: any;
}

export class LokiLogger {
  private logs: LokiLogPayload[] = [];
  private url: string;
  private user: string;
  private secret: string;
  private mdc: any;

  constructor(config: LokiLoggerConfig) {
    this.url = config.url;
    this.user = config.user ?? "";
    this.secret = config.secret ?? "";
    this.mdc = config.mdc ?? {};
  }

  private format(
    level: LokiLogPayload["level"],
    msg: any[]
  ): LokiLogPayload {
    const message = msg.join(";");
    let timestamp = Math.floor(Date.now() / 1000);
    return {
      level,
      message,
      timestamp,
    };
  }

  async send(): Promise<Response> {
    const streams = this.logs.map((log) => {
      return {
        stream: {
          level: log.level,
          ...this.mdc,
        },
        values: [[log.timestamp.toString() + "000000000", log.message]],
      };
    });

    const sendLogsPromise = await fetch(this.url + "/loki/api/v1/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(this.user + ":" + this.secret),
      },
      body: JSON.stringify({ streams }),
    });
    return sendLogsPromise;
  }

  public debug(message: any[]) {
    const log = this.format("debug", message);
    console.log("Debug: ", message);
    this.logs.push(log);
  }

  public info(message: any[]) {
    const log = this.format("info", message);
    console.log("Info: ", message);
    this.logs.push(log);
  }

  public warn(message: any[]) {
    const log = this.format("warn", message);
    console.log("Warn: ", message);
    this.logs.push(log);
  }

  public error(message: any[]) {
    const log = this.format("error", message);
    console.log("Error: ", message);
    this.logs.push(log);
  }
}

export default LokiLogger;
