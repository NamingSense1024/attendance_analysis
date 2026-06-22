import { GetMember } from "./api.js";
import { loadTemplate } from "./loader.js";

document.addEventListener("DOMContentLoaded",() => {
    SwitchSkeleton(false);
    UI();
    Accordion();
});

let data = null;
async function UI() {
    const params = new URLSearchParams(window.location.search);

    const member_id = params.get("id");

    data = await GetMember(member_id);

    document.getElementById("name").textContent = data.name;
    document.getElementById("grade").textContent = data.grade;

    document.getElementById("attendance-rate").textContent = data.attendanceRate;
    document.getElementById("change-rate").textContent = data.changeRate;

    document.getElementById("attendance-count").textContent = data.attendanceCount;
    document.getElementById("last-three").textContent = data.lastThree;
    document.getElementById("absence-consecutive").textContent = data.absenceConsecutive;
    document.getElementById("last-attendance").textContent = data.lastAttendance;
    document.getElementById("count-from-last").textContent = data.countFromLast;

    document.getElementById("total-score").textContent = data.scores.totalScore;

    document.getElementById("plus-long-term").textContent = data.scores.plusLongTerm;
    document.getElementById("plus-last-three").textContent = data.scores.plusLastThree;
    document.getElementById("plus-absence-consecutive").textContent = data.scores.plusAbsenceConsecutive;
    document.getElementById("plus-change-rate").textContent = data.scores.plusChangeRate;
    
    document.getElementById("minus-long-term").textContent = data.scores.minusLongTerm;
    document.getElementById("minus-last-three").textContent = data.scores.minusLastThree;
    document.getElementById("minus-change-rate").textContent = data.scores.minusChangeRate;

    document.getElementById("offset-grade").textContent = data.scores.offsetGrade;

    Attendance();

    SwitchSkeleton(true);
}

async function Attendance(){
    const attendance = data.attendance;

    const card_template = await loadTemplate("components/date_card.html");
    const container = document.getElementById("date-card-container");
    
    attendance.forEach(item => {
        const element = card_template.cloneNode(true);

        element.querySelector("#date").textContent = item.date;

        if(item.flag == "") item.flag = "✕";
        element.querySelector("#flag").textContent = item.flag;

        container.appendChild(element);
    });
}

function Accordion(){
    const buttons = document.querySelectorAll(".ac-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector(".icon");

            // すでに開いているかどうか
            const isOpen = content.classList.contains("ac-open");

            // すべて閉じる（排他制御）
            document.querySelectorAll(".ac-content").forEach(item => {
                item.classList.remove("ac-open");
                
                buttons.forEach(btn => {
                    const other_icon =  btn.querySelector(".icon");
                    other_icon.classList.remove("open");
                });
            });

            // クリックしたものだけ開く（トグル）
            if (!isOpen) {
                content.classList.add("ac-open");
                icon.classList.add("open");
            }
        });
    });
}

function SwitchSkeleton(isContentVisible){
    const skeletons = document.querySelectorAll(".skeleton");
    skeletons.forEach(el => {
        el.classList.toggle("hidden",isContentVisible);
    });

    const contents = document.querySelectorAll(".content");
    contents.forEach(el => {
        el.classList.toggle("hidden",!isContentVisible);
    });
}