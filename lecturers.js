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
                name: "Иванов И.И.",
                subject: "Микроэкономика",
                image: "assets/belodedov.png"
            },
            {
                id: 2,
                name: "Бондарь В.В",
                subject: "Экономическая география",
                image: "assets/maslennicov.png"
            },
            {
                id: 3,
                name: "Смирнов А.И.",
                subject: "Математический анализ",
                image: "assets/kanev.png"
            }
        ];
    }

    getHTML() {
        return `
            <div class="header">
                <button class="home-btn">Домой</button>
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
            () => {
                location.href = "project-root/detail.html?id=teacher-model&type=default";
            },
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
        document.querySelector(".home-btn").addEventListener("click", () => {
            this.render();
        });
    }
    runHomeworkTasks() {
    const resultsBlock = document.getElementById("homework-results");
    
    // 1.7
    const lecturer1 = {
        name: "Иванов И.И.",
        subject: "Микроэкономика"
    };

    const lecturer2 = {
        name: "Иванов И.И.",
        subject: "Микроэкономика"
    };

    const result1 = isEqualLecturerObj(lecturer1, lecturer2);
    console.log("1.7 Сравниваем:", lecturer1, lecturer2);
    console.log("Результат:", result1);
    // 1.9
    const lesson = {
        day: "ПТ",
        time: "15:00",
        subject: "Консультация",
        room: "207"
    };

    const result2 = fillLessonArray(3, lesson);
    console.log("1.9 Заполнение массива:", result2);

    // 2.10
    const result3 = countGroupPrefixes(["и", "иу", "иу5", "рт"], "иу5-41б");
    console.log("2.10 Проверяем строку: 'иу5-41б' ", )
    console.log("Префиксы:", result3);

    // 3.8
    const result4 = isLecturerTextPalindrome("А роза упала на лапу Азора");
    console.log("3.8 Палиндром (1): А роза упала на лапу Азора");
    console.log("Палиндром (1):", result4);

    const result5 = isLecturerTextPalindromeByLoop(121);
    console.log("3.8 Палиндром (2): 121");
    console.log("3.8 Палиндром (2):", result5);

    // цикл
    const lessons = [
        { time: "09:00" },
        { time: "12:30" },
        { time: "14:10" }
    ];

    const result6 = findLessonAfterNoon(lessons);
    console.log("Занятие после 12:00:", result6);

    // ВЫВОД НА СТРАНИЦУ (красиво)
    resultsBlock.innerHTML = `
    <h3 class="results-title">Результаты домашних заданий</h3>

    <div class="results-row">
        <div class="result-card">
            <span class="task-number">1.7</span>
            <h4>Сравнение объектов</h4>
            <p>Были сравнены два объекта преподавателя. Все поля совпадают.</p>
            <p><b>Результат:</b> ${result1}</p>
        </div>
        <div class="result-card">
            <span class="task-number">2.10</span>
            <h4>Проверка префиксов строки.</h4>
            <p>Для строки «иу5-41б» найдено 3 префикса: «и», «иу», «иу5».</p>
            <p><b>Результат:</b> ${result3}</p>
        </div>
        <div class="result-card">
            <span class="task-number">3.8</span>
            <h4>Проверка строки на палиндром.</h4>
            <p>А роза упала на лапу Азора</p>
            <p><b>Результат:</b> ${result4}</p>
        </div>
    </div>

    <div class="results-row">
        <div class="result-card">
            <span class="task-number">1.9</span>
            <h4>Заполнение массива</h4>
            <p>Создан массив из 3 элементов.</p>
            <p><b>Результат:</b> ${result2.map(l => l.subject).join(", ")}</p>
        </div>

        <div class="result-card">
            <span class="task-number">do...while</span>
            <h4>Поиск занятия после 12:00.</h4>
            <p><b>Результат:</b> ${result6 ? result6.time : "нет"}</p>
        </div>
        <div class="result-card">
            <span class="task-number">3.8</span>
            <h4>Проверка числа на палиндром.</h4>
            <p>121</p>
            <p><b>Результат:</b> ${result5}</p>
        </div>
    </div>
`;
}

    render() {
        this.parent.innerHTML = this.getHTML();
        this.renderCards();
        this.addEventListeners();
        this.runHomeworkTasks();
    }
}
