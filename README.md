## DB Per Tenant App
 
This is a DB Per Tenant application designed for multi-tenant architectures. It isolates tenant data by creating a dedicated database for each tenant, ensuring robust data segregation, enhanced security, and scalability.

### Key Features
- Tenant Database Isolation: Each tenant gets its own database to eliminate data leakage risks.
- Dynamic Database Connection: Seamlessly connects to the correct tenant database based on the incoming request.
- Automated Provisioning: Efficiently provisions databases for new tenants with initialization scripts and schema migrations.
- Scalability: Supports horizontal scaling by offloading tenant databases to different database servers.
- Middleware Integration: Includes middleware to handle tenant identification and connection management.

### Use Cases
- SaaS platforms requiring multi-tenant architecture.
- Applications with strict data segregation policies.
- Systems aiming to achieve scalability while maintaining high security standards.

### Tech Stack
- Backend: Nitro
- Database: Turso(SQLite)
- Deployment: Coolify

## How to Setup

- Make sure to install the dependencies using `pnpm install`
- Run `pnpm dlx simple-git-hooks`
- Run `pnpm run dev` to start the local Nuxt dev server
- To build the application for production use `pnpm run build`

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

