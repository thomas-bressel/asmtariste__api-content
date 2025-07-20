// Express importation
import { Request, Response } from "express";

// Service importation
import ArticleService from "../../data/services/article.service";
import { ArticleWithDetailsDTO } from "src/data/models/article-with-details.model";


class ArticleController {
  private articleService: ArticleService;

  constructor(articleService: ArticleService) {
    this.articleService = articleService;
  }


/**
 * Get the list of all articles
 * @param req 
 * @param res 
 * @returns 
 */
  public async getAllArticles(req: Request, res: Response): Promise<Response> {
    const option = req.query.option as string;
    console.log('Valeur que query.option : ',option)

    try {
      if (!option) return res.status(400).json({ message: `Paramètre '${option}' non reconnu` });

      if (option === 'all') {
        const response = await this.articleService.getAllArticles();
        if (!response) throw new Error("Résultat vide dans articles");
        return res.status(200).json(response);
      }

      if (option === 'details') {
        const response: ArticleWithDetailsDTO[] = await this.articleService.getAllArticlesWithDetails();
        if (!response || response.length === 0) throw new Error("Résultat vide dans articles");
        return res.status(200).json(response);
      }
      return res.status(400).json({ message: `Paramètre '${option}' non reconnu` })

    }
    catch (error) {
      console.error("Erreur dans ArticleController - articles :", error);
      return res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur interne du serveur") });
    }
  }
}

export default ArticleController;