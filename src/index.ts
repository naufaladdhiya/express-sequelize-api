import express, { Express, Request, Response } from "express";
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript!");
});

app.listen(process.env.APP_PORT, () => {
  console.log(
    `${process.env.APP_NAME} running on port ${process.env.APP_PORT}`
  );
});
