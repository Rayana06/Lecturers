export class ScheduleComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getLessonTypeClass(type) {
        if (type === "Лекция") return "lesson-type lecture";
        if (type === "Семинар") return "lesson-type seminar";
        if (type === "Лабораторная работа") return "lesson-type lab";
        return "lesson-type";
    }

    renderDays(lessons) {
        const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

        return days.map(day => `
            <div class="day-block">
                <h5 class="day-title">${day}</h5>
                ${lessons
                    .filter(l => l.day === day)
                    .map(l => `
                        <div class="lesson">
                            <div class="lesson-time">${l.time}</div>
                            <div class="lesson-group">${l.group}</div>
                            <div class="lesson-room">Ауд: ${l.room}</div>
                            <div class="${this.getLessonTypeClass(l.type)}">${l.type}</div>
                        </div>
                    `).join("")}
            </div>
        `).join("");
    }

    render(data) {
        this.parent.innerHTML = `
            <h3>Расписание преподавателя: ${data.name}</h3>
            ${this.renderDays(data.lessons)}
        `;
    }
}