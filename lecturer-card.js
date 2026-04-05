export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
    return `
        <div class="card-item">
            <div class="card-top">
                <img class="teacher-photo" src="${data.image}" alt="${data.name}">
                
                <div class="card-info">
                    <h3>${data.name}</h3>
                    <p>${data.subject}</p>
                </div>
            </div>

            <div class="card-buttons">
                <button class="open-btn">Открыть</button>
                <button class="delete-btn">Удалить</button>
            </div>
        </div>
    `;
}

    render(data, onOpen, onDelete) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = this.getHTML(data);

        const element = wrapper.firstElementChild;
        this.parent.appendChild(element);

        element.querySelector(".open-btn").addEventListener("click", onOpen);
        element.querySelector(".delete-btn").addEventListener("click", onDelete);
    }
}