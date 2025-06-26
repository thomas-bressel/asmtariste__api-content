import { IsString, IsNotEmpty, IsOptional, IsNumber, Length } from 'class-validator';

export class TagDTO {

  @IsOptional()
  @IsNumber({}, { message: 'L\'id du tag doit être un nombre.' })
  id_tags: number;

  @IsString({ message: 'Le label doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le label est obligatoire.' })
  @Length(2, 30, { message: 'Le tag doit contenir entre 2 et 30 caractères' })
  label: string;

  @IsString({ message: 'La couleur doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'La couleur est obligatoire.' })
  @Length(1, 15, { message: 'La couleur du texte doit contenir 15 caractères maximum' })
  color: string;

  @IsString({ message: 'La couleur de fond doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'La couleur de fond est obligatoire.' })
  @Length(1, 25, { message: 'La couleur de fond doit contenir 25 caractères maximum' })
  background_color: string;

  @IsString({ message: 'La couleur du contour doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'La couleur du contour est obligatoire.' })
  @Length(1, 25, { message: 'La couleur du contour doit contenir 25 caractères maximum' })
  border_color: string;

  is_display: boolean = true;

  constructor(data: any) {
    this.id_tags = data.id_tags;
    this.label = data.label;
    this.color = data.color;
    this.background_color = data.background_color;
    this.border_color = data.border_color;
    this.is_display = true;
  }
}