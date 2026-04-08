import { LecturerCardComponent } from "../../components/lecturer-card/lecturer-card.js";
import { LecturerPage } from "../main/index.js";

import {
    isEqualLecturerObj,
    fillLessonArray,
    countGroupPrefixes,
    isLecturerTextPalindrome,
    isLecturerTextPalindromeByLoop,
    findLessonAfterNoon
} from "../../utils/lecturer-utils.js";

export class LecturersPage {
    constructor(parent) {
        this.parent = parent;
        this.lecturers = this.getData();
        this.filteredLecturers = [...this.lecturers];
    }

    getData() {
        return [
            {
                id: 1,
                name: "Белодедов М.В.",
                subject: "Электроника",
                image: "assets/belodedov.png"
            },
            {
                id: 2,
                name: "Маслеников К.Ю.",
                subject: "База данных",
                image: "assets/maslennicov.png"
            },
            {
                id: 3,
                name: "Канев А.И.",
                subject: "XML-технологии",
                image: "assets/kanev.png"
            }
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

            <div id="homework-results" class="results-block"></div>
        `;
}

    openCard(id) {
        new LecturerPage(this.parent, id).render();
    }

    deleteCard(id) {
        this.lecturers = this.lecturers.filter(item => item.id !== id);
        this.filteredLecturers = [...this.lecturers];
        this.renderCards();
    }

    addCard() {
        if (this.lecturers.length === 0) return;

        const firstLecturer = { ...this.lecturers[0] };
        firstLecturer.id = Date.now();

        this.lecturers.push(firstLecturer);
        this.filteredLecturers = [...this.lecturers];
        this.renderCards();
    }

    filterCards(value) {
        const searchValue = value.toLowerCase();

        this.filteredLecturers = this.lecturers.filter(item =>
            item.name.toLowerCase().includes(searchValue) ||
            item.subject.toLowerCase().includes(searchValue)
        );

        this.renderCards();
    }

    renderCards() {
        const main = document.getElementById("main");
        main.innerHTML = "";

        this.filteredLecturers.forEach(item => {
            new LecturerCardComponent(main).render(
                item,
                () => this.openCard(item.id),
                () => this.deleteCard(item.id)
            );
        });
    }

    addEventListeners() {
        document.getElementById("add-btn").addEventListener("click", () => {
            this.addCard();
        });

        document.getElementById("search-input").addEventListener("input", (event) => {
            this.filterCards(event.target.value);
        });
    }

    runHomeworkTasks() {
    const resultsBlock = document.getElementById("homework-results");

    // 1.7
    const lecturer1 = {
        name: "Белодедов М.В.",
        subject: "Электроника"
    };

    const lecturer2 = {
        name: "Белодедов М.В.",
        subject: "Электроника"
    };

    const result1 = isEqualLecturerObj(lecturer1, lecturer2);

    // 1.9
    const lesson = {
        day: "ПТ",
        time: "15:00",
        subject: "Консультация",
        room: "207"
    };

    const result2 = fillLessonArray(3, lesson);

    // 2.10
    const result3 = countGroupPrefixes(["и", "ию", "ию5", "рт"], "ию5-41б");

    // 3.8
    const result4 = isLecturerTextPalindrome("А роза упала на лапу Азора");
    const result5 = isLecturerTextPalindromeByLoop(121);

    // цикл
    const lessons = [
        { time: "09:00" },
        { time: "12:30" },
        { time: "14:10" }
    ];

    const result6 = findLessonAfterNoon(lessons);

    // ВЫВОД НА СТРАНИЦУ
    resultsBlock.innerHTML = `
        <h3>Результаты заданий</h3>

        <p><b>1.7 Сравнение объектов:</b> ${result1}</p>

        <p><b>1.9 Заполнение массива:</b> ${JSON.stringify(result2)}</p>

        <p><b>2.10 Префиксы:</b> ${result3}</p>

        <p><b>3.8 Палиндром (1):</b> ${result4}</p>

        <p><b>3.8 Палиндром (2):</b> ${result5}</p>

        <p><b>Занятие после 12:00:</b> ${result6 ? result6.time : "нет"}</p>
    `;
}

    render() {
        this.parent.innerHTML = this.getHTML();
        this.renderCards();
        this.addEventListeners();
        this.runHomeworkTasks();
    }
}
