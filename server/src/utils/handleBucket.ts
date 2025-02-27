import {
  DeleteObjectCommand,
  GetObjectCommand,
  type CompleteMultipartUploadCommandOutput,
} from "@aws-sdk/client-s3";
import s3Client from "../config/bucket";
import CONFIG from "../config/config";
import fs from "fs";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import pLimit from "p-limit";

const Bucket = CONFIG.BUCKET_NAME;

//this method didnt work
// async function uploadFile(file: Express.Multer.File) {
//   const uploadParams = {
//     Bucket: CONFIG.BUCKET_NAME,
//     Key: file.originalname,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//   };

//   const data = await s3Client.send(new PutObjectCommand(uploadParams));
//   console.log("File uploaded successfully:", data);
//   return data;
// }

async function uploadFile(path: string, file: Express.Multer.File) {
  const fileStream = fs.createReadStream(file.path);

  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: CONFIG.BUCKET_NAME,
        Key: `${path}/${
          Date.now() + "-" + file.originalname.replace(/ /g, "-")
        }`,
        Body: fileStream,
        ContentType: file.mimetype,
      },
      // Optional configuration:
      partSize: 5 * 1024 * 1024, // 1 MB parts, if you want to adjust the chunk size
      queueSize: 4, // Number of concurrent uploads; lower if network issues persist
    });

    // Optionally, enable verbose logging for debugging:
    upload.on("httpUploadProgress", (progress) => console.log(progress));

    const result: CompleteMultipartUploadCommandOutput = await upload.done();
    if (result.Key) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error removing temporary file:", err);
        }
      });
      return { URL: result.Location, key: result.Key };
    }
  } catch (error) {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error removing temporary file:", err);
      }
    });
    console.log("error in uploading file", error);
  }
}

async function deleteFile(key: string) {
  try {
    const deleteParams = {
      Bucket,
      Key: key,
    };
    const data = await s3Client.send(new DeleteObjectCommand(deleteParams));
    return data;
  } catch (err) {
    console.error("Error deleting file:", err);
  }
}

async function getObjectURLs(
  keys: string[],
  expiresIn = "3600"
): Promise<string[]> {
  const limit = pLimit(5); // Limit to 5 concurrent operations
  const promises = keys.map((key) =>
    limit(async () => {
      const command = new GetObjectCommand({
        Bucket: CONFIG.BUCKET_NAME,
        Key: key,
      });
      return getSignedUrl(s3Client, command, { expiresIn: Number(expiresIn) });
    })
  );
  return Promise.all(promises);
}
export { uploadFile, deleteFile, getObjectURLs };
