# oh-my-statusline

Claude Code statusline 설치 가이드입니다. 컨텍스트가 80% 넘어가도 “아직 괜찮겠지” 하다가 대화가 김치찌개처럼 푹 끓어버리는 일을 줄여줍니다.

기본형:

⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good

이모지형:

🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ good

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

그러면 `symbols`와 `emoji` 중 어떤 스타일을 쓸지 물어보고, 선택한 스타일로 `~/.claude/settings.json`의 `statusLine`을 설정합니다.

중요한 점 하나: Claude Code 플러그인은 현재 일반 `statusLine`을 enable만으로 자동 적용하지 못합니다. 그래서 플러그인 설치 후 `/oh-my-statusline:install`을 한 번 실행해야 합니다. 네, 버튼 하나 더 누르는 느낌입니다. 근데 이게 현재 공식 룰입니다.

## 2. npm으로 바로 설치

플러그인 말고 그냥 빠르게 깔고 싶으면 아래 명령을 쓰면 됩니다.

```sh
npx --yes oh-my-statusline-install
```

설치 중에 스타일을 고릅니다.

```text
Choose a statusline style:
  1) symbols  ⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good
  2) emoji    🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ good
Select 1 or 2 [1]:
```

묻지 말고 이모지:

```sh
npx --yes oh-my-statusline-install --icons emoji
```

묻지 말고 심볼:

```sh
npx --yes oh-my-statusline-install --icons symbols
```

## 3. 로컬 개발 버전 설치

저장소를 직접 받아서 현재 체크아웃을 Claude Code에 연결하려면:

```sh
git clone https://github.com/simhani1/oh-my-statusline.git
cd oh-my-statusline
npm test
node bin/install.js --local --icons emoji
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

- `good`: 0-59%
- `watch`: 60-74%
- `compact soon`: 75-79%
- `compact now`: 80% 이상

이모지 모드에서는 `☕ good`, `👀 watch`, `🧹 compact soon`, `🚨 compact now`로 표시됩니다. 상태 메시지는 영어 그대로 둡니다. 커피, 눈치, 청소, 사이렌만 옆에서 조용히 분위기 잡습니다.

## 5. 되돌리기

설치 스크립트는 `~/.claude/settings.json`을 수정하기 전에 백업을 만듭니다.

백업 파일 이름은 이런 형태입니다.

```text
~/.claude/settings.json.oh-my-statusline-backup-...
```

원복하려면 해당 백업 내용을 `~/.claude/settings.json`으로 되돌리면 됩니다.

## 라이선스

MIT
