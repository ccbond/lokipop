# LOKIPOP

Experience Loki on edge runtime as effortlessly as enjoying a lollipop.

## Installation

```bash
pnpm install
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

## License
