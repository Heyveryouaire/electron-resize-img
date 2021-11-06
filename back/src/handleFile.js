const fs = require("fs").promises
const sharp = require("sharp")

class HandleFile {
    constructor(webContent, dialog) {
        this.webContent = webContent
        this.showOpenDialog = dialog.showOpenDialog
        this.showSaveDialog = dialog.showSaveDialog

        // only get one file for now ..    
        this.path
        this.file
        this.name
    }

    async openDialog() {
        const dialog = await this.showOpenDialog({
            properties: ['openFile'],
            title: "Sélectionner une image",
            filters: [{
                name: "Images", extensions: ['jpg', 'png', 'jpeg']
            }]
        })

        if (dialog.canceled) {
            this.cancel()
            return false
        }
        return dialog
    }

    async saveDialog() {
        if (!this.path) {
            const dialog = await this.showSaveDialog({
                title: "Enregistrer le fichier",
                defaultPath: this.name
            })

            if (dialog.canceled) {
                this.cancel()
                return false
            }
            return dialog
        }
    }

    async openFile(path) {
        const file = await fs.readFile(path)
        let name = path.split('/').pop()

        let tmp = name.split('.')
        tmp[0] = `${tmp[0]}-compressed`

        this.name = tmp.join('.')
        this.file = file
    }

    async writeFile(path) {
        if (!this.path) {
            await fs.writeFile(path, this.file)
        } else {
            await fs.writeFile(`${this.path}/${path}`, this.file)
        }
        this.webContent.send("finish")
    }

    async compressFile() {
        let file = await sharp(this.file)
            .resize(200)
            .toBuffer()

        // const metadata = await sharp(file)
        // .metadata()
        this.file = file
    }

    async cancel() {
        this.webContent.send("cancel")
    }

    async clearFile() {
        delete this.file
        delete this.name
        // delete this.path
    }

    async showOpenDirDialog() {
        const dialog = await this.showOpenDialog({
            properties: ['openDirectory'],
            title: "Sélectionner un chemin",
        })

        if (dialog.canceled) {
            this.cancel()
            return false
        }

        this.path = dialog.filePaths[0]
        this.webContent.send("targetfolder", this.path)
    }
}

module.exports = HandleFile