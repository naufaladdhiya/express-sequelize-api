import { Request, Response, NextFunction } from "express";
import Helper from "../helpers/Helper";
import Submenu from "../db/models/SubMenu";

const createSubMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } =
      req.body;

    const submenu = await Submenu.create({
      name,
      masterMenuId,
      url,
      title,
      icon,
      ordering,
      isTargetSelf,
      active: true,
    });

    return res
      .status(201)
      .send(
        Helper.ResponseData(201, "Submenu created succesfully", submenu, null)
      );
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
    const submenu = await Submenu.findAll({
      where: {
        active: true,
      },
    });

    return res
      .status(200)
      .send(Helper.ResponseData(200, "List submenu", submenu, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const getAllSubMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const submenu = await Submenu.findAll();

    return res
      .status(200)
      .send(Helper.ResponseData(200, "List submenu", submenu, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const updateSubMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } =
      req.body;

    const submenu = await Submenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!submenu) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "Submenu not found", submenu, null));
    }

    submenu.name = name;
    submenu.masterMenuId = masterMenuId;
    submenu.url = url;
    submenu.title = title;
    submenu.icon = icon;
    submenu.ordering = ordering;
    submenu.isTargetSelf = isTargetSelf;

    await submenu.save();

    return res
      .status(200)
      .send(Helper.ResponseData(200, "Submenu updated", submenu, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const deleteSoftSubMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;

    const submenu = await Submenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!submenu) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "Submenu not found", submenu, null));
    }

    submenu.active = false;

    await submenu.save();

    return res
      .status(200)
      .send(Helper.ResponseData(200, "Submenu deleted", submenu, null));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

const deleteSubMenuPermanently = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const submenu = await Submenu.findOne({
      where: {
        id: id,
      },
    });

    if (!submenu) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "Submenu not found", submenu, null));
    }

    await submenu.destroy();

    return res
      .status(200)
      .send(
        Helper.ResponseData(200, "Submenu deleted permanently", submenu, null)
      );
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, error));
  }
};

export default {
  createSubMenu,
  getListMenu,
  getAllSubMenu,
  updateSubMenu,
  deleteSoftSubMenu,
  deleteSubMenuPermanently,
};
