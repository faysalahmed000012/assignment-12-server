import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constants";
import { UserControllers } from "./user.controllers";

const router = Router();

router.get("/", auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.get("/login", UserControllers.login);
router.get("/access-token", UserControllers.generateAccessToken);
router.get("/:email", auth(USER_ROLE.admin), UserControllers.getUserByEmail);
router.post("/signup", UserControllers.createUser);
router.put("/admin/:email", auth(USER_ROLE.admin), UserControllers.makeAdmin);

export const UserRoutes = router;
