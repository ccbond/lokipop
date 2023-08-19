// Copyright (c) 2023 ccbond
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { Config } from "jest";

const config: Config = {
  verbose: true,
  setupFiles: ["./jest.setup.js"],
};

export default config;
