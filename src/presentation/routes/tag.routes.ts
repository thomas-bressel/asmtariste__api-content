// Express importation
import express, {Request, Response, NextFunction, RequestHandler} from "express";

// Controllers importation
import TagController from "../controllers/tag.controller";
import TagService from "../../data/services/tag.service";
import TagRepository from "../../data/repositories/tag.repository";

// Middlewares import
import BodyParserMiddleware from "../middlewares/body-parser.middleware";
import CsrfMiddleware from "../middlewares/csrf.middleware";



const router = express.Router();
const csrfMiddleware = new CsrfMiddleware();
const tagRepository = new TagRepository();
const tagService = new TagService(tagRepository);
const tagController = new TagController(tagService);


router.use(BodyParserMiddleware.urlEncodedParser);
router.use(BodyParserMiddleware.jsonParser);


router.get("/content/v1/admin/tags", csrfMiddleware.authToken,  async (req: Request, res: Response) => { 
    tagController.getAllTags(req, res)
});
export default router;