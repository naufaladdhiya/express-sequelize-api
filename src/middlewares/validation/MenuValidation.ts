import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";

import Helper from "../../helpers/Helper";
import MasterMenu from "../../db/models/MasterMenu";

const createMenuValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, icon, ordering } = req.body;
    const data = {
      name,
      icon,
      ordering,
    };
    const rules: Validator.Rules = {
      name: "required|string|min:3|max:50",
      ordering: "required|integer",
      icon: "required|string|min:3|max:50",
    };
    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(
          Helper.ResponseData(400, "Validation error", null, validate.errors)
        );
    }
    next();
  } catch (error: any) {
    return res
      .status(500)
      .send(Helper.ResponseData(500, "Bad request", null, error));
  }
};

const createSubMenuValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } =
      req.body;

    const data = {
      name,
      masterMenuId,
      url,
      title,
      icon,
      ordering,
      isTargetSelf,
    };

    const rules: Validator.Rules = {
      name: "required|string|min:3|max:50",
      masterMenuId: "required|number",
      url: "required|string|min:3|max:50",
      title: "required|string|min:3|max:50",
      icon: "required|string|min:3|max:50",
      ordering: "required|number",
      isTargetSelf: "required|boolean",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(
          Helper.ResponseData(400, "Validation error", null, validate.errors)
        );
    }

    const menu = await MasterMenu.findOne({
      where: {
        id: masterMenuId,
        active: true,
      },
    });

    if (!menu) {
      const errorData = {
        errors: {
          masterMenuId: ["Master menu not found"],
        },
      };
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Bad Request", null, errorData));
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .send(Helper.ResponseData(500, "Bad request", null, error));
  }
};

export default { createMenuValidation, createSubMenuValidation };
