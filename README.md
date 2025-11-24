# Meetup App

A modern web application built with Next.js for discovering and creating meetups. Browse meetups, view details, and add your own events to connect with the community.

## Features

- **Browse Meetups** — View all available meetups on the home page
- **Meetup Details** — Click on any meetup to see full details (title, address, image, description)
- **Create Meetups** — Add new meetups through an intuitive form
- **Dynamic SEO** — Page titles and meta descriptions update based on meetup data
- **Static Generation** — Pre-rendered pages with incremental static regeneration (ISR)
- **Database Integration** — MongoDB integration for persistent data storage

## Tech Stack

- **Framework** — Next.js 15+ (App Router)
- **UI Library** — React 18+
- **Database** — MongoDB
- **Styling** — CSS (custom components)
- **Runtime** — Node.js

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB connection string

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd meetup-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── page.js                 # Home page (all meetups)
│   ├── new-meetup/
│   │   ├── page.js            # Create new meetup page
│   │   └── layout.js          # Layout with metadata
│   ├── [meetupId]/
│   │   └── page.js            # Meetup detail page
│   ├── api/
│   │   └── new-meetup/
│   │       └── route.js       # API endpoint for creating meetups
│   └── layout.js              # Root layout
├── components/
│   └── meetups/
│       ├── MeetupList.jsx     # List component
│       ├── MeetupDetail.jsx   # Detail component
│       └── NewMeetupForm.jsx  # Form component
└── page.css                    # Styles
```

## API Routes

### POST `/api/new-meetup`

Create a new meetup.

**Request body:**

```json
{
  "title": "React Meetup",
  "address": "123 Main St, City",
  "image": "https://example.com/image.jpg",
  "description": "A meetup for React enthusiasts"
}
```

**Response:**

```json
{
  "message": "Meetup created successfully",
  "meetupId": "507f1f77bcf86cd799439011"
}
```

## Environment Variables

Store your MongoDB connection string in a `.env.local` file (not included in version control):

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=...
```

## Key Features Explained

### Static Site Generation (SSG) with ISR

- Home page pre-renders all meetups at build time
- Detail pages pre-render based on `generateStaticParams()`
- Pages revalidate every 10 seconds (`revalidate = 10`)

### Dynamic Metadata

- Page titles and descriptions update based on meetup data
- Uses `generateMetadata()` function in detail page

### Server & Client Components

- Pages use Server Components for data fetching
- Forms use `"use client"` directive for interactivity

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server

## License

MIT
