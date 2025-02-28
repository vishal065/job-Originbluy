import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import indexRoute from "./routers/index.router";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";
const app: Application = express();
// [`http://localhost:3000`, "http://localhost:5173/signin", `*`]
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//Routes
app.use("/api/v1", indexRoute);
app.use("/*", errorMiddleware);

export default app;
