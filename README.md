# oh-my-statusline

Claude Code statusline을 조금 더 보기 좋게 바꿔주는 플러그인입니다. 모델, 프로젝트, 브랜치, 컨텍스트 사용량을 한 줄로 보여주고, 컨텍스트가 많아질수록 상태 메시지를 바꿔 줍니다.

## 테마 소개

`symbols`: 가장 담백한 기본형입니다. 특수기호 중심으로 짧고 조용하게 보여줍니다.

```text
⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good
```

`emoji`: 맥 기본 이모지를 활용한 기본 이모지 테마입니다.

```text
🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ all good
```

`space`: 별의 탄생부터 사건의 지평선까지 이어지는 우주 테마입니다.

```text
🚀 Sonnet 4.5 │ 🪐 project │ 🌌 main* │ 🛰️ Ctx 84k/200k 42% │ 🌌 star birth
```

`neon`: 도심 네온 사인 느낌의 테마입니다.

```text
💎 Sonnet 4.5 │ 🏙️ project │ ⚡ main* │ 📡 84k/200k 42% │ 🟢 signal clean
```

`cafe`: 카페 테이블 느낌의 테마입니다.

```text
☕ Sonnet 4.5 │ 🧁 project │ 🥄 main* │ 🫖 84k/200k 42% │ 🍵 still warm
```

`lab`: 실험실 느낌의 테마입니다.

```text
🧪 Sonnet 4.5 │ 🔬 project │ 🧬 main* │ 🧫 84k/200k 42% │ ✅ sample stable
```

`toybox`: 장난감 상자 느낌의 테마입니다.

```text
🤠 Sonnet 4.5 │ 🧸 project │ 🧩 main* │ 🚀 Ctx 84k/200k 42% │ 🪀 playtime
```

## 1. Claude Code 플러그인으로 설치하기

먼저 마켓플레이스를 추가합니다.

```sh
claude plugin marketplace add simhani1/oh-my-statusline
```

그다음 플러그인을 설치합니다.

```sh
claude plugin install oh-my-statusline@oh-my-statusline-marketplace
```

Claude Code 안에서 설치 명령을 실행합니다.

```text
/oh-my-statusline:install
```

그러면 `symbols`, `emoji`, `space`, `neon`, `cafe`, `lab`, `toybox` 중에서 어떤 테마를 쓸지 묻습니다. 선택한 테마는 `~/.claude/settings.json`의 `statusLine`에 반영됩니다.

중요한 점 하나: Claude Code 플러그인은 현재 일반 `statusLine` 설정을 플러그인 활성화만으로 바로 적용하지 못합니다. 그래서 플러그인을 설치한 뒤 `/oh-my-statusline:install`을 한 번 실행해야 합니다.

설치 명령에서 `command not found: oh-my-statusline-install`이 뜨면 예전 플러그인 명령을 실행한 겁니다. 플러그인을 업데이트하고 `/reload-plugins`를 실행한 뒤 다시 시도하세요. 새 버전은 플러그인 안의 설치 스크립트를 직접 실행합니다.

설치한 뒤 테마만 바꾸고 싶다면:

```text
/oh-my-statusline:theme
```

테마를 다시 고르면 `statusLine` 설정이 새 테마로 바뀝니다. 이때도 백업은 만들어집니다.

## 2. npm으로 바로 설치하기

플러그인 없이 빠르게 깔고 싶다면 아래 명령을 쓰면 됩니다.

```sh
npx --yes oh-my-statusline-install
```

설치 중에 테마를 고르면 됩니다.

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

묻지 말고 바로 우주:

```sh
npx --yes oh-my-statusline-install --theme space
```

묻지 말고 바로 심볼:

```sh
npx --yes oh-my-statusline-install --theme symbols
```

## 3. 로컬 개발 버전 설치하기

저장소를 직접 받아 현재 체크아웃을 Claude Code에 연결하려면:

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

Claude Code 안에서는:

```text
/oh-my-statusline:install
```

테마만 다시 고르려면:

```text
/oh-my-statusline:theme
```

## 4. 상태 라벨

- `all good`: 0-59%
- `watch context`: 60-74%
- `clean soon`: 75-79%
- `compact now`: 80% 이상

이모지 모드에서는 `☕ all good`, `👀 watch context`, `🧹 clean soon`, `🚨 compact now`로 표시됩니다. 상태 메시지는 영어로 유지합니다.

테마별 예시는 아래와 같습니다.

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

설치 스크립트는 `~/.claude/settings.json`을 수정하기 전에 백업을 만들어 둡니다.

백업 파일 이름은 아래 형태입니다.

```text
~/.claude/settings.json.oh-my-statusline-backup-...
```

원복하려면 `~/.claude/settings.json`을 백업 파일 내용으로 되돌리면 됩니다.

## 라이선스

MIT
