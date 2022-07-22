const backBtn = document.getElementById("back-btn");
backBtn.onclick = function () {
  history.back();
};

const intersector = document.querySelector(".reward-amount");
const headerEl = document.querySelector("#header");
const handler = (entries) => {
  if (!entries[0].isIntersecting) {
    headerEl.classList.add("enabled");
  } else {
    headerEl.classList.remove("enabled");
  }
};

const observer = new window.IntersectionObserver(handler, {
  rootMargin: "-50px 0px 0px 0px",
  threshold: 1,
});
observer.observe(intersector);

const receiveBtn = document.querySelector("#received");
const receivedOverlay = document.querySelector(".received-overlay");
receiveBtn.addEventListener(
  "click",
  function () {
    receivedOverlay.classList.add("overlay-pop-up");
    this.classList.add("received");
    this.innerText = "Completed";
  },
  { once: true }
);

receivedOverlay.onclick = function (e) {
  if (e.target.id == "continue-btn") {
    receivedOverlay.classList.remove("overlay-pop-up");
    return;
  }

  if (
    e.target.classList.contains("popup-dialog") ||
    e.target.parentElement.classList.contains("popup-dialog") ||
    e.target.parentElement.parentElement.classList.contains("popup-dialog")
  )
    return;

  receivedOverlay.classList.remove("overlay-pop-up");
};

let tomorrowPopped = false;
const starIcons = document.querySelectorAll("[data-day]");
const starIconsArr = [...starIcons];

starIconsArr.forEach((icon, i) => {
  const localStorageKey = "video-watched-" + Number(i + 1);
  if (localStorage.getItem(localStorageKey)) {
    icon.classList.add("coin-collected");
  }

  if (icon.dataset.day == new Date().getDay()) {
    icon.addEventListener("click", function () {
      window.location.assign("./video.html");
    });
  } else if (icon.dataset.day > new Date().getDay()) {
    icon.addEventListener("click", function () {
      tomorrowPopped = true;
      document
        .querySelector(".tomorrow-popup")
        .classList.add("show-tomorrow-popup");
    });
  }
});

document.querySelector(".tomorrow-popup").onclick = function (e) {
  this.classList.remove("show-tomorrow-popup");
};


