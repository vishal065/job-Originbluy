const CONFIG = {
  PORT: process.env.PORT,

  // #DataBase
  DB_NAME: process.env.DB_NAME as string,
  MONGODB_URL: process.env.MONGODB_URL as string,

  // JWT
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,

  //AWS
  REGION: process.env.REGION as string,
  BUCKET_NAME: process.env.BUCKET_NAME as string,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID as string,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY as string,
};

export default CONFIG;
