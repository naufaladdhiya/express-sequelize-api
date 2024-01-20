import { Request, Response } from "express";
import Role from "../db/models/Role";

import Helper from "../helpers/Helper";

const getRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await Role.findAll({
      where: {
        active: true,
      },
    });

    return res
      .status(200)
      .send(Helper.ResponseData(200, "Get role successfully", roles, null));
  } catch (error: any) {
    return res
      .status(500)
      .send(Helper.ResponseData(500, "Internal server error", null, error));
  }
};

const getRoleById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).send({
        status: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    return res
      .status(200)
      .send(Helper.ResponseData(200, "Get role successfully", role, null));
  } catch (error: any) {
    return res
      .status(500)
      .send(Helper.ResponseData(500, "Internal server error", null, error));
  }
};

const createRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleName, active } = req.body;

    if (!roleName || !active) {
      return res.status(400).send({
        status: 400,
        message: "Bad Request",
        error: "BadRequest",
      });
    }

    const role = await Role.create({
      roleName,
      active,
    });

    return res
      .status(201)
      .send(Helper.ResponseData(201, "Create role successfully", role, null));
  } catch (error: any) {
    return res
      .status(500)
      .send(Helper.ResponseData(500, "Internal server error", null, error));
  }
};

const updateRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { roleName, active } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).send({
        status: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    role.roleName = roleName;
    role.active = active;

    await role.save();

    return res
      .status(200)
      .send(Helper.ResponseData(200, "Update role successfully", role, null));
  } catch (error: any) {
    return res
      .status(500)
      .send(Helper.ResponseData(500, "Internal server error", null, error));
  }
};

const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).send({
        status: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    await role.destroy();

    return res
      .status(200)
      .send(Helper.ResponseData(200, "Delete role successfully", null, null));
  } catch (error: any) {
    return res
      .status(500)
      .send(Helper.ResponseData(500, "Internal server error", null, error));
  }
};

export default { getRole, getRoleById, createRole, updateRole, deleteRole };
