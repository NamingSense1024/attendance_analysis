import { loadJson } from "./loader.js";

const GAS_URL = "https://script.google.com/macros/s/AKfycbwie7lRj35KWwRss1ZPKhzh7n7sx4F7lKH5RA380Bohc6XwrQ0SNQSnvxqMZE8g5I5cEg/exec";

export async function GetMember(member_id) {
    const member_data = await loadJson(`${GAS_URL}?action=getMember&id=${member_id}`);

    return member_data;
}

export async function GetDangerMembers() {
    const list = await loadJson(`${GAS_URL}?action=getDangerMembers`);
    
    return list;
}