import Store from 'electron-store'
import Ajv, {JSONSchemaType} from "ajv"
import {SettingsInfo} from '@/types/model'

const ajv = new Ajv()

// app setting data of default
const settings: SettingsInfo = {
    window: {
        width: 1480,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        maximizable: true,
        minimizable: true,
        center: true,
        fullscreen: false,
        fullscreenable: true,
    },
    path: {
        userPath: '',
        documentPath: ''
    }
}

const schema: JSONSchemaType<SettingsInfo> = {
    type: 'object',
    properties: {
        window: {
            type: 'object',
            properties: {
                width: {type: 'integer', minimum: 800, default: 1480},
                height: {type: 'integer', minimum: 600, default: 800},
                minWidth: {type: 'integer', default: 800},
                minHeight: {type: 'integer', default: 600},
                maximizable: {type: 'boolean', default: true},
                minimizable: {type: 'boolean', default: true},
                center: {type: 'boolean', default: true},
                fullscreenable: {type: 'boolean', default: true},
                fullscreen: {type: 'boolean', default: false},
            },
            required: ['width', 'height','minWidth', 'minHeight', 'maximizable', 'minimizable', 'center', 'fullscreen', 'fullscreenable']
        },
        path: {
            type: 'object',
            properties: {
                userPath: {type: 'string', default: ''},
                documentPath: {type: 'string', default: ''}
            },
            required: []
        }
    },
    required: ['window'],
}

const store = new Store()

const validate = ajv.compile(schema)

if (validate(settings)) {
    store?.set('config', settings)
} else {
    console.error('Invalid data: ', validate.errors)
}

export default store