import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class TagDTO {

  @IsOptional()
  @IsNumber({}, { message: 'L\'id du tag doit être un nombre.' })
  id_tags: number;
  
  @IsString({ message: 'Le label doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le label est obligatoire.' })
  label: string;
  
  @IsString({ message: 'La couleur doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'La couleur est obligatoire.' })
  color: string;
  
  @IsString({ message: 'La couleur de fond doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'La couleur de fond est obligatoire.' })
  background_color: string;
  
  @IsString({ message: 'La couleur du contour doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'La couleur du contour est obligatoire.' })
  border_color: string;

  constructor(data: any) {
    this.id_tags = data.id_tags;
    this.label = data.label;
    this.color = data.color;
    this.background_color = data.background_color;
    this.border_color = data.border_color;
  }
}
