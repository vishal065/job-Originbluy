import { type Request, type Response } from "express";

export default (_: Request, res: Response) => {
  res.status(400).json({ error: "Route Not Found" });
};
