import { Gestor, ItemSimple, ItemVisual, LocalStorage } from "./modules/classes.js";

const gestor = new Gestor();

const btnNewItem = document.querySelector(".btn-new-item");
const createItem = document.getElementById("create-item");
const simpleBtn = document.getElementById("simple-btn");
const visualBtn = document.getElementById("visual-btn");
let itemSelected;

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
    let nameToDelete = null; // Variable para almacenar el nombre del ítem a eliminar
    console.log(deleteItemBtn);

    deleteItemBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            // Guardar el nombre del ítem que se quiere eliminar
            nameToDelete = btn.getAttribute("name-item");
            console.log(nameToDelete);
        });
    });

    // Registrar el listener del botón de confirmación UNA SOLA VEZ
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    confirmDeleteBtn.replaceWith(confirmDeleteBtn.cloneNode(true)); // Eliminar listeners previos
    const newConfirmDeleteBtn = document.getElementById("confirmDeleteBtn");

    newConfirmDeleteBtn.addEventListener("click", () => {
        if (nameToDelete) { // Asegurarse de que hay un ítem para eliminar
            console.log('🦆 Nombre confirmado para eliminar: ', nameToDelete);
            gestor.removeItem(nameToDelete);

            // Ocultar el modal de confirmación
            $('#confirmDeleteModal').modal("hide");

            // Actualizar la tabla y volver a registrar los listeners
            gestor.renderTable(false, 1, () => { addDeleteListeners(); addUpdateListeners(); });

            // Mostrar notificación de eliminación
            showAlert(`El ítem "${nameToDelete}" se ha eliminado correctamente.`, "danger");

            // Limpiar la variable
            nameToDelete = null;
        }
    });
}

gestor.renderTable(false, 1, () => { addDeleteListeners(); addUpdateListeners(); });


const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    let itemsFromStorage = LocalStorage.getItems();
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
        // Si el input está vacío, mostrar todos los ítems
        gestor.items = itemsFromStorage;
    } else {
        const regexExact = new RegExp(`^${searchTerm}$`, "i"); // Palabra exacta
        const regexStartsWith = new RegExp(`^${searchTerm}`, "i"); // Empieza por
        const regexContains = new RegExp(`${searchTerm}`, "i"); // Contiene

        itemsFromStorage = itemsFromStorage.filter(item => {
            const name = item.name.toLowerCase();
            return regexExact.test(name) || regexStartsWith.test(name) || regexContains.test(name);
        });

        // Ordenar según la prioridad: exacto > empieza > contiene
        itemsFromStorage.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (regexExact.test(nameA) && !regexExact.test(nameB)) return -1;
            if (!regexExact.test(nameA) && regexExact.test(nameB)) return 1;
            if (regexStartsWith.test(nameA) && !regexStartsWith.test(nameB)) return -1;
            if (!regexStartsWith.test(nameA) && regexStartsWith.test(nameB)) return 1;

            return 0;
        });
    }

    // Actualizar los elementos del gestor y volver a renderizar
    gestor.items = itemsFromStorage;
    gestor.renderTable(true, 1, () => { addDeleteListeners(); addUpdateListeners(); });
});

// Limpiar los inputs de los formularios
function clearInputs(itemType) {
    if (itemType === "simple") {
        document.getElementById("create-simple-name").value = "";
        document.getElementById("create-simple-description").value = "";
    } else if (itemType === "visual") {
        document.getElementById("create-visual-name").value = "";
        document.getElementById("create-visual-description").value = "";
        document.getElementById("create-visual-imageURL").value = "";
    }
}

// Muestra menú de elección al hacer clic en "Nuevo ítem"
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

// Muestra el formulario correspondiente al tipo de ítem seleccionado
simpleBtn.addEventListener("click", () => {
    itemSelected = "simple";
    clearInputs(itemSelected);
    document.getElementById("buttons-selection").style.display = "none";
    document.getElementById("item-simple-form").style.display = "block";
    document.getElementById("item-visual-form").style.display = "none";
    createItem.style.display = "block";
});

// Muestra el formulario correspondiente al tipo de ítem seleccionado
visualBtn.addEventListener("click", () => {
    itemSelected = "visual";
    clearInputs(itemSelected);
    document.getElementById("buttons-selection").style.display = "none";
    document.getElementById("item-simple-form").style.display = "none";
    document.getElementById("item-visual-form").style.display = "block";
    createItem.style.display = "block";
});

createItem.addEventListener("click", () => {
    let name, description, creationDate, modificationDate, imageURL;
    let duplicatedItem = false;
    
    if (itemSelected === "simple") {
        name = document.getElementById("create-simple-name").value;
        description = document.getElementById("create-simple-description").value;
        creationDate = document.getElementById("create-simple-creationDate").value;
        modificationDate = document.getElementById("create-simple-modificationDate").value;
        const item = new ItemSimple(name, description, creationDate, modificationDate);
        duplicatedItem = gestor.addItem(item.toJSON());
        addDeleteListeners();
        addUpdateListeners();
        $('#createItem').modal("hide");
    } else if (itemSelected === "visual") {
        name = document.getElementById("create-visual-name").value;
        description = document.getElementById("create-visual-description").value;
        creationDate = document.getElementById("create-visual-creationDate").value;
        modificationDate = document.getElementById("create-visual-modificationDate").value;
        imageURL = document.getElementById("create-visual-imageURL").value;
        const item = new ItemVisual(name, description, creationDate, modificationDate, imageURL);
        duplicatedItem = gestor.addItem(item.toJSON());
        addDeleteListeners();
        addUpdateListeners();
        $('#createItem').modal("hide");
    } else {
        console.log('Ha ocurrido un error con la selección del item');
    }
    if (duplicatedItem) {
        showAlert(`El ítem "${name}" ya existe en el inventario.`, "danger");
    } else {
        // Mostrar notificación de creación
        showAlert(`El ítem "${name}" se ha creado correctamente.`, "success");
        console.log('Inventario del gestor: ', gestor.items);
    }

});

