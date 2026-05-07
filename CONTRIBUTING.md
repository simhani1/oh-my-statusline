# Contributing

Thanks for helping improve oh-my-statusline.

## Development

```sh
npm test
node bin/install.js --local
```

`--local` points Claude Code at your checkout instead of the published npm package.

## Release Checklist

1. Update `version` in `package.json`.
2. Run `npm test`.
3. Run `npm pack --dry-run`.
4. Publish with `npm publish`.
5. Create a GitHub release with the same version tag.
