# evilview - A simple photo reader

evilview is an image reader based on electron, with modern UI and barrier-free operation, more intuitive and quick display of your computer in a variety of formats of pictures.

## Quick Start

### env

- Electron 25.x(and later)
- Vue 3.x(and later)
- Nodejs 18.x(and later)


### run

```
git clone https://github.com/AutismPatient/evilview.git
cd evilview
yarn install
yarn dev
```

### build
Distribute using electron-builder
```shell
yarn build
```
Installing modules and rebuilding for Electron
```shell
yarn rebuild # electron-rebuild -f -w better-sqlite3 ...
```

### builder config
Using additional packaging tool [electron-builder](https://www.electron.build/).
```
# ./package.json

"build": {
  "appId": "com.example.app",
  ....
}

```

## Features

- [ ] Read the card in movie style
- [ ] Image editing basics
- [ ] Support multiple formats(JPG,GIF,PNG,JPEG,PSD....)

## Reference

- [Electron](https://www.electronjs.org/)
- [Vuejs](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Sqlite](https://sqlite.org/index.html)

## License

Copyright (c) 2023 evilview

[MIT License](http://en.wikipedia.org/wiki/MIT_License)