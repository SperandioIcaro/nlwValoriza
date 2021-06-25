import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserControler } from "./controllers/AuthenticateUserControler";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserController } from "./controllers/ListUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserControler = new AuthenticateUserControler();
const createComplimentControler = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUserController = new ListUserController();


router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post("/users", createUserController.handle);
router.post("/sessions", authenticateUserControler.handle);
router.post("/compliments", ensureAuthenticated, createComplimentControler.handle);
router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);
router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.get("/users", ensureAuthenticated, listUserController.handle)

export { router }