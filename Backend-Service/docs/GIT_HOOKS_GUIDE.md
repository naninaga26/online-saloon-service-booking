# Git Hooks & Code Quality Guide

## Overview

This project uses **Husky** and **lint-staged** to automatically run code quality checks before commits and pushes. This ensures code quality and prevents broken code from being committed to the repository.

## 🎣 Git Hooks Setup

### Installed Tools

- **Husky** (v9.1.7) - Git hooks made easy
- **lint-staged** (v16.2.7) - Run linters on staged files

### Hook Configuration

#### Pre-Commit Hook (`.husky/pre-commit`)
Runs automatically before every commit:
- **ESLint** - Lints and auto-fixes TypeScript files
- **Prettier** - Formats code
- Only runs on **staged files** (fast!)

#### Pre-Push Hook (`.husky/pre-push`)
Runs automatically before every push:
- **Type checking** - Validates TypeScript types
- **Lint check** - Ensures no linting errors
- **Format check** - Ensures code is properly formatted
- Runs on **entire codebase** (thorough validation)

## 📝 NPM Scripts

### Linting

```bash
# Run ESLint on all TypeScript files
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Check for linting errors (fails with warnings)
npm run lint:check
```

### Formatting

```bash
# Format all TypeScript files with Prettier
npm run format

# Check if files are formatted correctly
npm run format:check
```

### Type Checking

```bash
# Run TypeScript compiler without emitting files
npm run type-check
```

### Full Validation

```bash
# Run all checks: type-check + lint:check + format:check
npm run validate
```

## 🚀 Workflow

### During Development

1. **Write code** as usual
2. **Stage files**: `git add .`
3. **Commit changes**: `git commit -m "your message"`
   - Pre-commit hook runs automatically
   - Fixes linting and formatting issues
   - Commit succeeds if no errors

### Before Pushing

1. **Push changes**: `git push`
   - Pre-push hook runs automatically
   - Validates entire codebase
   - Push succeeds only if validation passes

## 🛠️ Manual Validation

Run validation manually anytime:

```bash
# Quick check (only linting and formatting)
npm run lint:fix && npm run format

# Full validation (type-check + lint + format)
npm run validate
```

## 🔧 Configuration Files

### ESLint Configuration (`.eslintrc.json`)

```json
{
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

**Key rules:**
- Variables/args prefixed with `_` are ignored (e.g., `_req`, `_password`)
- Console statements produce warnings (except `console.warn` and `console.error`)
- `any` types produce warnings but don't fail the build

### Lint-Staged Configuration (`package.json`)

```json
{
  "lint-staged": {
    "*.ts": [
      "eslint --fix --max-warnings=0",
      "prettier --write"
    ]
  }
}
```

**Behavior:**
- Runs on staged `.ts` files only
- Auto-fixes linting issues
- Formats with Prettier
- Fails if there are any warnings or errors

## ⚠️ Common Issues & Solutions

### Issue: Pre-commit hook is slow

**Solution**: Lint-staged only runs on staged files, making it fast. If it's still slow:
- Commit smaller changesets
- Check if you have many staged files
- Consider excluding test files from hooks

### Issue: Commit fails due to warnings

**Problem**: `--max-warnings=0` in lint-staged fails on any warnings.

**Solutions**:
1. Fix the warnings (recommended)
2. Temporarily bypass: `git commit --no-verify` (not recommended)
3. Update lint-staged to allow warnings:
   ```json
   "*.ts": [
     "eslint --fix",  // Remove --max-warnings=0
     "prettier --write"
   ]
   ```

### Issue: Can't push due to validation errors

**Problem**: Pre-push validation fails.

**Solutions**:
1. Run `npm run validate` locally to see all errors
2. Fix the errors
3. Temporarily bypass: `git push --no-verify` (use with caution!)

### Issue: Unused variable error with underscore prefix

**Problem**: ESLint still complains about `_variable`.

**Solution**: Check `.eslintrc.json` has both patterns:
```json
"@typescript-eslint/no-unused-vars": ["error", {
  "argsIgnorePattern": "^_",
  "varsIgnorePattern": "^_"
}]
```

## 🔄 Updating Hooks

If hooks are updated, developers need to reinstall:

```bash
# Reinstall hooks
npm run prepare

# Or manually
npx husky install
```

## 🚫 Bypassing Hooks (Emergency Only)

**Not recommended**, but if you absolutely need to bypass hooks:

```bash
# Skip pre-commit hook
git commit --no-verify -m "emergency fix"

# Skip pre-push hook
git push --no-verify
```

**⚠️ Warning**: Bypassing hooks may introduce code quality issues. Use only in emergencies and fix issues immediately after.

## 📊 CI/CD Integration

The same validation commands are used in CI/CD:

```bash
# In CI pipeline
npm run validate
npm test
npm run build
```

This ensures local validation matches CI validation.

## 🎯 Best Practices

1. **Commit often** - Small commits are easier to validate
2. **Run `npm run lint:fix`** before committing large changes
3. **Use meaningful commit messages**
4. **Don't bypass hooks** unless absolutely necessary
5. **Fix warnings** - Don't let them accumulate

## 📚 Additional Resources

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/lint-staged/lint-staged)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

---

**Questions or issues?** Check the project's [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) or ask the team!
