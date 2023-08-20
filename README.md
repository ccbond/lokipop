![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/ccbond/lokipop/publish.yml)
![npm](https://img.shields.io/npm/v/%40syntsugar%2Flokipop)
![NPM](https://img.shields.io/npm/l/%40syntsugar%2Flokipop)

# LOKIPOP

Experience Loki on edge runtime as effortlessly as enjoying a lollipop.

## Installation

```bash
pnpm i @syntsugar/lokipop
```

## Usage

```typescript
const logger = new LokiLogger({
  url: "http://example.com",
});

logger.debug("Test Debug Message");

await logger.send();
```

## ChangeLog

For detailed changelog, check [CHANGELOG.md](./CHANGELOG.md).

## License

This project is licensed under the MIT License. See the included [LICENSE](./LICENSE) file for more details.
