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

    return res.status(201).send({
      status: 201,
      message: "Create role successfully",
      data: role,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error,
    });
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

    return res.status(200).send({
      status: 200,
      message: "Update role successfully",
      data: role,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error,
    });
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

    return res.status(200).send({
      status: 200,
      message: "Delete role successfully",
      data: role,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error,
    });
  }
};

export default { getRole, getRoleById, createRole, updateRole, deleteRole };
