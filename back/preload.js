const { contextBridge, ipcRenderer } = require("electron")

const fs = require("fs")
// share fs module in render process (accessible via window.fs)

function sendMessage(message) {
    ipcRenderer.send(message)
}

function finish() {
    let loading
    ipcRenderer.on('finish', () => {
        loading = false
    })

    return loading
}


contextBridge.exposeInMainWorld("fs", fs)
contextBridge.exposeInMainWorld("emit", sendMessage)

contextBridge.exposeInMainWorld("finish", finish)
contextBridge.exposeInMainWorld("end", {
    received: (chan, func) => {
        ipcRenderer.on(chan, func)
    }
})
contextBridge.exposeInMainWorld("cancel", {
    received: (chan, func) => {
        ipcRenderer.on(chan, func)
    }
})
