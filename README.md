# [SemantiPay](https://semantipay.vercel.app/)

An AI-powered system that automates payroll processing while meeting compliance rules worldwide.

## Architecture & Tech Implementation

<img width="1445" height="1515" alt="agentic-payroll-arch" src="https://github.com/user-attachments/assets/db90d820-5b0b-4c64-a805-ff85c9e65e11" />

## Getting Started

### Environment Variables

Copy .env.example to `.env.local` and fill in the required values:

- **PUBLIC_KEY / PRIVATE_KEY**: TiDB credentials.
- **TIDB_URL**: Connection string for the TiDB database.
- **NEXT_PUBLIC_API_BASE_URL**: Base URL of the deployed frontend ([http://localhost:3000](http://localhost:3000) if running locally).
- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY / CLERK_SECRET_KEY**: [Clerk](https://clerk.com/) authentication keys.
- **DIFY_TOKEN**: Token for Dify integration.
- **AGENTIC_MIDDLEWARE_URL**: URL of the running [Agentic Payroll Middleware](https://github.com/kumarutkarshuk/agentic-payroll-middleware) project.
- **UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN**: Credentials for Upstash Redis (used for rate limiting Next.js APIs).
- **POST_LIMIT**: rate limit per Next.js API.

### System Requirements

- **Node.js**
- **pnpm**

Install pnpm if you don't have it:
```sh
npm install -g pnpm
```

Install dependencies:
```sh
pnpm install
```

Run the development server:
   ```sh
   pnpm dev
   ```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

MIT
