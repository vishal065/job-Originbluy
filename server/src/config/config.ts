const CONFIG = {
  PORT: process.env.PORT,

  // #DataBase
  DB_NAME: process.env.DB_NAME as string,
  MONGODB_URL: process.env.MONGODB_URL as string,

  // JWT
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY ,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,

  //Nodemailer
  Auth_MAIL: process.env.Auth_MAIL as string,
  Auth_PASS: process.env.Auth_PASS as string,
};

export default CONFIG;
