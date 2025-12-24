import 'dotenv/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { assetRepo } from './asset.repo.js';

const r2 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_END_POINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
    }
})

export const uploadService = {
    signUrl: async ({ folderName, originalName, type, size }) => {
        const filePath = `${folderName}/${Date.now()}-${originalName}`;
        const key = `buy-flow/${filePath}`

        const command = new PutObjectCommand({
            Bucket: process.env.R2_R2_BUCKET_NAME,
            Key: key,
            ContentType: type,
        });

        const assetDoc = await assetRepo.createAsset({
            key,
            filePath,
            originalName: originalName,
            type: type,
            size: size
        })

        const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 300 });
        return { uploadUrl, assetId: assetDoc.id }
    }
}