export async function loadTemplate(path){

    const res = await fetch(path);
    const html = await res.text();

    return new DOMParser()
        .parseFromString(html, "text/html")
        .querySelector("template")
        .content
        .firstElementChild;

}

export async function loadJson(path){
    const res = await fetch(path);
    const jsondata = await res.json();

    return jsondata;
}