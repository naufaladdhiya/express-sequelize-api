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

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (email == null || password == null)
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Bad Request", null, null));

    const findUser = await User.findOne({ where: { email: email } });

    if (!findUser)
      return res
        .status(404)
        .send(Helper.ResponseData(404, "User not found", null, null));

    const checkPassword = await PasswordHelper.PasswordCompare(
      password,
      findUser.password
    );

    if (!checkPassword)
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));

    const dataUser = {
      name: findUser.name,
      email: findUser.email,
      roleId: findUser.roleId,
      verified: findUser.verified,
      active: findUser.active,
    };

    const token = Helper.GenerateToken(dataUser);
    const refreshToken = Helper.GenerateRefreshToken(dataUser);

    findUser.accessToken = token;
    await findUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const responseUser = {
      name: findUser.name,
      email: findUser.email,
      roleId: findUser.roleId,
      verified: findUser.verified,
      active: findUser.active,
      token: token,
    };

    return res
      .status(200)
      .send(Helper.ResponseData(200, "Login success", responseUser, null));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

export default { registerUser, loginUser };
