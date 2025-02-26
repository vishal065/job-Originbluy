import { S3Client } from "@aws-sdk/client-s3";

import CONFIG from "./config";

const REGION = CONFIG.REGION;
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: CONFIG.ACCESS_KEY_ID,
    secretAccessKey: CONFIG.SECRET_ACCESS_KEY,
  },
});

export default s3Client;
