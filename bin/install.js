#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const settingsDir = path.join(os.homedir(), ".claude");
const settingsPath = path.join(settingsDir, "settings.json");
const argv = process.argv.slice(2);
const args = new Set(argv);
const explicitCommand = readValueArg(argv, "--command");
const icons = readValueArg(argv, "--icons");
const bar = readValueArg(argv, "--bar");
const command = explicitCommand || (args.has("--local")
  ? joinCommand(["node", path.resolve(__dirname, "oh-my-statusline.js"), optionArg("--icons", icons), optionArg("--bar", bar)])
  : joinCommand(["npx", "--yes", "oh-my-statusline", optionArg("--icons", icons), optionArg("--bar", bar)]));

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

function joinCommand(parts) {
  return parts.filter(Boolean).join(" ");
}

function optionArg(name, value) {
  return value ? `${name} ${value}` : null;
}
