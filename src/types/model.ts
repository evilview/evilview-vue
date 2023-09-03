export interface Window {
    width: number,
    height: number,
    maximizable: boolean,
    minimizable: boolean,
    fullscreenable: boolean,
    fullscreen: boolean,
    center: boolean,
}

// path
export interface Path {
    userPath: string,
    documentPath: string
}

// setting
export interface SettingsInfo {
    window: Window,
    path: Path,
}

// file info
export type FieldInfo = {
    name: string,
    type: string,
    notNull: boolean,
    default?: any
}

// db data interface
export interface DataBaseInfo {
    tableName: string,
    fields: FieldInfo[],
    data: [...any][],
    transaction?: boolean,
    options?: any
}