# oh-my-statusline

Claude Code statusline 설치 가이드입니다. 컨텍스트가 80% 넘어가도 “아직 괜찮겠지” 하다가 대화가 김치찌개처럼 푹 끓어버리는 일을 줄여줍니다.

## 테마 소개

`symbols`: 가장 담백한 기본형입니다. 일단 일해야 하는데 statusline이 너무 말 걸면 곤란한 사람용입니다.

```text
⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good
```

`emoji`: 맥 기본 이모지로 적당히 귀엽게 갑니다. 컨텍스트가 차오르면 커피 내려놓고 슬슬 자세 고칠 때입니다.

```text
🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ all good
```

`space`: 별의 탄생부터 사건의 지평선까지 갑니다. 컨텍스트 80% 넘으면 우주적 정신승리 금지입니다.

```text
🚀 Sonnet 4.5 │ 🪐 project │ 🌌 main* │ 🛰️ Ctx 84k/200k 42% │ 🌌 star birth
```

`neon`: 도심 네온 사인 같은 버전입니다. 시그널이 깨끗한지, 시스템이 뜨거워지는지 바로 보입니다.

```text
💎 Sonnet 4.5 │ 🏙️ project │ ⚡ main* │ 📡 84k/200k 42% │ 🟢 signal clean
```

`cafe`: 카페 테이블 버전입니다. 아직 따뜻하면 계속 가고, closing time이면 이제 정리각입니다.

```text
☕ Sonnet 4.5 │ 🧁 project │ 🥄 main* │ 🫖 84k/200k 42% │ 🍵 still warm
```

`lab`: 실험실 버전입니다. 샘플이 안정적인지, 반응이 과열되는지 보는 쪽입니다.

```text
🧪 Sonnet 4.5 │ 🔬 project │ 🧬 main* │ 🧫 84k/200k 42% │ ✅ sample stable
```

`toybox`: 장난감 상자 버전입니다. playtime으로 시작해서 toy box full까지 갑니다. 귀여운데 경고는 합니다.

```text
🤠 Sonnet 4.5 │ 🧸 project │ 🧩 main* │ 🚀 Ctx 84k/200k 42% │ 🪀 playtime
```

## 1. Claude Code 플러그인으로 설치

먼저 marketplace를 추가합니다.

```sh
claude plugin marketplace add simhani1/oh-my-statusline
```

그 다음 플러그인을 설치합니다.

```sh
claude plugin install oh-my-statusline@oh-my-statusline-marketplace
```

Claude Code 안에서 설치 command를 실행합니다.

```text
/oh-my-statusline:install
```

그러면 `symbols`, `emoji`, `space`, `neon`, `cafe`, `lab`, `toybox` 중 어떤 테마를 쓸지 물어보고, 선택한 테마로 `~/.claude/settings.json`의 `statusLine`을 설정합니다.

중요한 점 하나: Claude Code 플러그인은 현재 일반 `statusLine`을 enable만으로 자동 적용하지 못합니다. 그래서 플러그인 설치 후 `/oh-my-statusline:install`을 한 번 실행해야 합니다. 네, 버튼 하나 더 누르는 느낌입니다. 근데 이게 현재 공식 룰입니다.

만약 설치 command에서 `command not found: oh-my-statusline-install`이 뜨면 예전 버전의 플러그인 command를 실행한 겁니다. 플러그인을 업데이트하고 `/reload-plugins` 후 다시 실행하세요. 새 버전은 전역 명령어를 찾지 않고 플러그인 내부 installer를 직접 실행합니다. 길을 잃은 조개껍데기 PATH를 믿지 않습니다.

## 2. npm으로 바로 설치

플러그인 말고 그냥 빠르게 깔고 싶으면 아래 명령을 쓰면 됩니다.

```sh
npx --yes oh-my-statusline-install
```

설치 중에 테마를 고릅니다.

```text
Choose a statusline theme:
  1) symbols  ⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good
  2) emoji    🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ all good
  3) space    🚀 Sonnet 4.5 │ 🪐 project │ 🌌 main* │ 🛰️ Ctx 84k/200k 42% │ 🌌 star birth
  4) neon     💎 Sonnet 4.5 │ 🏙️ project │ ⚡ main* │ 📡 84k/200k 42% │ 🟢 signal clean
  5) cafe     ☕ Sonnet 4.5 │ 🧁 project │ 🥄 main* │ 🫖 84k/200k 42% │ 🍵 still warm
  6) lab      🧪 Sonnet 4.5 │ 🔬 project │ 🧬 main* │ 🧫 84k/200k 42% │ ✅ sample stable
  7) toybox   🤠 Sonnet 4.5 │ 🧸 project │ 🧩 main* │ 🚀 Ctx 84k/200k 42% │ 🪀 playtime
Select 1-7 [1]:
```

묻지 말고 우주:

```sh
npx --yes oh-my-statusline-install --theme space
```

묻지 말고 심볼:

```sh
npx --yes oh-my-statusline-install --theme symbols
```

## 3. 로컬 개발 버전 설치

저장소를 직접 받아서 현재 체크아웃을 Claude Code에 연결하려면:

```sh
git clone https://github.com/simhani1/oh-my-statusline.git
cd oh-my-statusline
npm test
node bin/install.js --local --theme space
```

로컬 플러그인으로 테스트하려면:

```sh
claude --plugin-dir .
```

Claude Code 안에서:

```text
/oh-my-statusline:install
```

## 4. 상태 라벨

- `all good`: 0-59%
- `watch context`: 60-74%
- `clean soon`: 75-79%
- `compact now`: 80% 이상

이모지 모드에서는 `☕ all good`, `👀 watch context`, `🧹 clean soon`, `🚨 compact now`로 표시됩니다. 상태 메시지는 영어 그대로 둡니다. 커피, 눈치, 청소, 사이렌만 옆에서 조용히 분위기 잡습니다.

테마별 예시는 이렇습니다.

```text
symbols │ ⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good
emoji   │ 🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ all good
space   │ 🚀 Sonnet 4.5 │ 🪐 project │ 🌌 main* │ 🛰️ Ctx 84k/200k 42% │ 🌌 star birth
neon    │ 💎 Sonnet 4.5 │ 🏙️ project │ ⚡ main* │ 📡 84k/200k 42% │ 🟢 signal clean
cafe    │ ☕ Sonnet 4.5 │ 🧁 project │ 🥄 main* │ 🫖 84k/200k 42% │ 🍵 still warm
lab     │ 🧪 Sonnet 4.5 │ 🔬 project │ 🧬 main* │ 🧫 84k/200k 42% │ ✅ sample stable
toybox  │ 🤠 Sonnet 4.5 │ 🧸 project │ 🧩 main* │ 🚀 Ctx 84k/200k 42% │ 🪀 playtime
```

## 5. 되돌리기

설치 스크립트는 `~/.claude/settings.json`을 수정하기 전에 백업을 만듭니다.

백업 파일 이름은 이런 형태입니다.

```text
~/.claude/settings.json.oh-my-statusline-backup-...
```

원복하려면 해당 백업 내용을 `~/.claude/settings.json`으로 되돌리면 됩니다.

## 라이선스

MIT
