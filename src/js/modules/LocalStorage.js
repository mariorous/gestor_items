import { ItemSimple } from "./ItemSimple.js";
import { ItemVisual } from "./ItemVisual.js";

export class LocalStorage {
    static #storage = localStorage;

    static setItems(items) {
        console.log('Items antes de guardar en LS: ', items);
        this.#storage.setItem('items', items);
    }

/*     static getItem(key) {
        const storedData = JSON.parse(localStorage.getItem(key));
        const productInstance = new ItemSimple(
            storedData.name,
            storedData.description,
            storedData.creationDate,
            storedData.modificationDate
        );
        return productInstance;
    } */

    static getItems() {
        // Recupera los objetos del localStorage
        const itemsFromStorage = JSON.parse(this.#storage.getItem('items'));

        // Convierte los objetos a instancias adecuadas según el tipo
        const items = itemsFromStorage.map(itemData => {
            if (itemData.imageURL) {
                // Si el objeto tiene imageURL, es un ItemVisual
                return new ItemVisual(
                    itemData.name,
                    itemData.description,
                    itemData.creationDate,
                    itemData.modificationDate,
                    itemData.imageURL
                );
            } else {
                // Si no tiene imageURL, es un ItemSimple
                return new ItemSimple(
                    itemData.name,
                    itemData.description,
                    itemData.creationDate,
                    itemData.modificationDate
                );
            }
        });

        return itemsFromStorage
    }

    static clear() {
        this.#storage.clear();
    }
    
}