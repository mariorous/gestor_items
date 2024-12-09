export class ItemVisual extends ItemSimple {

    #imageURL

    constructor(name, description, createData, modificationData, imageURL) {
        super(name, description, createData, modificationData);
        this.#imageURL = imageURL;
    }

    set imageURL(imageURL) {
        this.#imageURL = imageURL;
    }
    
    get imageURL() {
        return this.#imageURL;
    }
}