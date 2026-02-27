# Contributing to Codetopia

> *A utopia for tech enthusiasts — and we are glad you are here.*

First off, thank you for taking the time to contribute to Codetopia! Every contribution, big or small, helps us build a better community for tech enthusiasts everywhere.

Please take a moment to read this guide before you get started.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to keeping Codetopia a welcoming and inclusive space for everyone.

---

## How to Contribute

### 1. Fork the Repository

Click the **Fork** button at the top right of the repo to create your own copy under your GitHub account.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/community-website.git
cd community-website
```

### 3. Set Up the Project

```bash
pnpm install
```

### 4. Create a Branch

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

### 5. Make Your Changes

Make sure your code is clean and follows our style guidelines. We use **Biome** for linting and formatting. Run this before committing:

```bash
pnpm biome check .
```

### 6. Commit Your Changes

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

### 7. Push to Your Fork

```bash
git push origin feat/your-feature-name
```

### 8. Open a Pull Request

Go to the original Codetopia repository and open a Pull Request from your fork into the **`dev`** branch.

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
| Staging | [staging.codetopia.org](https://staging.codetopia.org) |
| Production | [codetopia.org](https://codetopia.org) |

---

## Branch Structure

| Branch | Purpose |
|--------|---------|
| `main` | Production — live at codetopia.org |
| `dev` | Staging — preview at staging.codetopia.org |
| `feat/*` | Feature branches |
| `fix/*` | Bug fix branches |
| `docs/*` | Documentation branches |
| `chore/*` | Maintenance branches |

---

## Need Help?

If you are stuck or have questions, feel free to:

- Open an issue on GitHub
- Reach out on our [Discord](#)
- Visit [codetopia.org](https://codetopia.org)

We are happy to help. Welcome to the community! 🚀
