import { ItemSimple } from './ItemSimple.js';

export class ItemVisual extends ItemSimple {

    #imageURL

    constructor(name, description, creationDate, modificationDate, imageURL) {
        super(name, description, creationDate, modificationDate);
        this.#imageURL = imageURL;
    }

    set imageURL(imageURL) {
        this.#imageURL = imageURL;
    }
    
    get imageURL() {
        return this.#imageURL;
    }
}