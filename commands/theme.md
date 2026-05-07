Change the current oh-my-statusline theme.

Steps:

1. Ask the user which theme they want:
   - `symbols`: `⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good`
   - `emoji`: `🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ good`
   - `space`: `🚀 Sonnet 4.5 │ 🪐 project │ 🌌 main* │ 🛰️ Ctx 84k/200k 42% │ 🌌 star birth`
   - `neon`: `💎 Sonnet 4.5 │ 🏙️ project │ ⚡ main* │ 📡 84k/200k 42% │ 🟢 signal clean`
   - `cafe`: `☕ Sonnet 4.5 │ 🧁 project │ 🥄 main* │ 🫖 84k/200k 42% │ 🍵 still warm`
   - `lab`: `🧪 Sonnet 4.5 │ 🔬 project │ 🧬 main* │ 🧫 84k/200k 42% │ ✅ sample stable`
   - `toybox`: `🤠 Sonnet 4.5 │ 🧸 project │ 🧩 main* │ 🚀 Ctx 84k/200k 42% │ 🪀 playtime`
2. Run the matching shell command. Replace `toybox` with the selected theme.

   ```sh
   if [ -n "$CLAUDE_PLUGIN_ROOT" ]; then
     node "$CLAUDE_PLUGIN_ROOT/bin/install.js" --local --theme toybox
   else
     node ./bin/install.js --local --theme toybox
   fi
   ```

3. Tell the user to restart Claude Code or open a new session if the statusline does not update immediately.

Do not edit `~/.claude/settings.json` manually unless the installer fails.
