import {ipcRenderer} from "electron";
import Database from 'better-sqlite3';

const {contextBridge} = require('electron')
const os = require('node:os')
import {createAppData,getExistTable} from '@/utils/app'
import {appConfig} from '@/types/data'

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

contextBridge.exposeInMainWorld('electronAPI', {
    getUserInfo: () => os.userInfo(),
    getUserName: () => os.userInfo().username,
    say: () => ipcRenderer.invoke('say'),
    openFile: () => ipcRenderer.invoke('dialog:openFile')
})

function initSqlite() {
    return new Promise((resolve, reject) => {
        try {
            const db = new Database('evilview.db', {
                verbose: console.log,
                timeout: 20000
            })
            db.pragma('journal_mode = WAL')

            const {creates, inserts} = createAppData(appConfig)
            const t_exist = Object.keys(db.prepare(getExistTable(appConfig.tableName)).get()).length > 0

            if (!t_exist) {
                db.prepare(creates).run()
                for (const item of inserts) {
                    db.prepare(item).run()
                }
            }

            resolve({})
        } catch (err: any) {
            reject(err)
        }
    })
}

domReady().then(async () => {
    // try {
    //     console.log("start init ....")
    //     await initSqlite()
    //     console.log("init success")
    // } catch (e) {
    //     console.error("init fail: " + e)
    // }
})