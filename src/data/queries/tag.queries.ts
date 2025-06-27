import { TagBaseQueries } from "./tag.base.queries";

export class TagQueries extends TagBaseQueries {

    public getAllTags(): string {
        return this.getAllTagsQuery();
    }

    public isTagLabelExist(): string {
        return this.isTagLabelExistQuery();
    }

    public createTag(): string {
        return this.createTagQuery();
    }

    public getTagById(): string {
        return this.getTagByIdQuery();
    }

    public deleteTagAssociations(): string {
        return this.deleteTagAssociationsQuery();
    }

    public deleteTag(): string {
        return this.deleteTagQuery();
    }

}