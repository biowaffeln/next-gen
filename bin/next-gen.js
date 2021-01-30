#!/usr/bin/env node

require = require("esm")(module)
require("../src/main").cli(process.argv)
