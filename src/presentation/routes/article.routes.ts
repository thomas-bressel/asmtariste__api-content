// Express importation
import express, {Request, Response, NextFunction, RequestHandler} from "express";

// Controllers importation
import ArticleController from "../controllers/article.controller";
import ArticleService from "../../data/services/article.service";
import ArticleRepository from "../../data/repositories/article.repository";

// Middlewares import
import BodyParserMiddleware from "../middlewares/body-parser.middleware";
import CsrfMiddleware from "../middlewares/csrf.middleware";
import PermissionMiddleware from "../middlewares/permission.middleware";



const router = express.Router();
const csrfMiddleware = new CsrfMiddleware();
const permissionMiddleware = new PermissionMiddleware();
const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);


router.use(BodyParserMiddleware.urlEncodedParser);
router.use(BodyParserMiddleware.jsonParser);


router.get("/content/v1/admin/articles",  async (req: Request, res: Response) => { 
    articleController.getAllArticles(req, res)
});


export default router;