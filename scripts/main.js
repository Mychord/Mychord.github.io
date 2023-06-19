const panels = document.querySelectorAll(".panel");

panels.forEach(panel => {
  panel.addEventListener("click", () => {
    removeActiveClasses();
    panel.classList.add("active");
  })
});

function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove("active");
  })
}

function randomSelect(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const audioHrefs = ["audios/recreate.mp3", "audios/Scarborough Fair.mp3", "audios/starfall.mp3"];
const audioName = document.querySelector("#audioName");
const audioSrc = document.querySelector("#audioSrc");
const audioHref = document.querySelector("#audioHref");

const randomAudio = randomSelect(audioHrefs);
audioName.innerHTML = randomAudio.split("/")[1];
audioSrc.setAttribute("src", randomAudio);
audioHref.setAttribute("href", randomAudio);
