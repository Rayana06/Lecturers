import { ScheduleComponent } from "../../components/schedule/schedule.js";
import { LecturersPage } from "../lecturers/lecturers.js";

export class LecturerPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = Number(id);
    }

    getData() {
        const lecturers = [
            {
                id: 1,
                name: "Иван Иванович Иванов",
                lessons: [
                    { day: "ПН", time: "11:50 – 13:20", type: "Лабораторная работа", room: "541к", group: "ИУ5-45Б" },
                    { day: "ПН", time: "14:05 – 15:35", type: "Лекция", room: "314х", group: "ИУ5-41Б, ИУ5-42Б, ИУ5-43Б" },
                    { day: "ПН", time: "15:55 – 17:25", type: "Семинар", room: "213х", group: "ИУ5-42Б, ИУ5И-47Б" },
                    { day: "ПН", time: "17:35 – 19:05", type: "Семинар", room: "213х", group: "ИУ5-45Б" },
                    { day: "ВТ", time: "10:45 – 12:20", type: "Лекция", room: "500", group: "РТ5-41Б" },
                    { day: "ВТ", time: "13:05 – 14:40", type: "Лабораторная работа", room: "500", group: "РТ5-41Б" },
                    { day: "СР", time: "12:25 — 13:55", type: "Лабораторная работа", room: "403", group: "ИУ5Ц-61Б, ИУ5Ц-63Б, ИУ5Ц-64Б" },
                    { day: "СР", time: "14:05 — 15:35", type: "Лабораторная работа", room: "403", group: "ИУ5Ц-61Б, ИУ5Ц-63Б, ИУ5Ц-64Б" },
                    { day: "СР", time: "14:05 — 15:35", type: "Лабораторная работа", room: "305", group: "ИУ5-43Б" },
                    { day: "ЧТ", time: "10:10 — 11:40", type: "Лабораторная работа", room: "403", group: "ИУ5-41Б, ИУ5И-41Б, ИУ5И-47Б" },
                    { day: "ЧТ", time: "11:50 – 13:20", type: "Лабораторная работа", room: "401к", group: "ИУ5-41Б, ИУ5И-41Б" },
                    { day: "ЧТ", time: "14:05 — 15:35", type: "Лабораторная работа", room: "401к", group: "ИУ5-44Б, ИУ5И-47Б" },
                    { day: "ЧТ", time: "15:55 — 17:25", type: "Лабораторная работа", room: "401к", group: "ИУ5-44Б, ИУ5И-47Б" },
                ]
            },
            {
                id: 2,
                name: "Владимир Викторович Бондарь",
                lessons: [
                    { day: "ПТ", time: "15:55–17:25", type: "Лекция", room: "213", group: "ИУ5-46Б" },
                    { day: "ПТ", time: "17:35–19:05", type: "Лабораторная работа", room: "213", group: "ИУ5-46Б" },
                    { day: "СБ", time: "10:10–11:40", type: "Лабораторная работа", room: "512", group: "ИУ5-41Б, ИУ5И-41Б" },
                    { day: "СБ", time: "11:50–13:20", type: "Лабораторная работа", room: "512", group: "ИУ5-41Б, ИУ5И-41Б" },
                    { day: "СБ", time: "14:50–16:25", type: "Лекция", room: "403", group: "РТ5-41Б" },
                    { day: "СБ", time: "16:25–18:10", type: "Лабораторная работа", room: "403", group: "РТ5-41Б" }
                ]
            },
            {
                id: 3,
                name: "Александр Иванович Смирнов",
                lessons: [
                    { day: "СР", time: "11:50–13:20", type: "Лекция", room: "905", group: "РТ5-41Б" },
                    { day: "СР", time: "14:05–15:35", type: "Лабораторная работа", room: "903", group: "РТ5-41Б" },
                    { day: "СР", time: "15:55–17:25", type: "Лекция", room: "905", group: "ИУ5-65Б" },
                    { day: "СР", time: "17:35–19:05", type: "Лабораторная работа", room: "903", group: "ИУ5-65Б" },
                    { day: "ЧТ", time: "8:30–10:00", type: "Лабораторная работа", room: "903", group: "ИУ5-41Б, ИУ5И-41Б, ИУ5И-47Б" },
                    { day: "ЧТ", time: "12:25–13:55", type: "Лекция", room: "905", group: "ИУ5-21Б, ИУ5И-21Б, ИУ5Ц-21М" },
                    { day: "ЧТ", time: "14:05–15:35", type: "Лабораторная работа", room: "903", group: "ИУ5-21Б, ИУ5И-21Б, ИУ5Ц-21М" },
                    { day: "ЧТ", time: "15:55–17:25", type: "Лабораторная работа", room: "903", group: "ИУ5-21Б, ИУ5И-21Б, ИУ5Ц-21М" },
                    { day: "ПТ", time: "14:05–15:35", type: "Лекция", room: "905", group: "ИУ5-41Б, ИУ5И-41Б, ИУ5И-47Б" }
                ]
            }
        ];

        return lecturers.find(lecturer => lecturer.id === this.id) || lecturers[0];
    }

   render() {
    this.parent.innerHTML = `
        <div class="header detail-page-header">
            <div class="header-left">
        <button class="home-btn">Домой</button>
        <h2>Расписание преподавателя</h2>
        </div>
    <button class="model-btn">3D модель</button>
</div>
        <div id="lecturer-page-content"></div>
    `;

    document.querySelector(".home-btn").addEventListener("click", () => {
        new LecturersPage(this.parent).render();
    });

    document.querySelector(".model-btn").addEventListener("click", () => {
        location.href = "project-root/detail.html?id=teacher-model&type=default";
    });

    const container = document.getElementById("lecturer-page-content");
    new ScheduleComponent(container).render(this.getData());
    }
}