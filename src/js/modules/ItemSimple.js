export class ItemSimple {
    #name
    #description
    #creationDate
    #modificationDate

    constructor(name, description, creationDate, modificationDate) {
        this.#name = name
        this.#description = description
        this.#description = creationDate
        // this.#creationDate = new Date()
        this.#modificationDate = modificationDate
    }

    set name(name) {
        this.#name = name
    }

    get name() {
        return this.#name
    }

    set description(description) {
        this.#description = description
    }

    get description() {
        return this.#description
    }
    
    set creationDate(creationDate) {
        this.#creationDate = creationDate
    }
    
    get creationDate() {
        return this.#creationDate
    }
    
    set modificationDate(modificationDate) {
        this.#modificationDate = modificationDate
    }
    
    get modificationDate() {
        return this.#modificationDate
    }
}
