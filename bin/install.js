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
  const theme = explicitCommand ? null : await resolveTheme();
  const command = explicitCommand || (args.has("--local")
    ? joinCommand(["node", path.resolve(__dirname, "oh-my-statusline.js"), optionArg("--theme", theme)])
    : joinCommand(["npx", "--yes", "oh-my-statusline", optionArg("--theme", theme)]));

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

async function resolveTheme() {
  const selected = readValueArg(argv, "--theme") || readValueArg(argv, "--icons");
  if (selected) return validateTheme(selected);
  if (args.has("--yes") || !process.stdin.isTTY || !process.stdout.isTTY) return "symbols";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    console.log("Choose a statusline theme:");
    console.log("  1) symbols  ⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good");
    console.log("  2) emoji    🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ all good");
    console.log("  3) space    🚀 Sonnet 4.5 │ 🪐 project │ 🌌 main* │ 🛰️ Ctx 84k/200k 42% │ 🌌 star birth");
    console.log("  4) neon     💎 Sonnet 4.5 │ 🏙️ project │ ⚡ main* │ 📡 84k/200k 42% │ 🟢 signal clean");
    console.log("  5) cafe     ☕ Sonnet 4.5 │ 🧁 project │ 🥄 main* │ 🫖 84k/200k 42% │ 🍵 still warm");
    console.log("  6) lab      🧪 Sonnet 4.5 │ 🔬 project │ 🧬 main* │ 🧫 84k/200k 42% │ ✅ sample stable");
    console.log("  7) toybox   🤠 Sonnet 4.5 │ 🧸 project │ 🧩 main* │ 🚀 Ctx 84k/200k 42% │ 🪀 playtime");
    const answer = (await rl.question("Select 1-7 [1]: ")).trim().toLowerCase();
    if (answer === "" || answer === "1" || answer === "symbols" || answer === "symbol") return "symbols";
    if (answer === "2" || answer === "emoji") return "emoji";
    if (answer === "3" || answer === "space") return "space";
    if (answer === "4" || answer === "neon") return "neon";
    if (answer === "5" || answer === "cafe") return "cafe";
    if (answer === "6" || answer === "lab") return "lab";
    if (answer === "7" || answer === "toybox" || answer === "toy") return "toybox";
    console.log("Unknown choice. Using symbols.");
    return "symbols";
  } finally {
    rl.close();
  }
}

function validateTheme(value) {
  if (["symbols", "emoji", "space", "neon", "cafe", "lab", "toybox"].includes(value)) return value;
  throw new Error(`Invalid theme value: ${value}. Use symbols, emoji, space, neon, cafe, lab, or toybox.`);
}

function joinCommand(parts) {
  return parts.filter(Boolean).join(" ");
}

function optionArg(name, value) {
  return value ? `${name} ${value}` : null;
}
