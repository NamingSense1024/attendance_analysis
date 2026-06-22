import { GetMember, GetDangerMembers } from "./api.js";
import { loadTemplate } from "./loader.js";

document.addEventListener("DOMContentLoaded",() => {
    //PageJump();
    //Test();
    
    DangerList();
});


let card_template = null;
let container = null;

async function DangerList(){
    card_template = await loadTemplate("components/member_card.html");
    container = document.getElementById("card-container");

    // CreateCard({
    //     name:"山田 太郎",
    //     grade:"1",
    //     score:"10",
    //     id:"null"
    // })

    const list = await GetDangerMembers();

    list.forEach(item => {
        CreateCard(item);
    })

    HideSkeleton();
}

function CreateCard(item){
    const element = card_template.cloneNode(true);
    
    element.querySelector("#grade").textContent = item.grade;

    item.grade = Number(item.grade);
    const grade_chip = element.querySelector("#grade-chip");

    const grade_colors = {
        1:"bg-yellow-200",
        2:"bg-green-200",
        3:"bg-red-200",
        4:"bg-blue-200",
        others:"bg-gray-200"
    }

    let bg_color = null;
    if(item.grade <= 4) bg_color = grade_colors[item.grade];
    else bg_color = grade_colors.others;

    grade_chip.classList.add(bg_color);

    element.querySelector("#name").textContent = item.name;
    
    element.querySelector("#score").textContent = item.score;

    element.addEventListener("click", () => {
        window.location.href = `member.html?id=${item.id}`;
    })

    container.appendChild(element);
}

function HideSkeleton(){
    const skeletons = document.querySelectorAll(".skeleton");
    skeletons.forEach(el => {
        el.classList.add("hidden");
    });
}