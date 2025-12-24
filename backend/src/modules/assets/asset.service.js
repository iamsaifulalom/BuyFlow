import 'dotenv/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const uploadService = {
    signUrl: async (body) => {
        const key = `buy-flow/${body.folderName}/${Date.now()}-${body.fileName}`;

        const r2 = new S3Client({
            region: "auto",
            endpoint: process.env.R2_END_POINT,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
            }
        })

        const command = new PutObjectCommand({
            Bucket: process.env.R2_R2_BUCKET_NAME,
            Key: key,
            ContentType: body.fileType,
        });

        const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 300 });
        return { uploadUrl, key }
    }
}