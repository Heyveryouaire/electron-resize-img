const path = require("path")
const { app, BrowserWindow, ipcMain, dialog } = require("electron")

const HandleFile = require("./src/handleFile")

function createWindow() {
    const win = new BrowserWindow({
        width: 800, // 400 for prod
        height: 800, // 400 for prod
        frame:false,
        icon: `${__dirname}/maximize.png`,
        resizable: false,
        // autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // win.loadFile('../front/build/index.html')
    win.loadURL('http://localhost:3000')

    // debug : 
    win.webContents.openDevTools()
    return win

}


app.whenReady()
    .then(_ => {
        let win = createWindow()
        const file = new HandleFile(win.webContents, dialog)

        // macOs
        app.on('activate', function () {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })

        ipcMain.on('openDialog', async () => {
            let openDialog = await file.openDialog()

            if (!openDialog) return

            await file.openFile(openDialog.filePaths[0])
            await file.compressFile()

            let saveDialog = await file.saveDialog()
            // process resize here...
            if (!saveDialog) return

            await file.writeFile(saveDialog.filePath)
            
            await file.clearFile()
            console.log('Image compressed')
        })

        ipcMain.on('close', () => {
            win.close()
        })

        ipcMain.on('minimize', () => {
            win.minimize()
        })

    })

app.on('window-all-closed', _ => {
    if (process.platform !== 'darwin') app.quit()
})
