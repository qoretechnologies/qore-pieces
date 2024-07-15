import { repoFactory } from '../../core/db/repo-factory'
import { FlowEntity } from '../../flows/flow/flow.entity'
import { FlowVersionEntity } from '../../flows/flow-version/flow-version-entity'
import { systemJobsSchedule } from '../../helper/system-jobs'
import { pieceMetadataService } from '../../pieces/piece-metadata-service'
import { logger } from '@activepieces/server-shared'
import { ActionType, flowHelper, FlowStatus, isNil, PieceAction, PieceTrigger, TriggerType } from '@activepieces/shared'

const flowRepo = repoFactory(FlowEntity)
const flowVersionRepo = repoFactory(FlowVersionEntity)
export const piecesAnalyticsService = {
    async init(): Promise<void> {
        await systemJobsSchedule.upsertJob({
            job: {
                name: 'pieces-analytics',
                data: {},
            },
            schedule: {
                type: 'repeated',
                cron: '0 12 * * *',
            },
            async handler() {
                const flowIds: string[] = (await flowRepo().createQueryBuilder().select('id').where({
                    status: FlowStatus.ENABLED,
                }).getRawMany()).map((flow) => flow.id)
                const activeProjects: Record<string, Set<string>> = {}
                logger.info('Syncing pieces analytics')
                for (const flowId of flowIds) {
                    const flow = await flowRepo().findOneBy({
                        id: flowId,
                    })
                    const publishedVersionId = flow?.publishedVersionId
                    if (isNil(flow) || isNil(publishedVersionId)) {
                        continue
                    }
                    const flowVersion = await flowVersionRepo().findOneBy({
                        id: publishedVersionId,
                    })
                    if (isNil(flowVersion)) {
                        continue
                    }
                    const pieces = flowHelper.getAllSteps(flowVersion.trigger).filter(
                        (step) =>
                            step.type === ActionType.PIECE || step.type === TriggerType.PIECE,
                    ).map((step) => {
                        const clonedStep = step as (PieceTrigger | PieceAction)
                        return {
                            name: clonedStep.settings.pieceName,
                            version: clonedStep.settings.pieceVersion,
                        }
                    })
                    for (const piece of pieces) {
                        try {
                            const pieceMetadata = await pieceMetadataService.getOrThrow({
                                name: piece.name,
                                version: piece.version,
                                projectId: flow.projectId,
                            })
                            const pieceId = pieceMetadata.id!
                            activeProjects[pieceId] = activeProjects[pieceId] || new Set()
                            activeProjects[pieceId].add(flow.projectId)
                        }
                        catch (e) {
                            logger.error({
                                name: piece.name,
                                version: piece.version,
                            }, 'Piece not found in pieces analytics service')
                        }
                    }
                }
                for (const id in activeProjects) {
                    await pieceMetadataService.updateUsage({
                        id,
                        usage: activeProjects[id].size,
                    })
                }
                logger.info('Synced pieces analytics finished')

            },
        })
    },
}
