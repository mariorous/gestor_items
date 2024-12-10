import { ItemSimple } from './ItemSimple.js';

export class ItemVisual extends ItemSimple {

    #imageURL

    constructor(name, description, creationDate, modificationDate, imageURL) {
        super(name, description, creationDate, modificationDate);
        this.imageURL = imageURL;
    }

    toJSON() {
        let toJson = {
            name: this.name,
            description: this.description,
            creationDate: this.creationDate,
            modificationDate: this.modificationDate,
            imageURL: this.imageURL
        };

        return toJson;
    }

    set imageURL(imageURL) {
        this.#imageURL = imageURL;
    }
    
    get imageURL() {
        return this.#imageURL;
    }
}