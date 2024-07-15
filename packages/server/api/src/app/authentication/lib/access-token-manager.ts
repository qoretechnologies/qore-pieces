import { jwtUtils } from '../../helper/jwt-utils'
import { ActivepiecesError, assertNotNullOrUndefined, ErrorCode, Principal } from '@activepieces/shared'

export const accessTokenManager = {
    async generateToken(principal: Principal, expiresInSeconds: number = 7 * 30 * 24 * 60 * 60): Promise<string> {
        const secret = await jwtUtils.getJwtSecret()

        return jwtUtils.sign({
            payload: principal,
            key: secret,
            expiresInSeconds,
        })
    },

    async extractPrincipal(token: string): Promise<Principal> {
        const secret = await jwtUtils.getJwtSecret()

        try {
            const decoded = await jwtUtils.decodeAndVerify<Principal>({
                jwt: token,
                key: secret,
            })
            assertNotNullOrUndefined(decoded.type, 'decoded.type')
            return decoded
        }
        catch (e) {
            throw new ActivepiecesError({
                code: ErrorCode.INVALID_BEARER_TOKEN,
                params: {
                    message: 'invalid access token',
                },
            })
        }
    },
}
