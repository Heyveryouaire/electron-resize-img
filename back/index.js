const path = require("path")
const { app, BrowserWindow, ipcMain, dialog, Notification } = require("electron")

const HandleFile = require("./src/handleFile")

function createWindow() {
    const win = new BrowserWindow({
        width: 800, // 400 for prod
        height: 800, // 400 for prod
        frame: false,
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

            if (!file.path) {
                let saveDialog = await file.saveDialog()
                // process resize here...
                if (!saveDialog) return
                
                await file.writeFile(saveDialog.filePath)
            }else{
                await file.writeFile(`${file.name}`)
            }

            await file.clearFile()

            new Notification({
                title: "Redimensionnement terminé",
                body: `L'image à été traitée`
            })
                .show()
        })

        ipcMain.on('close', () => {
            win.close()
        })

        ipcMain.on('minimize', () => {
            win.minimize()
        })

        ipcMain.on('drop', async (e, files) => {
            let isImage = /image\//

            if(!file.path){
                file.path = __dirname
            }
            for (let f of files) {
                if (isImage.test(f.type)) {
                    await file.openFile(f.path)
                    await file.compressFile()
                    await file.writeFile(`${f.name}`)
                }
            }

            let filesDone = files.filter(file => isImage.test(file.type))

            if (filesDone.length > 0) {
                let sentence = "ont été traitées"
                if (files.length === 1) {
                    sentence = "a été traitée"
                }

                new Notification({
                    title: "Redimensionnement terminé",
                    body: `${filesDone.length}/${files.length} ${sentence}`
                })
                    .show()
            }

        })

        ipcMain.on('gettargetfolder', async () => {
            await file.showOpenDirDialog()
        })

        ipcMain.on("setpath", (e, path) => {
            file.path = path
        })


    })

app.on('window-all-closed', _ => {
    if (process.platform !== 'darwin') app.quit()
})
