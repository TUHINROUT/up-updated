# Upvik — Digital Marketing Agency Website

Next.js 14 App Router homepage for Upvik, Bhubaneswar's digital marketing agency.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
upvik/
├── app/
│   ├── layout.tsx      # Root layout + metadata
│   ├── globals.css     # Global styles
│   └── page.tsx        # Homepage (single-page)
├── next.config.js
├── tsconfig.json
└── package.json
```

## Stack
- Next.js 14 (App Router)
- TypeScript
- CSS via globals.css (no Tailwind dependency)
- Images from Unsplash (configured in next.config.js)
