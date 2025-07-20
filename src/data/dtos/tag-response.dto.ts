import  Tag  from '../../domain/entities/tag.entity';


export class TagResponseDTO {
  constructor(
    public id_tags: number,
    public color: string,
    public label: string,
    public is_display: boolean,
    public background_color: string,
    public border_color: string,
  ) {}

  /**
   * Create a DTO from an entity
   * @param tag 
   * @returns 
   */
  static fromEntity(tag: Tag): TagResponseDTO {
    return new TagResponseDTO(
      tag.id_tags,
      tag.color,
      tag.label,
      tag.is_display,
      tag.background_color,
      tag.border_color,
    );
  }


  /**
   * Convert an entities list into DTO
   * @param tags 
   * @returns 
   */
  static fromEntities(tags: Tag[]): TagResponseDTO[] {
    return tags.map((tag) => TagResponseDTO.fromEntity(tag));
  }


}