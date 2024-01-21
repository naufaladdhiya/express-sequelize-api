import { Request, Response } from "express";
import PasswordHelper from "../helpers/PasswordHelper";
import User from "../db/models/User";
import Helper from "../helpers/Helper";

const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const hashed = await PasswordHelper.PasswordHasing(password);

    const user = await User.create({
      name,
      email,
      password: hashed as string,
      active: true,
      verified: true,
      roleId: 1,
    });

    return res
      .status(201)
      .send(Helper.ResponseData(201, "User created succesfully", user, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

export default { registerUser };
