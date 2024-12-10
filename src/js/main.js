import { Gestor, ItemSimple, ItemVisual } from "./modules/classes.js";

const gestor = new Gestor();

const btnNewProduct = document.querySelector(".btn-new-product");
const tableContent = document.querySelector(".table-content");
const createItem = document.getElementById("create-item");
const simpleBtn = document.getElementById("simple-btn");
const visualBtn = document.getElementById("visual-btn");

btnNewProduct.addEventListener("click", () => {
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
    document.getElementById("buttons-selection").style.display = "none";
    document.getElementById("item-simple-form").style.display = "block";
    document.getElementById("item-visual-form").style.display = "none";
    createItem.style.display = "block";
});

visualBtn.addEventListener("click", () => {
    document.getElementById("buttons-selection").style.display = "none";
    document.getElementById("item-simple-form").style.display = "none";
    document.getElementById("item-visual-form").style.display = "block";
    createItem.style.display = "block";
});

createItem.addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let creationDate = document.getElementById("creationDate").value;
    let modificationDate = document.getElementById("modificationDate").value;
    let imageURL = document.getElementById("imageURL").value;
    
});

