import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileExists, packageManager } from '@activepieces/server-shared'
import {
    getPackageArchivePathForPiece,
    PackageType,
    PiecePackage,
    PrivatePiecePackage,
} from '@activepieces/shared'
import { PACKAGE_ARCHIVE_PATH, PieceManager } from './piece-manager'

export class RegistryPieceManager extends PieceManager {
    protected override async installDependencies({
        projectPath,
        pieces,
    }: InstallParams): Promise<void> {
        await this.savePackageArchivesToDiskIfNotCached(pieces)

        const enrichedDependencies = await Promise.all(
            pieces.map(async (piece) => {
                const pkg = this.pieceToDependency(piece)
                const fExists = await fileExists(join(projectPath, 'node_modules', pkg.alias))
                return { pkg, fExists }
            }),
        )
        const dependencies = enrichedDependencies.filter(({ fExists }) => !fExists).map(({ pkg }) => pkg)

        if (dependencies.length === 0) {
            return
        }
        await packageManager.add({
            path: projectPath,
            dependencies,
        })
    }

    private async savePackageArchivesToDiskIfNotCached(
        pieces: PiecePackage[],
    ): Promise<void> {
        const packages = await this.getUncachedArchivePackages(pieces)
        const saveToDiskJobs = packages.map((piece) =>
            this.getArchiveAndSaveToDisk(piece),
        )
        await Promise.all(saveToDiskJobs)
    }

    private async getUncachedArchivePackages(
        pieces: PiecePackage[],
    ): Promise<PrivatePiecePackage[]> {
        const packages: PrivatePiecePackage[] = []

        for (const piece of pieces) {
            if (piece.packageType !== PackageType.ARCHIVE) {
                continue
            }

            const archivePath = getPackageArchivePathForPiece({
                archiveId: piece.archiveId,
                archivePath: PACKAGE_ARCHIVE_PATH,
            })

            if (await fileExists(archivePath)) {
                continue
            }

            packages.push(piece)
        }

        return packages
    }

    private async getArchiveAndSaveToDisk(
        piece: PrivatePiecePackage,
    ): Promise<void> {
        const archiveId = piece.archiveId

        const archivePath = getPackageArchivePathForPiece({
            archiveId,
            archivePath: PACKAGE_ARCHIVE_PATH,
        })

        await mkdir(dirname(archivePath), { recursive: true })
        await writeFile(archivePath, piece.archive as Buffer)
    }
}

type InstallParams = {
    projectPath: string
    pieces: PiecePackage[]
}
