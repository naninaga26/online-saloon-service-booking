# 🤖 Claude Code Configuration Guide

This guide explains how Claude Code is configured for this project and how to customize it.

## 📁 Configuration Files Created

```
.
├── .claude/
│   ├── instructions.md    # Project-specific instructions for Claude Code
│   └── README.md          # Documentation for .claude directory
├── .claudeignore          # Files to exclude from Claude's context
└── CLAUDE_SETUP.md        # This file - configuration guide
```

## 🎯 How It Works

### 1. **Automatic Context Loading** ✅

When you use Claude Code in this project, it will automatically:

1. **Load `.claude/instructions.md`** - Project-specific guidelines
2. **Respect `.claudeignore`** - Skip excluded files
3. **Reference documentation** - Follow patterns in docs

### 2. **Documentation Structure**

Each project has comprehensive documentation that Claude follows:

```
Backend-Service/docs/
├── ARCHITECTURE.md       # System design, patterns, API structure
├── DEVELOPER_GUIDE.md    # Development workflow, coding standards
└── QUALITY_STRATEGY.md   # Testing strategy, coverage goals

Web-React/docs/
├── ARCHITECTURE.md       # Component architecture, state management
├── DEVELOPER_GUIDE.md    # React development workflow
├── STYLING_GUIDE.md      # Tailwind CSS patterns
└── QUALITY_STRATEGY.md   # Testing with Vitest/RTL

Web-Vue/docs/
├── ARCHITECTURE.md       # Vue 3 Composition API patterns
├── DEVELOPER_GUIDE.md    # Vue development workflow
├── STYLING_GUIDE.md      # Tailwind in Vue SFCs
└── QUALITY_STRATEGY.md   # Testing with Vue Test Utils
```

### 3. **Claude Code Guidelines Sections**

Each ARCHITECTURE.md file has a "🤖 Claude Code Guidelines" section with:
- Quick reference for AI development
- Common patterns to follow
- Things to avoid
- Checklist before making changes

## 🚀 Usage

### Starting a Task

Just describe what you want, Claude will automatically follow the guidelines:

```bash
# Example 1: Backend feature
User: "Add a reviews system to the booking API"

Claude will:
✅ Check Backend-Service/docs/ARCHITECTURE.md
✅ Follow layered architecture (Controller → Service → Model)
✅ Use custom error classes
✅ Add validation with Joi/Zod
✅ Write unit and integration tests
✅ Add Swagger documentation
```

```bash
# Example 2: React component
User: "Create a booking calendar component in React"

Claude will:
✅ Check Web-React/docs/ARCHITECTURE.md
✅ Follow component structure guidelines
✅ Use React Query for API calls
✅ Style with Tailwind CSS (see STYLING_GUIDE.md)
✅ Add React Hook Form for forms
✅ Write tests with React Testing Library
```

```bash
# Example 3: Vue component
User: "Create a service card component in Vue"

Claude will:
✅ Check Web-Vue/docs/ARCHITECTURE.md
✅ Use <script setup> syntax
✅ Create composable for data fetching
✅ Style with Tailwind CSS
✅ Add TypeScript interfaces
✅ Write tests with Vue Test Utils
```

### Referencing Specific Docs

You can explicitly reference docs for more control:

```bash
User: "Following the patterns in Backend-Service/docs/ARCHITECTURE.md,
       add a notifications service"
```

### Overriding Guidelines

If you need to deviate from the guidelines:

```bash
User: "Add a feature using a different pattern because [reason]"
```

## ⚙️ Configuration Options

### Option 1: `.claude/instructions.md` (Current Setup) ✅

**What it does:**
- Automatically loaded by Claude Code
- Contains project-specific instructions
- Links to all documentation

**When to use:**
- For project-wide conventions
- When you want automatic context
- Best for team collaboration

**Location:** `/.claude/instructions.md`

### Option 2: `.claudeignore`

**What it does:**
- Excludes files/directories from context
- Improves performance
- Prevents sensitive data exposure

**When to use:**
- Exclude node_modules, build outputs
- Skip large files (videos, archives)
- Hide sensitive configuration

**Location:** `/.claudeignore`

### Option 3: In-Document Guidelines

**What it does:**
- Guidelines embedded in documentation
- Context-specific rules
- Always in sync with docs

**When to use:**
- Architecture-specific patterns
- Domain-specific conventions
- Technical decisions

**Location:** Each `docs/ARCHITECTURE.md` has a "🤖 Claude Code Guidelines" section

### Option 4: MCP Servers (Advanced)

**What it does:**
- Automatic context from external sources
- Real-time data integration
- Custom tools and capabilities

**When to use:**
- Need live database access
- Custom linting/formatting tools
- CI/CD integration

**Setup:** Requires VS Code settings configuration

## 📝 Updating Configuration

### When Project Evolves

1. **Update documentation** in respective `docs/` folders
2. **Update `.claude/instructions.md`** if core workflows change
3. **Commit changes** to version control

### Adding New Patterns

1. Document the pattern in relevant `docs/ARCHITECTURE.md`
2. Add example to `docs/DEVELOPER_GUIDE.md`
3. Update `.claude/instructions.md` with quick reference
4. Add tests to `docs/QUALITY_STRATEGY.md`

## 🔍 Verifying Configuration

### Check Current Setup

```bash
# List Claude Code configuration files
ls -la .claude/
cat .claude/instructions.md

# View documentation structure
ls -R Backend-Service/docs/
ls -R Web-React/docs/
ls -R Web-Vue/docs/
```

### Test the Configuration

Start a conversation with Claude Code:

```
User: "What patterns should I follow when adding a new API endpoint?"

Expected: Claude should reference Backend-Service/docs/ARCHITECTURE.md
and explain the Controller → Service → Model pattern
```

## 💡 Best Practices

### ✅ Do

- **Keep instructions concise** - Link to detailed docs
- **Update regularly** - As project evolves
- **Be specific** - Clear guidelines are better
- **Use examples** - Show good patterns
- **Version control** - Commit .claude/ directory

### ❌ Don't

- **Duplicate documentation** - Link instead of copying
- **Include secrets** - Use .claudeignore
- **Make it too long** - Claude has context limits
- **Forget to update** - Keep in sync with code

## 🎓 Training Your Team

### For Developers

1. Read `.claude/instructions.md` to see AI guidelines
2. Read project documentation in `docs/` folders
3. Use same patterns AI follows for consistency

### For New AI Users

1. Start with simple tasks
2. Review what Claude generates
3. Correct if it deviates from patterns
4. Patterns get reinforced over time

## 🐛 Troubleshooting

### Claude Not Following Guidelines?

1. **Check if instructions loaded:**
   - Verify `.claude/instructions.md` exists
   - Ensure you're in correct directory

2. **Be explicit in requests:**
   ```
   "Following the patterns in ARCHITECTURE.md, add..."
   ```

3. **Reference specific docs:**
   ```
   "Using the component structure from Web-React/docs/ARCHITECTURE.md..."
   ```

### Context Limits?

If Claude's context is full:

1. **Update `.claudeignore`** - Exclude more files
2. **Split the task** - Smaller, focused requests
3. **Close unneeded files** - In VS Code
4. **Use specific references** - Don't load all docs at once

## 📊 Benefits of This Setup

✅ **Consistency** - All code follows same patterns
✅ **Quality** - Enforces best practices automatically
✅ **Speed** - No repeated explanations needed
✅ **Onboarding** - New developers see AI standards
✅ **Documentation** - Single source of truth
✅ **Maintainability** - Easy to update project-wide
✅ **Team Alignment** - Humans and AI follow same rules

## 🔗 Quick Links

- [Claude Code Guidelines - Backend](Backend-Service/docs/ARCHITECTURE.md#-claude-code-guidelines)
- [Claude Code Guidelines - React](Web-React/docs/ARCHITECTURE.md#-claude-code-guidelines)
- [Claude Code Guidelines - Vue](Web-Vue/docs/ARCHITECTURE.md#-claude-code-guidelines)
- [Project Instructions](.claude/instructions.md)
- [Claude Ignore Rules](.claudeignore)

## 📚 Additional Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude/docs)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [Agent SDK](https://github.com/anthropics/anthropic-sdk-typescript)

---

**Your Claude Code configuration is now complete and ready to use! 🚀**

Start any conversation in this project directory and Claude will automatically follow these guidelines.
