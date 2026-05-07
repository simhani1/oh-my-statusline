# oh-my-statusline

Claude Code statusline 설치 가이드입니다. 컨텍스트가 80% 넘어가도 “아직 괜찮겠지” 하다가 대화가 김치찌개처럼 푹 끓어버리는 일을 줄여줍니다.

기본형:

⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good

이모지형:

🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ good

## 1. npm으로 설치

아래 명령을 실행하면 설치 중에 `symbols`와 `emoji` 중 하나를 고르게 됩니다.

```sh
npx --yes oh-my-statusline-install
```

선택지가 뜨면 원하는 번호를 누르면 됩니다.

```text
Choose a statusline style:
  1) symbols  ⌘ Sonnet 4.5 │ ⌥ project │ ⏎ main* │ Ctx 84k/200k 42% │ good
  2) emoji    🧠 Sonnet 4.5 │ 🛘 project │ 🍪 main* │ 💬 84k/200k 42% │ ☕ good
Select 1 or 2 [1]:
```

“묻지 말고 이모지로 가라” 모드:

```sh
npx --yes oh-my-statusline-install --icons emoji
```

“묻지 말고 심볼로 가라” 모드:

```sh
npx --yes oh-my-statusline-install --icons symbols
```

설치 후 Claude Code를 새로 열면 적용됩니다.

## 2. GitHub에서 설치

저장소가 공개된 뒤에는 아래 명령으로 설치할 수 있습니다.

```sh
curl -fsSL https://raw.githubusercontent.com/simhani1/oh-my-statusline/main/install.sh | sh
```

이 방식도 터미널이 있으면 스타일을 물어봅니다. Node.js와 npx는 필요합니다. 없으면 터미널이 “나 지금 재료 없는데 요리하라고?” 상태가 됩니다.

GitHub 설치에서도 옵션을 넘길 수 있습니다.

```sh
curl -fsSL https://raw.githubusercontent.com/simhani1/oh-my-statusline/main/install.sh | sh -s -- --icons emoji
```

## 3. 로컬 개발 버전 설치

저장소를 직접 받아서 현재 체크아웃을 Claude Code에 연결하려면:

```sh
git clone https://github.com/simhani1/oh-my-statusline.git
cd oh-my-statusline
npm test
node bin/install.js --local --icons emoji
```

로컬에서도 그냥 실행하면 선택지를 묻습니다.

```sh
node bin/install.js --local
```

## 4. 수동 설정

`~/.claude/settings.json`에 직접 넣어도 됩니다.

이모지 버전:

```json
{
  "statusLine": {
    "type": "command",
    "command": "npx --yes oh-my-statusline --icons emoji",
    "padding": 0
  }
}
```

심볼 버전:

```json
{
  "statusLine": {
    "type": "command",
    "command": "npx --yes oh-my-statusline",
    "padding": 0
  }
}
```

## 5. 상태 라벨

- `good`: 0-59%
- `watch`: 60-74%
- `compact soon`: 75-79%
- `compact now`: 80% 이상

이모지 모드에서는 `☕ good`, `👀 watch`, `🧹 compact soon`, `🚨 compact now`로 표시됩니다. 상태 메시지는 영어 그대로 둡니다. 커피, 눈치, 청소, 사이렌만 옆에서 조용히 분위기 잡습니다.

## 6. 되돌리기

설치 스크립트는 `~/.claude/settings.json`을 수정하기 전에 백업을 만듭니다.

백업 파일 이름은 이런 형태입니다.

```text
~/.claude/settings.json.oh-my-statusline-backup-...
```

원복하려면 해당 백업 내용을 `~/.claude/settings.json`으로 되돌리면 됩니다.

## 라이선스

MIT
