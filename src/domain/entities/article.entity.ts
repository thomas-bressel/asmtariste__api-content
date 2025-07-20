export default class Article {
    constructor(
    public readonly id_articles: number,
    public readonly title: string,
    public readonly description: string,
    public readonly creation_date: Date,
    public readonly cover: string,
    public readonly is_display: boolean,
    public readonly id_categories: number,
    public readonly update_date: Date,
    public readonly id_author: number,
    ){}
  }
  
