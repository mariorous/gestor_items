import { Gestor, ItemSimple, ItemVisual, LocalStorage } from "./modules/classes.js";

const gestor = new Gestor();

const btnNewItem = document.querySelector(".btn-new-item");
const createItem = document.getElementById("create-item");
const simpleBtn = document.getElementById("simple-btn");
const visualBtn = document.getElementById("visual-btn");
let itemSlected;

function showAlert(message, type = "success") {
    const alertContainer = document.getElementById("alertContainer");
  
    // Crear una alerta dinámica
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
  
    // Añadir la alerta al contenedor
    alertContainer.appendChild(alert);
  
    // Configurar la desaparición automática después de 3 segundos
    setTimeout(() => {
      alert.classList.remove("show"); // Inicia la animación de desvanecimiento
      setTimeout(() => alert.remove(), 150); // Elimina el elemento después de la animación
    }, 3000);
  }

  function addUpdateListeners() {
    const tableContent = document.querySelector(".table-content");
    tableContent.addEventListener("click", (event) => {
        const btn = event.target.closest(".item-desc");
        if (!btn) return; // Si no se hizo clic en un .item-desc, salir
        const date = new Date();
        const modificationDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        let nameToUpdate = btn.getAttribute("name-item");
        let typeItem = btn.getAttribute("type-item");

        let itemsFromStorage = JSON.parse(localStorage.getItem("items"));
        let itemToUpdate = itemsFromStorage.find(item => item.name === nameToUpdate);

        // Añadir el listener al botón de actualización, eliminando duplicados
        const updateButton = document.getElementById("update-item");

        // Eliminar cualquier listener duplicado previamente registrado
        updateButton.replaceWith(updateButton.cloneNode(true));

        // Reasignar el listener al nuevo botón
        const newUpdateButton = document.getElementById("update-item");

        // Mostrar el formulario correspondiente
        if (typeItem === "simple") {
            document.getElementById("update-item-simple-form").style.display = "block";
            document.getElementById("update-item-visual-form").style.display = "none";

            document.getElementById("update-simple-name").disabled = true;
            document.getElementById("update-simple-name").value = itemToUpdate.name;
            document.getElementById("update-simple-description").value = itemToUpdate.description;
            document.getElementById("update-simple-creationDate").value = itemToUpdate.creationDate;
            document.getElementById("update-simple-modificationDate").value = modificationDate;

            newUpdateButton.addEventListener("click", () => {
                let name = document.getElementById("update-simple-name").value;
                let description = document.getElementById("update-simple-description").value;
                let creationDate = document.getElementById("update-simple-creationDate").value;
                let modificationDate = document.getElementById("update-simple-modificationDate").value;
                itemToUpdate.name = name;
                itemToUpdate.description = description;
                itemToUpdate.creationDate = creationDate;
                itemToUpdate.modificationDate = modificationDate;
                gestor.updateItem(itemToUpdate);
                addDeleteListeners();
                addUpdateListeners();
                $('#updateItem').modal("hide");
                showAlert(`El ítem "${nameToUpdate}" se ha editado correctamente.`, "warning");
            });
        } else if (typeItem === "visual") {
            document.getElementById("update-item-simple-form").style.display = "none";
            document.getElementById("update-item-visual-form").style.display = "block";

            document.getElementById("update-visual-name").disabled = true;
            document.getElementById("update-visual-name").value = itemToUpdate.name;
            document.getElementById("update-visual-description").value = itemToUpdate.description;
            document.getElementById("update-visual-creationDate").value = itemToUpdate.creationDate;
            document.getElementById("update-visual-modificationDate").value = modificationDate;
            document.getElementById("update-visual-imageURL").value = itemToUpdate.imageURL;

            newUpdateButton.addEventListener("click", () => {
                let name = document.getElementById("update-visual-name").value;
                let description = document.getElementById("update-visual-description").value;
                let creationDate = document.getElementById("update-visual-creationDate").value;
                let modificationDate = document.getElementById("update-visual-modificationDate").value;
                let imageURL = document.getElementById("update-visual-imageURL").value;
                itemToUpdate.name = name;
                itemToUpdate.description = description;
                itemToUpdate.creationDate = creationDate;
                itemToUpdate.modificationDate = modificationDate;
                itemToUpdate.imageURL = imageURL;
                gestor.updateItem(itemToUpdate);
                addDeleteListeners();
                addUpdateListeners();
                $('#updateItem').modal("hide");
                showAlert(`El ítem "${nameToUpdate}" se ha editado correctamente.`, "warning");
            });
        } else {
            console.log('Ha habido un error con el tipo de item');
        }
    });
}

function addDeleteListeners() {
    const deleteItemBtn = document.querySelectorAll(".delete-item-btn");
    deleteItemBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
            confirmDeleteBtn.addEventListener("click", () => {
                let nameToDelete = btn.getAttribute("name-item");
                gestor.removeItem(nameToDelete);
                // addDeleteListeners();
                $('#confirmDeleteModal').modal("hide");
                // Mostrar notificación de eliminación
                showAlert(`El ítem "${nameToDelete}" se ha eliminado correctamente.`, "danger");
            });
        });
    });
}

gestor.renderTable();
addDeleteListeners();
addUpdateListeners();

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    console.log(searchInput.value);
    let itemsFromStorage = LocalStorage.getItems();
    itemsFromStorage = itemsFromStorage.filter(item => item.name.toLowerCase().includes(searchInput.value.toLowerCase()));
    gestor.items = itemsFromStorage;
    gestor.renderTable(true);
    addDeleteListeners();
    addUpdateListeners();
})

btnNewItem.addEventListener("click", () => {
    document.getElementById("buttons-selection").style.display = "block";
    document.getElementById("item-simple-form").style.display = "none";
    document.getElementById("item-visual-form").style.display = "none";
    createItem.style.display = "none";
    const date = new Date();
    const today = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    document.getElementById("create-simple-creationDate").value = today;
    document.getElementById("create-simple-modificationDate").value = today;
    document.getElementById("create-visual-creationDate").value = today;
    document.getElementById("create-visual-modificationDate").value = today;
});

simpleBtn.addEventListener("click", () => {
    itemSlected = "simple";
    document.getElementById("buttons-selection").style.display = "none";
    document.getElementById("item-simple-form").style.display = "block";
    document.getElementById("item-visual-form").style.display = "none";
    createItem.style.display = "block";
});

visualBtn.addEventListener("click", () => {
    itemSlected = "visual";
    document.getElementById("buttons-selection").style.display = "none";
    document.getElementById("item-simple-form").style.display = "none";
    document.getElementById("item-visual-form").style.display = "block";
    createItem.style.display = "block";
});

createItem.addEventListener("click", () => {
    let name, description, creationDate, modificationDate, imageURL;

    if (itemSlected === "simple") {
        name = document.getElementById("create-simple-name").value;
        description = document.getElementById("create-simple-description").value;
        creationDate = document.getElementById("create-simple-creationDate").value;
        modificationDate = document.getElementById("create-simple-modificationDate").value;
        const item = new ItemSimple(name, description, creationDate, modificationDate);
        gestor.addItem(item.toJSON());
        $('#createItem').modal("hide");
    } else if (itemSlected === "visual") {
        name = document.getElementById("create-visual-name").value;
        description = document.getElementById("create-visual-description").value;
        creationDate = document.getElementById("create-visual-creationDate").value;
        modificationDate = document.getElementById("create-visual-modificationDate").value;
        imageURL = document.getElementById("create-visual-imageURL").value;
        const item = new ItemVisual(name, description, creationDate, modificationDate, imageURL);
        gestor.addItem(item.toJSON());
        $('#createItem').modal("hide");
    } else {
        console.log('Ha ocurrido un error con la selección del item');
    }
    // Mostrar notificación de creación
    showAlert(`El ítem "${name}" se ha creado correctamente.`, "success");
    addDeleteListeners();
    addUpdateListeners();
    console.log('Inventario del gestor: ', gestor.items);

});

