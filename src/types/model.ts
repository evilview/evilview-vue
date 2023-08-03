export interface Window {
    width: number,
    minWidth: number,
    maxWidth: number,
    height: number,
    minHeight: number,
    maxHeight: number,
    maximizable: boolean,
    minimizable: boolean,
    fullscreenable: boolean,
    fullscreen: boolean,
    center: boolean,
}

export interface Path {
    userPath: string,
    documentPath: string
}

export interface SettingsInfo {
    window: Window,
    path: Path,

}

export type FieldInfo = {
    name: string,
    type: string,
    notNull: boolean,
    default?: any
}

export interface DataBaseInfo {
    tableName: string,
    fields: FieldInfo[],
    data: [...any][],
    transaction?: boolean,
    options?: any
}