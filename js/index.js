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

    const list = await GetDangerMembers();

    list.forEach(item => {
        CreateCard(item);
    })
}

function CreateCard(item){
    const element = card_template.cloneNode(true);

    element.querySelector("#name").textContent = item.name;
    element.querySelector("#grade").textContent = item.grade;
    element.querySelector("#score").textContent = item.score;

    element.addEventListener("click", () => {
        window.location.href = `member.html?id=${item.id}`;
    })

    container.appendChild(element);
}