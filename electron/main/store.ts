import Store from 'electron-store'
import { JSONSchemaType } from 'ajv'
import {SettingsInfo} from '@/types/model'

const schema: JSONSchemaType<SettingsInfo> = {
    type: 'object',
    properties: {
        window: {
            type: 'object',
            properties: {
                width: {type: 'integer',minimum: 800,default: 800},
                height: {type: 'integer',minimum: 600,default: 600},
                maximizable: {type: 'boolean',default: true},
                minimizable: {type: 'boolean',default: true},
                center: {type: 'boolean',default: true},
                fullscreenable: {type: 'boolean',default: true},
                fullscreen: {type: 'boolean',default: false},
            },
            required: ['width','height','maximizable','minimizable','center','fullscreen','fullscreenable']
        },
        path: {
            type: 'object',
            properties: {
                userPath: {type: 'string',default: ''},
                documentPath: {type: 'string',default: ''}
            },
            required: []
        }
    },
    required: ['window'],
}

const store = new Store<SettingsInfo | any>({schema})

export default store