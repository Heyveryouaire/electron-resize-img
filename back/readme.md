# Start project
```sh
cd back
npm install
cd ../front
npm install
```

# Build instructions

## Build front
```sh
yarn run build
```

## Move build into back/ folder
```
cd front/
mv build ../back
```

## Electron config
```js
// back/index.js

    win.loadFile('./build/index.html')
    // win.loadURL('http://localhost:3000')

    // debug : 
    // win.webContents.openDevTools()
```

# Install globally electron-packager
```sh
cd back
electron-packager ./ <app_name>
```

# Todo :
Can choose height / width of risze
Compress image quality

# Knows bugs: 
ShowOpenDialog not always on top when openning