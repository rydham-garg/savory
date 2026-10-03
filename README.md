# Savory Restaurant Booking

A production-oriented Next.js restaurant website starter with PostgreSQL/Prisma booking availability and an admin dashboard.

## Included

- Responsive restaurant homepage
- Customer booking flow
- Date/time/guest selection
- Live table availability from PostgreSQL
- Double-booking protection using a transaction
- Admin reservation dashboard
- Prisma schema and seed data
- Deployment-ready environment configuration

## 1. Install

```bash
npm install
```

## 2. Configure PostgreSQL

Create a PostgreSQL database (Supabase, Neon, Railway, AWS RDS, etc.) and copy `.env.example` to `.env`.

Set:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/restaurant?sslmode=require"
```

## 3. Create database tables

```bash
npx prisma db push
npm run db:seed
```

## 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000

Admin preview: http://localhost:3000/admin

## 5. Production build

```bash
npm run build
npm start
```

## Deploying

### Vercel
Import this repository into Vercel and add `DATABASE_URL` under Project Settings > Environment Variables. Vercel will run the Next.js build.

### VPS / traditional hosting
Use a Node.js-capable host, install dependencies, set `DATABASE_URL`, run `npm run build`, then `npm start` behind your reverse proxy.

## Important production work before launch

This is a strong first working version, but a real restaurant launch should additionally add:

- Admin authentication and role-based authorization
- Rate limiting / bot protection
- Email/SMS/WhatsApp confirmation provider
- Reservation cancellation/reschedule flow
- Restaurant opening hours and holiday blackout dates
- Time-slot duration rules
- Table-combination logic if required
- Audit logs
- Backups and monitoring
- Privacy policy / terms / consent handling
- Final branding, menu, images and contact information

Do not put database credentials into client-side code.
