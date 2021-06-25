import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserControler } from "./controllers/AuthenticateUserControler";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserControler = new AuthenticateUserControler();
const createComplimentControler = new CreateComplimentController();

router.post("/tags", ensureAdmin, createTagController.handle)
router.post("/users", createUserController.handle);
router.post("/sessions", authenticateUserControler.handle);
router.post("/compliments", createComplimentControler.handle);

export { router }