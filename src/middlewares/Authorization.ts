import { Request, Response, NextFunction } from "express";
import Helper from "../helpers/Helper";

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];

    if (token == null)
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));

    const result = Helper.ExtractToken(token!);

    if (!result)
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));

    res.locals.userEmail = result?.email;
    res.locals.roleId = result?.roleId;
    next();
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const SuperAdminRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = res.locals.roleId;

    if (role !== 1)
      return res
        .status(403)
        .send(Helper.ResponseData(403, "Forbidden", null, null));

    next();
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const AdminRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = res.locals.roleId;

    if (role !== 2)
      return res
        .status(403)
        .send(Helper.ResponseData(403, "Forbidden", null, null));

    if (role === 2 || role === 1) next();

    next();
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const BasicUserRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = res.locals.roleId;

    if (role !== 3)
      return res
        .status(403)
        .send(Helper.ResponseData(403, "Forbidden", null, null));

    next();
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

export default { Authenticated, SuperAdminRole, AdminRole, BasicUserRole };
