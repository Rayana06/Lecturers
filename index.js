import { ProductCardComponent } from "../../components/lecturer-card/lecturer-card.js";
import { ProductPage } from "../lecturers/lecturers.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.products = this.getData();
        this.filteredProducts = [...this.products];
    }

    getData() {
        return [
            { id: 1, name: "Белодедов М.В.", subject: "Электроника", image: "./assets/belodedov.png" },
            { id: 2, name: "Маслеников К.Ю.", subject: "База данных", image: "./assets/maslennicov.png" },
            { id: 3, name: "Канев А.И.", subject: "XML-технологии", image: "./assets/kanev.png" }
        ];
    }

    getHTML() {
        return `
            <div class="header">
                <h2>Список преподавателей</h2>
            </div>

            <div class="controls">
                <input id="search-input" type="text" placeholder="Поиск по имени или предмету">
                <button id="add-btn">Добавить</button>
            </div>

            <div id="main"></div>
        `;
    }

    openCard(id) {
        new ProductPage(this.parent, id).render();
    }

    deleteCard(id) {
        this.products = this.products.filter(item => item.id !== id);
        this.filteredProducts = [...this.products];
        this.renderCards();
    }

    addCard() {
        if (this.products.length === 0) return;

        const firstCard = { ...this.products[0] };
        firstCard.id = Date.now();

        this.products.push(firstCard);
        this.filteredProducts = [...this.products];
        this.renderCards();
    }

    filterCards(value) {
        const search = value.toLowerCase();

        this.filteredProducts = this.products.filter(item =>
            item.name.toLowerCase().includes(search) ||
            item.subject.toLowerCase().includes(search)
        );

        this.renderCards();
    }

    renderCards() {
        const main = document.getElementById("main");
        if (!main) return;

        main.innerHTML = "";

        this.filteredProducts.forEach(item => {
            new ProductCardComponent(main).render(
                item,
                () => this.openCard(item.id),
                () => this.deleteCard(item.id)
            );
        });
    }

    addEventListeners() {
        const addBtn = document.getElementById("add-btn");
        const searchInput = document.getElementById("search-input");
        const homeBtn = document.querySelector(".home-btn");

        if (addBtn) {
            addBtn.addEventListener("click", () => this.addCard());
        }

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                this.filterCards(e.target.value);
            });
        }

        if (homeBtn) {
            homeBtn.addEventListener("click", () => this.render());
        }
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.renderCards();
        this.addEventListeners();
    }
}