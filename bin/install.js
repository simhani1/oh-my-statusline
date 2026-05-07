#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const readline = require("node:readline/promises");

const settingsDir = path.join(os.homedir(), ".claude");
const settingsPath = path.join(settingsDir, "settings.json");
const argv = process.argv.slice(2);
const args = new Set(argv);

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

async function main() {
  const explicitCommand = readValueArg(argv, "--command");
  const icons = explicitCommand ? null : await resolveIcons();
  const command = explicitCommand || (args.has("--local")
    ? joinCommand(["node", path.resolve(__dirname, "oh-my-statusline.js"), optionArg("--icons", icons)])
    : joinCommand(["npx", "--yes", "oh-my-statusline", optionArg("--icons", icons)]));

  fs.mkdirSync(settingsDir, { recursive: true });

  const settings = readSettings(settingsPath);
  const backupPath = backupSettings(settingsPath);

  settings.statusLine = {
    type: "command",
    command,
    padding: 0
  };

  fs.writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`);

  console.log(`Installed oh-my-statusline to ${settingsPath}`);
  console.log(`Command: ${command}`);
  if (backupPath) console.log(`Backup: ${backupPath}`);
}

function readSettings(filePath) {
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function backupSettings(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = `${filePath}.oh-my-statusline-backup-${stamp}`;
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

function readValueArg(argv, name) {
  const index = argv.indexOf(name);
  if (index === -1) return null;
  const value = argv[index + 1];
  if (!value) {
    console.error(`Missing value for ${name}`);
    process.exit(1);
  }
  return value;
}

async function resolveIcons() {
  const selected = readValueArg(argv, "--icons");
  if (selected) return validateIcons(selected);
  if (args.has("--yes") || !process.stdin.isTTY || !process.stdout.isTTY) return "symbols";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    console.log("Choose a statusline style:");
    console.log("  1) symbols  ⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good");
    console.log("  2) emoji    🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ good");
    const answer = (await rl.question("Select 1 or 2 [1]: ")).trim().toLowerCase();
    if (answer === "" || answer === "1" || answer === "symbols" || answer === "symbol") return "symbols";
    if (answer === "2" || answer === "emoji") return "emoji";
    console.log("Unknown choice. Using symbols.");
    return "symbols";
  } finally {
    rl.close();
  }
}

function validateIcons(value) {
  if (value === "symbols" || value === "emoji") return value;
  throw new Error(`Invalid --icons value: ${value}. Use symbols or emoji.`);
}

function joinCommand(parts) {
  return parts.filter(Boolean).join(" ");
}

function optionArg(name, value) {
  return value ? `${name} ${value}` : null;
}
