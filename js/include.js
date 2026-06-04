document.addEventListener("DOMContentLoaded",async () => {
  await loadHTML("header", "components/header.html");

  //HideLoading();
});

function loadHTML(id, url,callback) {
  return fetch(url)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;

      if (callback) callback();
    });
}

function HideLoading(){
  const overlay = document.getElementById("loading");
  overlay.classList.add("opacity-0")
}