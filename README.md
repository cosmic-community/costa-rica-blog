# Costa Rica Surf Blog

![Costa Rica Surf Blog](https://imgix.cosmicjs.com/ab577de0-7014-11f0-a051-23c10f41277a-photo-1559827260-dc66d52bef19-1754189452380.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive surf blog built with Next.js 15 and powered by Cosmic CMS. Showcasing Costa Rica's best waves, beaches, and surf culture with dynamic content management.

## ✨ Features

- **Responsive Design** - Optimized for all devices and screen sizes
- **Dynamic Blog Posts** - Full markdown content rendering with featured images
- **Category Filtering** - Browse by Beach Guides, Beginner Guides, Gear Reviews, and Surf Reports
- **Author Profiles** - Detailed author pages with bios and social links
- **Surf Conditions** - Wave height and condition reporting
- **SEO Optimized** - Dynamic meta tags and structured content
- **Image Optimization** - Automatic image optimization using imgix
- **Modern UI** - Clean, ocean-inspired design with tropical colors

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=688ece0da07f0c8e05e4d0d5&clone_repository=688ed93da07f0c8e05e4d0f2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a Costa Rica surf blog with posts, authors, and categories

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Content Management:** Cosmic CMS
- **Language:** TypeScript
- **Font:** Inter
- **Image Optimization:** imgix
- **Deployment:** Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your Costa Rica surf blog bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables in `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching All Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Posts by Category
```typescript
const categoryPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Single Post
```typescript
const post = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: postSlug
  })
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This application integrates with your Cosmic bucket structure:

- **Posts** - Blog articles with title, content, featured images, and metadata
- **Authors** - Writer profiles with bios, photos, and social links  
- **Categories** - Content organization with descriptions and color coding
- **Relationships** - Posts connected to authors and categories using object metafields

The app uses the Cosmic SDK to fetch content with proper depth settings to include related objects like authors and categories in a single request.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Other Platforms
This Next.js app can be deployed to any platform that supports Node.js applications.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) headless CMS.
<!-- README_END -->