// Express importation
import express, {Request, Response, NextFunction, RequestHandler} from "express";

// Controllers importation
import TagController from "../controllers/tag.controller";
import TagService from "../../data/services/tag.service";
import TagRepository from "../../data/repositories/tag.repository";

// Middlewares import
import BodyParserMiddleware from "../middlewares/body-parser.middleware";
import CsrfMiddleware from "../middlewares/csrf.middleware";
import PermissionMiddleware from "../middlewares/permission.middleware";



const router = express.Router();
const csrfMiddleware = new CsrfMiddleware();
const permissionMiddleware = new PermissionMiddleware();
const tagRepository = new TagRepository();
const tagService = new TagService(tagRepository);
const tagController = new TagController(tagService);


router.use(BodyParserMiddleware.urlEncodedParser);
router.use(BodyParserMiddleware.jsonParser);


router.get("/content/v1/admin/tags", csrfMiddleware.authToken, permissionMiddleware.check('VIEW_ALL_TAGS'),  async (req: Request, res: Response) => { 
    tagController.getAllTags(req, res)
});
router.post("/content/v1/admin/tag/create", csrfMiddleware.authToken, permissionMiddleware.check('CREATE_TAG'),  async (req: Request, res: Response) => { 
    tagController.createTag(req, res)
});
router.delete("/content/v1/admin/tag/delete", csrfMiddleware.authToken, permissionMiddleware.check('DELETE_TAiG'),  async (req: Request, res: Response) => { 
    tagController.deleteTag(req, res)
});
export default router;