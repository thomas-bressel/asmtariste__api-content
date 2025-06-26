export default class Tag {
    constructor(
        public readonly id_tags: number,
        public readonly color: string,
        public readonly label: string,
        public readonly is_display: boolean,  
        public readonly background_color: string,
        public readonly border_color: string,
    ){}
  }
