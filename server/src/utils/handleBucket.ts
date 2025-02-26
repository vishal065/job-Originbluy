import {
  DeleteObjectCommand,
  type CompleteMultipartUploadCommandOutput,
} from "@aws-sdk/client-s3";
import s3Client from "../config/bucket";
import CONFIG from "../config/config";
import fs from "fs";
import { Upload } from "@aws-sdk/lib-storage";

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

async function uploadImageFile(path: string, file: Express.Multer.File) {
  const fileStream = fs.createReadStream(file.path);

  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: CONFIG.BUCKET_NAME,
        Key: `${path}/${Date.now() + "-" + file.originalname}`,
        Body: fileStream,
        ContentType: file.mimetype,
      },
      // Optional configuration:
      // partSize: 1024 * 1024, // 1 MB parts, if you want to adjust the chunk size
      // queueSize: 4,         // Number of concurrent uploads
    });

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

async function deleteFile(path: string, key: string) {
  try {
    const deleteParams = {
      Bucket,
      Key: `${path}/${key}`,
    };
    const data = await s3Client.send(new DeleteObjectCommand(deleteParams));
    return data;
  } catch (err) {
    console.error("Error deleting file:", err);
  }
}

export { uploadImageFile, deleteFile };
