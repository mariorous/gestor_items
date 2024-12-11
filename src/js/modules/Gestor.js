import { LocalStorage } from "./LocalStorage.js";

export class Gestor {
    #items

    constructor() {
        this.items = [];
    }

    addItem(item) {
        if (localStorage.getItem('items') === null) {
            this.items = [];
        } else {
            this.items = LocalStorage.getItems();
        }
        console.log('Items antes de añadir el actual: ', this.items);

        this.items.push(item);
        LocalStorage.setItems(JSON.stringify(this.items));
        this.renderTable();
    }

    /* updateItem(item) {
        this.items.forEach((p, index) => {
            if (p.id === item.id) {
                this.items[index] = item;
            }
        });
    }
    */

    removeItem(nameToDelete) {
        if (localStorage.getItem('items') === null) {
            this.items = [];
        } else {
            this.items = LocalStorage.getItems();
        }

        this.items = this.items.filter(item => item.name !== nameToDelete);
        LocalStorage.setItems(JSON.stringify(this.items));
        this.renderTable();
    }
    

    renderTable(filtering) {
        const tableContent = document.querySelector(".table-content");
        tableContent.innerHTML = ""; // Limpia el contenido previo de la tabla

        // Si no está filtrando, mostrar todos los ítems del localStorage
        if (!filtering) {
            this.items = LocalStorage.getItems();
        }

        // Si no hay ítems, mostrar un mensaje
        if (this.items.length === 0) {
            tableContent.innerHTML = `
                <div class="no-items-message">
                    <div class="no-items-icon">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <div class="no-items-text">
                        <h3>No se encontraron ítems</h3>
                        <p>Intenta ajustar tu búsqueda o añadir nuevos productos.</p>
                    </div>
                </div>
            `;
            return;
        }

        // Si está filtrando, mostrar solo los ítems que coincidan con el filtro
        this.items.forEach(item => {
            let itemInfo = `
                <div class="container-card">
                    <div class="img-info-div">

                        <div class="image-url">
                    `;

                if (item.imageURL) {
                    itemInfo += `<img class="item-image" src="${item.imageURL}" alt="Imagen del producto">`;
                } else {
                    itemInfo += `<img class="item-image no-image" src="./src/assets/no_image.jpg" alt="Imagen del producto">`;
                }

                itemInfo += ` </div>
                        <div class="item-desc" name-item="${item.name}">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                    <div class="creation-date">
                        <p>${item.creationDate}</p>
                    </div>
                    <div class="modification-date">
                        <p>${item.modificationDate}</p>
                    </div>
                    <div class="button">
                        <button class="delete-item-btn" name-item="${item.name}" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">Eliminar</button>
                    </div>
                </div>
            `;

        tableContent.innerHTML += itemInfo;
        });
    }

    set items(items) {
        this.#items = items;
    }

    get items() {
        return this.#items;
    }
}