# npm-clasp

```sh
npm i -g clasp
```

An alias for [`@google/clasp`](https://github.com/google/clasp)

## How it works

The `package.json`'s `"postinstall"` runs `index.js`.
This execs a child process that npm installs `clasp`.

## Test

```sh
sudo npm i -g . --unsafe-perm
```
