import { DataBaseInfo } from "./model";

// app config
export const appConfig: DataBaseInfo = {
    tableName: 'app_config',
    fields: [
        {
            name: 'dir_name',
            type: 'varchar(255)',
            notNull: true,
            default: ''
        },
        {
            name: 'version',
            type: 'varchar(255)',
            notNull: true,
            default: ''
        },
        {
            name: 'window_width',
            type: 'varchar(255)',
            notNull: true,
            default: ''
        },
        {
            name: 'window_height',
            type: 'varchar(255)',
            notNull: true,
            default: ''
        }
    ],
    data: [
        ['./','0.0.1','800','600'],
    ]
}

