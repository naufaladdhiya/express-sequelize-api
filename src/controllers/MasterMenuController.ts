import { Request, Response, NextFunction } from "express";

import Helper from "../helpers/Helper";
import MasterMenu from "../db/models/MasterMenu";

const createMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { name, icon, ordering } = req.body;

    const menu = await MasterMenu.create({
      name,
      icon,
      ordering,
    });

    return res
      .status(201)
      .send(Helper.ResponseData(201, "Menu created succesfully", menu, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const getListMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const menus = await MasterMenu.findAll({
      where: {
        active: true,
      },
    });

    return res
      .status(200)
      .send(Helper.ResponseData(200, "List menu", menus, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const getAllMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const menus = await MasterMenu.findAll();

    return res
      .status(200)
      .send(Helper.ResponseData(200, "List menu", menus, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const getMenuById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;

    const menu = await MasterMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!menu)
      return res
        .status(404)
        .send(Helper.ResponseData(404, "Menu not found", null, null));

    return res.status(200).send(Helper.ResponseData(200, "Menu", menu, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const updateMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, icon, ordering } = req.body;

    const menu = await MasterMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!menu)
      return res
        .status(404)
        .send(Helper.ResponseData(404, "Menu not found", null, null));

    menu.name = name;
    menu.icon = icon;
    menu.ordering = ordering;

    await menu.save();

    return res
      .status(200)
      .send(Helper.ResponseData(200, "Menu updated", menu, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const softDeleteMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;

    const menu = await MasterMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!menu)
      return res
        .status(404)
        .send(Helper.ResponseData(404, "Menu not found", null, null));

    menu.active = false;

    return res
      .status(200)
      .send(Helper.ResponseData(200, "Menu deleted", menu, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const deleteMenuPermanenly = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const submenu = await MasterMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!submenu)
      return res
        .status(404)
        .send(Helper.ResponseData(404, "Menu not found", null, null));

    await submenu.destroy();

    return res
      .status(200)
      .send(
        Helper.ResponseData(200, "Menu deleted permanently", submenu, null)
      );
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

export default {
  createMenu,
  getListMenu,
  getAllMenu,
  getMenuById,
  updateMenu,
  softDeleteMenu,
  deleteMenuPermanenly,
};
