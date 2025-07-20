export interface ArticleWithDetailsDTO {
    id_articles: number;
    title: string;
    description: string;
    creation_date: Date;
    cover: string;
    is_display: boolean;
    id_categories: number;
    update_date: Date;
    id_author: number;
    
    category_name: string;
    author: {
      id_author: number;
      user_uuid: string;
      author_nickname: string;
    };
    tags: Array<{
      id_tags: number;
      label: string;
      color: string;
      background_color: string;
      border_color: string;
    }>;
  }
  