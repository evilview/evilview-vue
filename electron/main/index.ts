import { app, BrowserWindow, shell, ipcMain, dialog, nativeTheme, nativeImage, Menu } from 'electron'
import { Tray } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { Window } from "@/types/model";
import store from './store'

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST

// main variable
let win: BrowserWindow | null = null
let tray: Tray | null = null
const contextMenu = Menu.buildFromTemplate([
    {
        label: 'Show',
        type: 'normal',
        click: () => {
            win?.restore()
        }
    },
    {
        type: 'separator'
    },
    {
        label: 'Exit',
        type: 'normal',
        click: () => {
            appExit()
        }
    }
])

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
    appExit()
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

const webPreferences = {
    preload,
    nodeIntegration: true,
    // must be set to true for security
    contextIsolation: true,
}

async function createWindow() {

    const windowData = store.get('config.window') as Window

    win = new BrowserWindow({
        width: windowData.width,
        height: windowData.height,
        title: 'Main window',
        autoHideMenuBar: true,
        icon: join(process.env.PUBLIC, 'favicon.ico'),
        webPreferences: webPreferences,
        fullscreen: windowData.fullscreen,
        fullscreenable: windowData.fullscreenable,
        center: windowData.center,
        maximizable: windowData.maximizable,
        minimizable: windowData.minimizable,
        frame: false,
    })

    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString())
    })

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return { action: 'deny' }
    })
    // win.webContents.on('will-navigate', (event, url) => { }) #344
}

// Define ipc handles
function ipcHandles() {
    ipcMain.handle('say', () => 'hello world')
    ipcMain.handle('dialog:openFile', handleFileOpen)
    ipcMain.handle('store:get', getStore)
    ipcMain.handle('store:set', setStore)
    ipcMain.handle('dark-mode:toggle', darkModeToggle)
    ipcMain.handle('dark-mode:get', getMode)
    ipcMain.handle('dark-mode:getDark', getDarkMode)
    ipcMain.handle('window:minimize', windowMinimize)
    ipcMain.handle('window:toggleFullscreen', windowToggleFullscreen)
    ipcMain.handle('window:closeWindow', closeWindow)
}

app.whenReady().then(async () => {
    try {
        ipcHandles()
        await createWindow()
        initTray()
        if (win) {
            if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
                await win.loadURL(url)
                // Open devTool if the app is not packaged
                win.webContents.openDevTools()
            } else {
                await win.loadFile(indexHtml)
            }
        }
    } catch (err) {
        console.error(err)
    }
})

app.on('window-all-closed', () => {
    win = null
    if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore()
        win.focus()
    }
})

app.on('activate', async () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        await createWindow()
    }
})

// New window example arg: new windows url
ipcMain.handle('open-win', async (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: webPreferences
    })
    if (process.env.VITE_DEV_SERVER_URL) {
        await childWindow.loadURL(`${url}#${arg}`)
    } else {
        await childWindow.loadFile(indexHtml, { hash: arg })
    }
})

function appExit() {
    app.quit()
    process.exit(0)
}

// handleFileOpen file[0]
async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog(win as BrowserWindow, {})
    if (!canceled) {
        return filePaths[0]
    }
}

async function getStore(event: Electron.IpcMainInvokeEvent, key: string) {
    return store.get(key)
}

async function setStore(event: Electron.IpcMainInvokeEvent, key: string, value: any) {
    try {
        if (store.has(key)) {
            store.set(key, value)
        }
    } catch (err: any) {
        console.error(err)
    }
}

function darkModeToggle(event: Electron.IpcMainInvokeEvent, mode: "system" | "light" | "dark") {
    nativeTheme.themeSource = mode
}

function getMode() {
    return nativeTheme.themeSource
}

function getDarkMode() {
    return nativeTheme.shouldUseDarkColors
}

function windowMinimize() {
    win?.minimize()
}

function windowToggleFullscreen() {
    if (win?.isMaximized()) {
        win?.restore()
    } else {
        win?.maximize()
    }
}

function closeWindow() {
    app.quit()
}

function initTray() {
    try {
        // Icon on the path to distinguish the development environment and packaging environment
        const icon = nativeImage.createFromPath(join(process.env.PUBLIC, 'favicon.ico'))
        tray = new Tray(icon)
        tray.setContextMenu(contextMenu)
        tray.setToolTip(app.name)
        tray.addListener('double-click',() => {
            win?.restore()
        })
    } catch (err) {
        throw err
    }
}