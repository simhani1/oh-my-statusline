Install and configure oh-my-statusline as the current Claude Code `statusLine`.

Steps:

1. Ask the user which theme they want:
   - `symbols`: `⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good`
   - `emoji`: `🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ good`
   - `space`: `🚀 Sonnet 4.5 │ 🪐 project │ 🌌 main* │ 🛰️ 84k/200k 42% │ ✨ stable orbit`
   - `neon`: `💎 Sonnet 4.5 │ 🏙️ project │ ⚡ main* │ 📡 84k/200k 42% │ 🟢 signal clean`
   - `cafe`: `☕ Sonnet 4.5 │ 🧁 project │ 🥄 main* │ 🫖 84k/200k 42% │ 🍵 still warm`
   - `lab`: `🧪 Sonnet 4.5 │ 🔬 project │ 🧬 main* │ 🧫 84k/200k 42% │ ✅ sample stable`
2. Run the matching shell command. Prefer the plugin-local installer so this works even when the npm package is not installed globally.

   Replace `space` with the selected theme: `symbols`, `emoji`, `space`, `neon`, `cafe`, or `lab`.

   ```sh
   if [ -n "$CLAUDE_PLUGIN_ROOT" ]; then
     node "$CLAUDE_PLUGIN_ROOT/bin/install.js" --local --theme space
   else
     node ./bin/install.js --local --theme space
   fi
   ```

3. If the fallback fails because the current directory is not the repository root, tell the user to run `cd /path/to/oh-my-statusline` first and retry.
4. Tell the user to restart Claude Code or open a new session if the statusline does not update immediately.

Do not edit `~/.claude/settings.json` manually unless the installer fails.
