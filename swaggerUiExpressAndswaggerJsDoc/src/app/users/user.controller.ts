import { Request, Response } from "express";
import userService from "./user.service";

class UserController {
  getAll(req: Request, res: Response) {
    const users = userService.getAll();
    res.status(200).json(users);
  }

  getById(req: Request, res: Response) {
    const user = userService.getById(req.params.id!);
    res.status(200).json(user);
  }
}

const userController = new UserController();

export default userController;
