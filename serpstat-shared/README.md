# Serpstat Shared Library

A shared library providing common functionality for Serpstat MCP servers.

## Installation

```bash
npm install
```

## Usage

### API Client

```typescript
import { createSerpstatClient } from './src/api-client';

const client = createSerpstatClient('your-api-key');
const response = await client.callMethod('SerpstatDomainProcedure.getDomainsInfo', {
  domains: ['example.com'],
  se: 'g_us'
});
```

### Validation Schemas

```typescript
import { BasePaginationSchema, EmailSchema, validateSchema } from './src/validation';

const pagination = validateSchema(BasePaginationSchema, { page: 1, size: 100 });
const email = validateSchema(EmailSchema, 'user@example.com');
```

### Types and Constants

```typescript
import { SEARCH_ENGINES, PAGINATION_DEFAULTS, CREDIT_INFO } from './src/types';

const isValidEngine = SEARCH_ENGINES.includes('g_us');
const defaultPageSize = PAGINATION_DEFAULTS.size;
const domainCost = CREDIT_INFO.domainsInfo; // 5 credits
```

## Build

```bash
npm run build
```

## Exports

- **api-client.ts**: HTTP client with retry logic and error handling
- **validation.ts**: Zod validation schemas and utilities
- **types.ts**: TypeScript interfaces and constants