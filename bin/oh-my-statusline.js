#!/usr/bin/env node

const { renderStatusline } = require("../src/statusline");
const { version } = require("../package.json");

const argv = process.argv.slice(2);
const args = new Set(argv);
const icons = readValueArg(argv, "--icons") || process.env.OH_MY_STATUSLINE_ICONS || "symbols";

if (args.has("--help") || args.has("-h")) {
  process.stdout.write(`oh-my-statusline ${version}

Render a compact Claude Code statusline from JSON on stdin.

Usage:
  oh-my-statusline < claude-statusline-input.json

Options:
  --icons NAME  Icon set: symbols, emoji
  --no-color   Disable ANSI colors
  --version    Print version
  --help       Print help
`);
  process.exit(0);
}

if (args.has("--version") || args.has("-v")) {
  process.stdout.write(`${version}\n`);
  process.exit(0);
}

let input = "";

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    const data = input.trim() ? JSON.parse(input) : {};
    const color = !args.has("--no-color") && !process.env.NO_COLOR;
    process.stdout.write(`${renderStatusline(data, { color, icons })}\n`);
  } catch (error) {
    process.stdout.write("⌘ Claude │ Ctx -- │ unavailable\n");
  }
});

function readValueArg(argv, name) {
  const index = argv.indexOf(name);
  if (index === -1) return null;
  return argv[index + 1] || null;
}
