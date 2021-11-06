const { contextBridge, ipcRenderer } = require("electron")
// share fs module in render process (accessible via window.fs)

function sendMessage(message, e) {
    ipcRenderer.send(message, e)
}

function finish() {
    let loading
    ipcRenderer.on('finish', () => {
        loading = false
    })

    return loading
}

// Send to renderer
// contextBridge.exposeInMainWorld("fs", fs)
contextBridge.exposeInMainWorld("emit", sendMessage)
contextBridge.exposeInMainWorld("finish", finish)

// Events handle for renderer
contextBridge.exposeInMainWorld('evenement', {
    received: (chan, func) => {
        ipcRenderer.on(chan, func)
    }
})