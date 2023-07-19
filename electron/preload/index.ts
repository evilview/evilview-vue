import {ipcRenderer} from "electron";
import Database from 'better-sqlite3';
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
  say: () => ipcRenderer.invoke('say'),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})

function initSqlite() {
  const db = new Database('app_config.db', {});
  db.pragma('journal_mode = WAL');
}