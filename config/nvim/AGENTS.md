# AGENTS.md for Neovim Configuration

## Build/Lint/Test Commands
- No build commands; configuration loads via `nvim`.
- Linting: Use `luacheck` for Lua syntax and style checks. Run `luacheck lua/` to lint all Lua files.
- Formatting: Use `stylua` for code formatting. Run `stylua lua/` to format.
- Testing: No automated tests defined. Manual verification via `nvim --clean -u init.lua`.
- Single test: N/A, as no test suite exists.

## Code Style Guidelines
- Language: Lua (Neovim API).
- Indentation: 4 spaces (no tabs; expandtab=true).
- Line length: No strict limit; follow readability.
- Naming: 
  - Variables/functions: camelCase (e.g., getRandomArt).
  - Modules: local M = {} pattern for exports.
- Imports: Use `require` at top; prefer local aliases.
- Types: Use ---@diagnostic annotations sparingly.
- Comments: Use -- for inline; no block comments unless necessary.
- Error handling: Use vim.notify or print for errors; avoid raw errors.
- Keymaps: Use vim.keymap.set with {noremap=true, silent=true, desc="description"}.
- Options: Set via vim.opt or vim.o/wo for buffer/window.
- Plugins: Managed via lazy.nvim; add to lua/plugins/*.lua.

No Cursor/Copilot rules found.