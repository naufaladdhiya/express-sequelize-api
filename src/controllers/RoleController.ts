import { Request, Response } from "express";
import Role from "../db/models/Role";

const getRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await Role.findAll({
      where: {
        active: true,
      },
    });

    return res.status(200).send({
      status: 200,
      message: "Get roles successfully",
      data: roles,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      res.status(500).send({
        status: 500,
        message: error.message,
        error: error.name,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      error: "InternalServerError",
    });
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

    return res.status(200).send({
      status: 200,
      message: "Get role by id successfully",
      data: role,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      res.status(500).send({
        status: 500,
        message: error.message,
        error: error.name,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      error: "InternalServerError",
    });
  }
};

export default { getRole, getRoleById };
