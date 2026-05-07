const { execFileSync } = require("node:child_process");

const ANSI = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  orange: "\x1b[38;5;208m",
  red: "\x1b[31m"
};

const ICON_SETS = {
  symbols: {
    model: "⌘",
    project: "⌥",
    git: "⏎",
    context: "Ctx",
    status: {
      good: "good",
      watch: "watch",
      compactSoon: "compact soon",
      compactNow: "compact now"
    }
  },
  emoji: {
    model: "🧠",
    project: "💼",
    git: "🌱",
    context: "🪟",
    status: {
      good: "✅ good",
      watch: "🟡 watch",
      compactSoon: "🟠 compact soon",
      compactNow: "🔴 compact now"
    }
  }
};

function renderStatusline(data, options = {}) {
  const color = options.color !== false;
  const icons = getIconSet(options.icons);
  const model = readString(data, ["model", "display_name"]) || readString(data, ["model", "id"]) || "Claude";
  const cwd = readString(data, ["workspace", "current_dir"]) || readString(data, ["cwd"]) || "";
  const project = basename(cwd) || "project";
  const git = getGitSegment(data, cwd, options);
  const context = getContextSegment(data, color, icons);

  return joinSegments([
    `${icons.model} ${model}`,
    `${icons.project} ${project}`,
    git ? `${icons.git} ${git}` : null,
    context
  ], color);
}

function getGitSegment(data, cwd, options = {}) {
  const branch =
    readString(data, ["git", "branch"]) ||
    readString(data, ["workspace", "git_branch"]) ||
    readString(data, ["branch"]) ||
    getGitBranch(cwd, options);

  const dirty =
    readBoolean(data, ["git", "dirty"]) ||
    readNumber(data, ["git", "modified"]) > 0 ||
    readNumber(data, ["git", "staged"]) > 0 ||
    readNumber(data, ["git", "untracked"]) > 0 ||
    (branch ? isGitDirty(cwd, options) : false);

  if (!branch) return null;
  return `${branch}${dirty ? "*" : ""}`;
}

function getGitBranch(cwd, options) {
  if (options.git === false || !cwd) return null;
  return runGit(cwd, ["branch", "--show-current"]) || runGit(cwd, ["rev-parse", "--short", "HEAD"]);
}

function isGitDirty(cwd, options) {
  if (options.git === false || !cwd) return false;
  return runGit(cwd, ["status", "--porcelain"]).length > 0;
}

function runGit(cwd, args) {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 150
    }).trim();
  } catch (_) {
    return "";
  }
}

function getContextSegment(data, color, icons) {
  const context = data.context_window || {};
  const percent = numberOrNull(context.used_percentage);
  const size = numberOrNull(context.context_window_size);
  const input = numberOrNull(context.total_input_tokens);
  const output = numberOrNull(context.total_output_tokens);
  const used = numberOrNull(context.total_tokens) ?? sumNullable(input, output);

  if (percent === null && size === null && used === null) {
    return "Ctx --";
  }

  const normalizedPercent = clamp(Math.round(percent ?? percentage(used, size) ?? 0), 0, 999);
  const totalLabel = size !== null ? compactTokens(size) : "?";
  const usedLabel = used !== null ? compactTokens(used) : compactTokens(Math.round((size || 0) * normalizedPercent / 100));
  const status = getContextStatus(normalizedPercent);
  const statusLabel = colorize(icons.status[status.key], status.color, color);

  return `${icons.context} ${usedLabel}/${totalLabel} ${normalizedPercent}% │ ${statusLabel}`;
}

function getContextStatus(percent) {
  if (percent >= 80) return { key: "compactNow", label: "compact now", color: "red" };
  if (percent >= 75) return { key: "compactSoon", label: "compact soon", color: "orange" };
  if (percent >= 60) return { key: "watch", label: "watch", color: "yellow" };
  return { key: "good", label: "good", color: "green" };
}

function getIconSet(name) {
  return ICON_SETS[name] || ICON_SETS.symbols;
}

function joinSegments(segments, color) {
  const separator = color ? `${ANSI.dim} │ ${ANSI.reset}` : " │ ";
  return segments.filter(Boolean).join(separator);
}

function colorize(value, colorName, enabled) {
  if (!enabled) return value;
  return `${ANSI[colorName]}${value}${ANSI.reset}`;
}

function readString(source, path) {
  const value = readPath(source, path);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readNumber(source, path) {
  return numberOrNull(readPath(source, path));
}

function readBoolean(source, path) {
  return readPath(source, path) === true;
}

function readPath(source, path) {
  return path.reduce((current, key) => {
    if (current && typeof current === "object" && key in current) return current[key];
    return undefined;
  }, source);
}

function numberOrNull(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function sumNullable(left, right) {
  if (left === null && right === null) return null;
  return (left || 0) + (right || 0);
}

function percentage(used, total) {
  if (used === null || total === null || total <= 0) return null;
  return (used / total) * 100;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function basename(path) {
  return path.replace(/\/+$/, "").split("/").filter(Boolean).pop() || "";
}

function compactTokens(value) {
  if (!Number.isFinite(value)) return "?";
  if (value >= 1000000) {
    const millions = value / 1000000;
    return `${trimFixed(millions, millions >= 10 ? 0 : 1)}M`;
  }
  if (value >= 1000) {
    return `${Math.round(value / 1000)}k`;
  }
  return String(Math.round(value));
}

function trimFixed(value, digits) {
  return value.toFixed(digits).replace(/\.0$/, "");
}

module.exports = {
  renderStatusline,
  getContextStatus,
  compactTokens,
  getIconSet
};
