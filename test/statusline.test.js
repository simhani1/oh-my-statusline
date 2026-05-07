const assert = require("node:assert/strict");
const test = require("node:test");
const { compactTokens, getContextStatus, renderStatusline } = require("../src/statusline");

test("renders the requested compact statusline without color", () => {
  const output = renderStatusline({
    model: { display_name: "Sonnet 4.5" },
    workspace: { current_dir: "/Users/me/source/oh-my-statusline" },
    git: { branch: "main", dirty: true },
    context_window: {
      total_input_tokens: 82000,
      total_output_tokens: 2000,
      context_window_size: 200000,
      used_percentage: 42
    }
  }, { color: false });

  assert.equal(output, "⌘ Sonnet 4.5 │ ⌥ oh-my-statusline │ ⏎ main* │ Ctx 84k/200k 42% │ good");
});

test("uses configured context thresholds", () => {
  assert.deepEqual(getContextStatus(59), { label: "good", color: "green" });
  assert.deepEqual(getContextStatus(60), { label: "watch", color: "yellow" });
  assert.deepEqual(getContextStatus(75), { label: "compact soon", color: "orange" });
  assert.deepEqual(getContextStatus(80), { label: "compact now", color: "red" });
});

test("formats token counts compactly", () => {
  assert.equal(compactTokens(84000), "84k");
  assert.equal(compactTokens(200000), "200k");
  assert.equal(compactTokens(1000000), "1M");
});
