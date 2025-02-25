const CONFIG = {
  PORT: process.env.PORT,

  // #DataBase
  DB_NAME: process.env.DB_NAME as string,
  MONGODB_URL: process.env.MONGODB_URL as string,

  // JWT
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
};

export default CONFIG;
