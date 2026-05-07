Install and configure oh-my-statusline as the current Claude Code `statusLine`.

Steps:

1. Ask the user which style they want:
   - `symbols`: `⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good`
   - `emoji`: `🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ good`
2. Run the matching shell command. Prefer the plugin-local installer so this works even when the npm package is not installed globally.

   symbols:

   ```sh
   if [ -n "$CLAUDE_PLUGIN_ROOT" ]; then
     node "$CLAUDE_PLUGIN_ROOT/bin/install.js" --local --icons symbols
   else
     node ./bin/install.js --local --icons symbols
   fi
   ```

   emoji:

   ```sh
   if [ -n "$CLAUDE_PLUGIN_ROOT" ]; then
     node "$CLAUDE_PLUGIN_ROOT/bin/install.js" --local --icons emoji
   else
     node ./bin/install.js --local --icons emoji
   fi
   ```

3. If the fallback fails because the current directory is not the repository root, tell the user to run `cd /path/to/oh-my-statusline` first and retry.
4. Tell the user to restart Claude Code or open a new session if the statusline does not update immediately.

Do not edit `~/.claude/settings.json` manually unless the installer fails.
