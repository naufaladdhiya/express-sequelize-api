import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import RoleRoute from "./routes/role.route";
import UserRoute from "./routes/user.route";
import MasterMenuRoute from "./routes/mastermenu.route";
import SubMenuRoute from "./routes/submenu.route";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    response: "Express TypeScript",
  });
});

app.use("/role", RoleRoute);
app.use("/user", UserRoute);
app.use("/menu", MasterMenuRoute);
app.use("/sub-menu", SubMenuRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `${process.env.APP_NAME} running on port ${process.env.APP_PORT}`
  );
});
