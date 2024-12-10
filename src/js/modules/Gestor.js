export class Gestor {
    #products

    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    updateProduct(product) {
        this.products.forEach((p, index) => {
            if (p.id === product.id) {
                this.products[index] = product;
            }
        });
    }

    removeProduct(product) {
        this.products.splice(this.products.indexOf(product), 1);
    }

    renderTable() {
        this.products.forEach(product => {
            let itemInfo = `
                <div class="container">
                    <div class="image-url">
                        <img src="${product.imageURL}" alt="">
                    </div>
                    <div class="product-desc">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </div>
                    <div class="creation-date">
                        <p>${product.creationDate}</p>
                    </div>
                    <div class="modification-date">
                        <p>${product.modificationDate}</p>
                    </div>
                    <div class="button">
                        <button>Editar</button>
                    </div>
                </div>
            `;
        });
    }

    set products(products) {
        this.#products = products;
    }

    get products() {
        return this.#products;
    }
}