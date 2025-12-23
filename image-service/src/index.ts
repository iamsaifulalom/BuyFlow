import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export interface BODY {
    project: string,
    fileName: string,
    fileType: string
}

export default {
    async fetch(req: Request, env: any) {
        const authorization = req.headers.get("authorization");

        // Authorization header missing
        if (!authorization || env.UPLOAD_TOKEN !== authorization) {
            return new Response("Unauthorized request.", { status: 401 })
        }

        // only post method allowed
        if (req.method !== "POST") {
            return new Response("Only post request allowed", { status: 400 })
        }

        const body: BODY = await req.json()
        const key = `${body.project}/uploads/${Date.now()}-${body.fileName}`;


        const r2 = new S3Client({
            region: "auto",
            endpoint: env.R2_END_POINT,
            credentials: {
                accessKeyId: "",
                secretAccessKey: ""
            }
        })

        const command = new PutObjectCommand({
            Bucket: "my-first-bucket",
            Key: key,
            ContentType: body.fileType,
        });

        const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 300 });
        return new Response(uploadUrl, { status: 200 })
    }
}