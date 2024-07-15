import { EntitySchema } from 'typeorm'
import {
    ApIdSchema,
    BaseColumnSchemaPart,
    JSONB_COLUMN_TYPE,
} from '../../database/database-common'
import { OAuthApp } from '@activepieces/ee-shared'
import { EncryptedObject } from '@activepieces/server-shared'
import { Platform } from '@activepieces/shared'

type OAuthAppSchema = {
    platform: Platform[]
    clientSecret: EncryptedObject
} & OAuthApp

export type OAuthAppWithSecret = OAuthApp & { clientSecret: string }
export type OAuthAppWithEncryptedSecret = OAuthApp & {
    clientSecret: EncryptedObject
}

export const OAuthAppEntity = new EntitySchema<OAuthAppSchema>({
    name: 'oauth_app',
    columns: {
        ...BaseColumnSchemaPart,
        pieceName: {
            type: String,
        },
        platformId: ApIdSchema,
        clientId: {
            type: String,
        },
        clientSecret: {
            type: JSONB_COLUMN_TYPE,
        },
    },
    indices: [
        {
            name: 'idx_oauth_app_platformId_pieceName',
            columns: ['platformId', 'pieceName'],
            unique: true,
        },
    ],
    relations: {
        platform: {
            type: 'many-to-one',
            target: 'platform',
            cascade: true,
            onDelete: 'CASCADE',
            joinColumn: {
                name: 'platformId',
                foreignKeyConstraintName: 'fk_oauth_app_platform_id',
            },
        },
    },
})
