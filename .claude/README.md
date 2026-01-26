# Claude Code Configuration

This directory contains project-specific instructions for Claude Code agents.

## Files

### `instructions.md`
Custom instructions that Claude Code will automatically reference when working on this project. These instructions:
- Link to all architecture documentation
- Define core principles for each tech stack
- Provide workflows for adding new features
- List common patterns and anti-patterns

## How It Works

When you start a conversation with Claude Code in this project directory, the agent will automatically:

1. **Load these instructions** as part of its context
2. **Reference documentation** before making changes
3. **Follow established patterns** from the docs
4. **Maintain consistency** across the codebase

## Usage

### Starting a New Task

Simply mention what you want to do, and Claude will:
- Automatically refer to the relevant documentation
- Follow the patterns defined in the instructions
- Ask clarifying questions if needed

**Example:**
```
User: "Add a reviews feature to the booking system"

Claude will:
1. Check Backend-Service/docs/ARCHITECTURE.md for patterns
2. Follow the "Adding New Features" workflow
3. Create models, services, controllers following established patterns
4. Write tests according to QUALITY_STRATEGY.md
```

### Overriding Instructions

If you need Claude to deviate from the instructions, simply specify:
```
User: "Add a reviews feature, but use a different pattern than usual because..."
```

## Updating Instructions

As your project evolves:
1. Update the relevant documentation files (ARCHITECTURE.md, etc.)
2. Update `.claude/instructions.md` to reflect new patterns
3. Commit changes to version control

## Additional Configuration

You can also add:
- `.claudeignore` - Files/directories to exclude from context
- `context-config.json` - Advanced context configuration

## Benefits

✅ **Consistency**: All AI-generated code follows your patterns
✅ **Quality**: Enforces best practices and testing standards
✅ **Speed**: Claude knows your architecture without repeated explanations
✅ **Onboarding**: New developers can see what standards AI follows
✅ **Maintainability**: Single source of truth for project conventions

---

For more details, see the documentation in each project directory:
- [Backend-Service/docs/](../Backend-Service/docs/)
- [Web-React/docs/](../Web-React/docs/)
- [Web-Vue/docs/](../Web-Vue/docs/)
