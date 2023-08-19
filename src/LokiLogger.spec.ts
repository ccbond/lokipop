// Copyright (c) 2023 ccbond
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { LokiLogger } from "./LokiLogger";
import fetchMock from "jest-fetch-mock";

describe("LokiLogger", () => {
  const logger = new LokiLogger({
    url: "http://example.com",
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should correctly initialize", () => {
    expect(logger).toBeInstanceOf(LokiLogger);
  });

  it("should add debug logs", () => {
    logger.debug("Test Debug Message");
    expect(logger["logs"]).toHaveLength(1); // assuming `logs` is private in LokiLogger
  });

  it("should send logs correctly", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: "ok" }));

    logger.debug("Test Debug Message");
    const response = await logger.send();

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      "http://example.com/loki/api/v1/push"
    );
    const payload = JSON.parse(fetchMock.mock.calls[0][1]!.body as string);
    expect(payload.streams[0].values[0][1]).toEqual("Test Debug Message");
    expect(response).toBeDefined();
  });
});
