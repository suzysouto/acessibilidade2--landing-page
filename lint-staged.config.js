module.exports = {
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',
  '**/*.(ts|tsx|js|jsx)': (filenames) => [
    `yarn eslint --cache --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
    `yarn stylelint ${filenames.join(' ')}`,
  ],
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
}
