import {ipcRenderer} from "electron";

const {contextBridge} = require('electron')
const os = require('node:os')

function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

contextBridge.exposeInMainWorld('electronAPI',{
  getUserInfo: () => os.userInfo(),
  getUserName: () => os.userInfo().username,
  say: () => ipcRenderer.invoke('say')
})