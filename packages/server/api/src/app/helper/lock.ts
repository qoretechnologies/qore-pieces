import { Redis } from 'ioredis'
import RedLock from 'redlock'
import { createRedisClient } from '../database/redis-connection'
import { acquireMemoryLock, ApLock, exceptionHandler, QueueMode, system, SystemProp } from '@activepieces/server-shared'

let redLock: RedLock
let redisConnection: Redis
const queueMode = system.get(SystemProp.QUEUE_MODE)!

const initializeLock = () => {
    switch (queueMode) {
        case QueueMode.REDIS: {
            redisConnection = createRedisClient()
            redLock = new RedLock([redisConnection], {
                driftFactor: 0.01,
                retryCount: 30,
                retryDelay: 2000,
                retryJitter: 200,
                automaticExtensionThreshold: 500,
            })
            break
        }
        case QueueMode.MEMORY: {
            break
        }
    }
}


const acquireRedisLock = async (
    key: string,
    timeout: number,
): Promise<ApLock> => {
    try {
        return await redLock.acquire([key], timeout, {
            retryCount: Math.ceil(timeout / 2000) * 2,
            retryDelay: 2000,
        })
    }
    catch (e) {
        exceptionHandler.handle(e)
        throw e
    }
}

type AcquireLockParams = {
    key: string
    timeout?: number
}

export const acquireLock = async ({
    key,
    timeout = 3000,
}: AcquireLockParams): Promise<ApLock> => {
    switch (queueMode) {
        case QueueMode.REDIS:
            return acquireRedisLock(key, timeout)
        case QueueMode.MEMORY:
            return acquireMemoryLock(key)
        default:
            throw new Error(`Unknown queue mode: ${queueMode}`)
    }
}

initializeLock()
