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

For detailed changelog, check CHANGELOG.md.

## License

This project is licensed under the MIT License. See the included LICENSE file for more details.
