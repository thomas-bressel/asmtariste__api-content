import  TagEntity  from '../../domain/entities/tag.entity';


export class TagResponseDTO {
  constructor(
    public id_tags: number,
    public color: string,
    public background_color: string,
    public border_color: string,
    public label: string,
    public is_display: boolean,
  ) {}

  /**
   * Create a DTO from an entity
   * @param tag 
   * @returns 
   */
  static fromEntity(tag: TagEntity): TagResponseDTO {
    return new TagResponseDTO(
      tag.id_tags,
      tag.color,
      tag.background_color,
      tag.border_color,
      tag.label,
      tag.is_display,
    );
  }


  /**
   * Convert an entities list into DTO
   * @param tags 
   * @returns 
   */
  static fromEntities(tags: TagEntity[]): TagResponseDTO[] {
    return tags.map((tag) => TagResponseDTO.fromEntity(tag));
  }


}