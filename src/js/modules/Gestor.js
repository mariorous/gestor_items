import { LocalStorage } from "./LocalStorage.js";

export class Gestor {
    #items

    constructor() {
        this.items = [];
    }

    addItem(itemToAdd) {
        if (localStorage.getItem('items') === null) {
            this.items = [];
        } else {
            this.items = LocalStorage.getItems();
        }
        console.log('Items antes de añadir el actual: ', this.items);

        if (this.items.find(item => item.name === itemToAdd.name)) {
            return true;
        } else {
            this.items.push(itemToAdd);
            LocalStorage.setItems(JSON.stringify(this.items));
        }
        
        this.renderTable();
    }

    updateItem(itemToUpdate) {
        let items = LocalStorage.getItems();

        // Iterar por los ítems y actualizar el que coincide
        items.forEach(item => {
            if (item.name === itemToUpdate.name) {
                item.description = itemToUpdate.description;
                item.creationDate = itemToUpdate.creationDate;
                item.modificationDate = itemToUpdate.modificationDate;
                item.imageURL = itemToUpdate.imageURL;
            }
        });

        LocalStorage.setItems(JSON.stringify(items));
        this.renderTable();
    }

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
    

    renderTable(filtering = false, currentPage = 1, listeners = () => {}) {
        const itemsPerPage = 5;
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
    
        // Calcular el índice de inicio y fin de los ítems a mostrar
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToShow = this.items.slice(startIndex, endIndex);
    
        // Mostrar solo los ítems correspondientes a la página actual
        itemsToShow.forEach(item => {
            let itemInfo = `
                <div class="container-card">
                    <div class="img-info-div">
                        <div class="image-url">
            `;
    
            if (item.imageURL) {
                itemInfo += `<img class="item-image" src="${item.imageURL}" alt="Imagen del producto">
                            </div>
                            <div class="item-desc" name-item="${item.name}" type-item="visual" data-bs-toggle="modal" data-bs-target="#updateItem">
                `;
            } else {
                itemInfo += `<img class="item-image no-image" src="./src/assets/no_image.jpg" alt="Imagen del producto">
                            </div>
                            <div class="item-desc" name-item="${item.name}" type-item="simple" data-bs-toggle="modal" data-bs-target="#updateItem">
                `;
            }
    
            itemInfo += `
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
        
        /*
        Math.ceil() se utiliza para calcular el número total de páginas necesarias para mostrar todos los ítems, 
        redondeando hacia arriba en caso de que haya ítems que no llenen completamente una página. Por ejemplo, 
        si tienes 12 ítems y muestras 5 ítems por página, this.items.length / itemsPerPage sería 2.4. Math.ceil(2.4) redondea hacia arriba a 3, 
        indicando que necesitas 3 páginas para mostrar todos los ítems.
        */
       
        // Añadir controles de paginación
        const totalPages = Math.ceil(this.items.length / itemsPerPage);
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';
    
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'page-button';
            pageButton.innerText = i;
            pageButton.addEventListener('click', () => {
                this.renderTable(filtering, i, listeners);
            });
            paginationContainer.appendChild(pageButton);
        }

        
        tableContent.appendChild(paginationContainer);
        listeners();
    }

    set items(items) {
        this.#items = items;
    }

    get items() {
        return this.#items;
    }
}