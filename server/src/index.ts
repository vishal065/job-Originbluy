import app from "./app";
import dbConnect from "./config/DBConnect";
import CONFIG from "./config/config";

dbConnect()
  .then(() => {
    app.listen(CONFIG.PORT, () => {
      console.info("server is running on PORT ", CONFIG.PORT);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
