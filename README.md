# Content APP - Sanity Studio

Sanity.io v5, with a focus on schema customization, data migrations, SEO optimization, and content management. The deployed studio is available at https://app-sanity-content.vercel.app/.

## Project Purpose

This project demonstrates advanced Sanity.io features including:
- Custom schema types with validation rules and role-based access control
- SEO field management with reusable configurations
- Data migrations using Sanity's migration API
- Organized desk structure with filtering and sorting
- TypeScript-based type safety for all schema definitions

## Custom Schema Types

### 1. **CMS Page**
- **Purpose:** Create and manage general pages on the website
- **Key Fields:**
  - `pageId`: Unique identifier with custom uniqueness validation
  - `enabled`: Toggle page visibility on the website
  - `title`: Page title (used for slug generation)
  - `slug`: URL-friendly identifier (admin-only modifications)
  - `content`: Rich text content with multiple formatting options (block text, headings, quotes, lists)
  - **SEO Group:** Dedicated SEO fields (title, description, image)

### 2. **Portfolio**
- **Purpose:** Showcase projects with rich details and media
- **Key Fields:**
  - `enabled`: Toggle project visibility
  - `sortOrder`: Control the display order of projects (1-50)
  - `title`: Project name
  - `slug`: URL-friendly identifier (auto-generated from title, admin-only modifications)
  - `projectUrl`: Link to live project or repository
  - `description`: Rich text project description
  - `skills`: References to associated skill tags
  - **Media Group:** Main image and additional images for galleries
  - **SEO Group:** Dedicated SEO fields with default title generation

### 3. **Skill**
- **Purpose:** Manage reusable skill tags for portfolio projects
- **Key Fields:**
  - `title`: Skill name (required, unique)

## Custom Features

### SEO Configuration
- **Reusable SEO Fields:** Centralized `seoConfig.ts` provides consistent SEO fields (title, description, image) across multiple document types
- **Flexible SEO Management:** Pages and portfolios include dedicated SEO tabs for metadata optimization
- **Social Media Support:** SEO images can be used for social media sharing and search engine previews

### Custom Desk Structure
The studio's desk structure provides organized navigation with intelligent filtering:

**CMS Pages Section:**
- All Pages - View all pages regardless of status
- Active Pages - View only enabled pages
- Inactive Pages - View only disabled pages

**Portfolio Section:**
- All Projects - View all portfolio items sorted by sort order (descending)
- Projects Enabled - View enabled projects only
- Projects Disabled - View disabled projects only

**Skills Section:**
- Direct access to manage skills

### Data Migrations
- **Portfolio SEO Migration:** Automatically populates missing SEO titles and descriptions for portfolio items
  - Uses project title as a base for SEO title generation
  - Converts portable text blocks to plain text for SEO descriptions
  - Only updates missing fields to preserve manual edits

## Validation & Access Control
- **Custom Validation Rules:** Ensures data integrity with role-based validation (e.g., only admins can modify slugs)
- **Required Fields:** Title, slug, and sort order are enforced for specific document types
- **Unique Constraints:** Page IDs must be unique across the dataset
- **URL Validation:** Project URLs are validated for proper HTTP/HTTPS formatting

## Development

### Getting Started (Locally)
```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev

# The studio will be available at http://localhost:3334/
```

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm deploy` - Deploy to Sanity hosted platform
- `pnpm deploy-graphql` - Deploy GraphQL API updates

## Learning Resources

For more information about Sanity.io:

- [Getting Started with Sanity](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Schema Types Documentation](https://www.sanity.io/docs/schema-types)
- [Portable Text Documentation](https://www.sanity.io/docs/portable-text)
- [Desk Structure Customization](https://www.sanity.io/docs/structure-builder)
- [Migrations Guide](https://www.sanity.io/docs/migrations)
- [Join the Sanity Community](https://www.sanity.io/community/join?utm_source=readme)