Install and configure oh-my-statusline as the current Claude Code `statusLine`.

Steps:

1. Ask the user which style they want:
   - `symbols`: `⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good`
   - `emoji`: `🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ good`
2. Run the matching shell command:
   - symbols: `oh-my-statusline-install --icons symbols`
   - emoji: `oh-my-statusline-install --icons emoji`
3. Tell the user to restart Claude Code or open a new session if the statusline does not update immediately.

Do not edit `~/.claude/settings.json` manually unless the installer fails.
