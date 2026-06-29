# Contributing to the Codetopia Community

> *A utopia for tech enthusiasts — and we are glad you are here.*

First off, thank you for taking the time to contribute to the Codetopia Community! Every contribution, big or small, helps us build a better community for tech enthusiasts everywhere.

Please take a moment to read this guide before you get started.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to keeping the Codetopia Community a welcoming and inclusive space for everyone.

---

## How to Contribute

### 1. Fork the Repository

Click the **Fork** button at the top right of the repo to create your own copy under your GitHub account.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/community-website.git
cd community-website
```

### 3. Add the Upstream Remote

```bash
git remote add upstream https://github.com/codetopiacommunity/community-website.git
```

Verify your remotes:

```bash
git remote -v
# origin    https://github.com/YOUR_USERNAME/community-website.git (fetch)
# origin    https://github.com/YOUR_USERNAME/community-website.git (push)
# upstream  https://github.com/codetopiacommunity/community-website.git (fetch)
# upstream  https://github.com/codetopiacommunity/community-website.git (push)
```

### 4. Set Up the Project

```bash
pnpm install
```

**Environment Variables**

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `RESEND_API_KEY` | Resend API key for emails |
| `EMAIL_FROM` | Sender address (e.g. `Name <email@domain.com>`) |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the app (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |
| `PORTAL_WEB_URL` | *(Optional)* Community Portal frontend URL — needed for admin SSO login |
| `PORTAL_API_URL` | *(Optional)* Community Portal backend URL — needed for admin SSO login |
| `OAUTH_CLIENT_ID` | *(Optional)* OAuth client ID from the portal — needed for admin SSO login |
| `OAUTH_CLIENT_SECRET` | *(Optional)* OAuth client secret from the portal — needed for admin SSO login |
| `OAUTH_REDIRECT_URI` | *(Optional)* OAuth redirect URI — needed for admin SSO login |

> The SSO variables are only required if you are working on the admin authentication flow. The app starts and runs normally without them.

**Database**

`pnpm install` automatically runs `prisma generate`. To apply migrations after setting `DATABASE_URL`:

```bash
npx prisma migrate dev
```

### 5. Sync With Upstream Before Branching

Always pull the latest changes from upstream before starting any work:

```bash
git checkout dev
git fetch upstream
git merge upstream/dev
git push origin dev
```

### 6. Create a Branch

Use a descriptive branch name that reflects what you are working on:

```bash
git checkout -b feat/your-feature-name
```

Branch naming conventions:

| Prefix | Use Case |
|--------|----------|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `chore/` | Maintenance or config changes |
| `docs/` | Documentation updates |
| `style/` | UI or styling changes |

### 7. Make Your Changes

Make sure your code is clean and follows our style guidelines. We use **Biome** for linting and formatting. Run this before committing:

```bash
pnpm check
```

### 8. Commit Your Changes

We follow the [Conventional Commits](https://www.conventionalcommits.org) specification. Your commit messages should follow this format:

```
type: short description
```

Examples:

```
feat: add events section to homepage
fix: correct typo in hero heading
chore: update dependencies
docs: update contributing guide
style: adjust spacing on mobile nav
```

### 9. Push to Your Fork

```bash
git push origin feat/your-feature-name
```

### 10. Open a Pull Request

Go to the original Codetopia Community repository and open a Pull Request from your fork into the **`dev`** branch.

> ⚠️ Never open a Pull Request directly into `main`.

In your PR description, please include:
- What you changed and why
- Screenshots if it's a UI change
- Any relevant issue numbers

---

## Development Setup

| Tool | Details |
|------|---------|
| Framework | Next.js (App Router) |
| Package Manager | pnpm |
| Linting & Formatting | Biome |
| UI Components | shadcn/ui |
| Production | [community.codetopia.org](https://community.codetopia.org) |

---

## Branch Structure

| Branch | Purpose |
|--------|---------|
| `main` | Production — live at community.codetopia.org |
| `dev` | Staging |
| `feat/*` | Feature branches |
| `fix/*` | Bug fix branches |
| `docs/*` | Documentation branches |
| `chore/*` | Maintenance branches |

---

## Need Help?

If you are stuck or have questions, feel free to:

- Open an issue on GitHub
- Reach out on our [Discord](https://discord.gg/nPmRWdTQAK)
- Visit [community.codetopia.org](https://community.codetopia.org)

We are happy to help. Welcome to the community! 🚀
