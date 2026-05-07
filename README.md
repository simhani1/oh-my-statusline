# oh-my-statusline

A compact Claude Code statusline focused on context window size and compact timing.

⌘ Sonnet 4.5 │ ⌥ oh-my-statusline │ ⏎ main* │ Ctx 84k/200k 42% │ good

## Install

After the package is published to npm:

```sh
npx --yes oh-my-statusline-install
```

Or add it manually to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "npx --yes oh-my-statusline",
    "padding": 0
  }
}
```

From GitHub, after the repository is public:

```sh
curl -fsSL https://raw.githubusercontent.com/simhani1/oh-my-statusline/main/install.sh | sh
```

For a GitHub checkout:

```sh
git clone https://github.com/simhani1/oh-my-statusline.git
cd oh-my-statusline
npm test
node bin/install.js --local
```

`--local` points Claude Code at your checkout. Without `--local`, the installer writes `npx --yes oh-my-statusline` to your Claude Code settings.

## Context Status

The final label is color coded:

- `good`: 0-59%, green
- `watch`: 60-74%, yellow
- `compact soon`: 75-79%, orange
- `compact now`: 80%+, red

The statusline uses Claude Code's `context_window.used_percentage`, `context_window.total_input_tokens`, `context_window.total_output_tokens`, and `context_window.context_window_size` fields.

## Format

⌘ {model} │ ⌥ {project} │ ⏎ {branch}{dirty} │ Ctx {used}/{total} {percent}% │ {status}

Example states:

⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good

⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 124k/200k 62% │ watch

⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 152k/200k 76% │ compact soon

⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 164k/200k 82% │ compact now

## CLI

```sh
oh-my-statusline --help
oh-my-statusline --version
oh-my-statusline --no-color < input.json
```

The command reads Claude Code's statusline JSON from stdin and prints one line to stdout.

## Development

```sh
npm test
node bin/install.js --local
```

## Publish

```sh
npm login
npm test
npm pack --dry-run
npm publish
```

Then create the GitHub repository at `simhani1/oh-my-statusline` and push:

```sh
git init
git add .
git commit -m "feat: initial statusline"
git branch -M main
git remote add origin git@github.com:simhani1/oh-my-statusline.git
git push -u origin main
```

## Note on Claude Code Plugins

Claude Code statuslines are configured through the `statusLine` setting. Claude Code plugins can include default settings, but current plugin settings support is limited, so this package installs by safely updating `~/.claude/settings.json` and creating a timestamped backup first.

## License

MIT
