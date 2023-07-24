
import type {DataBaseInfo,FieldInfo} from '@/types/data'
/**
 * Create the initial persistent data for the app
 * @returns string[]
 */
export function createAppData(info: DataBaseInfo) : {creates: string, inserts: string[]} {
    let result: string[] = []
    let fields: string[] = []

    if (info.fields.length > 0) {
        info.fields.forEach((x: FieldInfo) => {
            fields.push(`\`${x.name}\` ${x.type} ${x.notNull ? 'NOT NULL':''} ${x.default ? `DEFAULT ${x.default}`:''}`)
        })
    }

    const createTableStr: string = `CREATE TABLE IF NOT EXISTS \`${info.tableName}\` (
            ${fields.join()}
        )`

    if (info.data.length > 0) {
        info.data.forEach((x:any) => {
            const values = x.map((y:any) => {
                if (typeof y === 'string') {
                    return `'${y}'`
                }
                return y
            })
            result.push(`INSERT INTO ${info.tableName} (${info.fields.map(x => x.name).join()}) VALUES (${values.join()})`)
        })
    }

    return {
        creates: createTableStr,
        inserts: result
    }
}

export function getExistTable(table: string) {
    return `SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`
}