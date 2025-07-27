const hrHand = document.querySelector(".hour-hand");
const mnHand = document.querySelector(".minute-hand");
const seHand = document.querySelector(".second-hand");
const date = document.querySelector(".date");
const day = document.querySelector(".day");
const session = document.querySelector(".session");
const numberCycle = document.querySelector(".numberCycle");

window.addEventListener("load", () => {
    for (let i = 1; i <= 60; i++) {
        let span = document.createElement("span");
        if (i % 5) {
            span.setAttribute("class", "interval");
        } else {
            span.innerHTML = i / 5;
        }
        span.style.transform = "rotate( " + i * 6 + "deg)";
        numberCycle.appendChild(span);
    }
    showTime();
});

let weekday = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

function showTime() {
    let currentDate = new Date();
    date.textContent = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    day.textContent = weekday[currentDate.getDay()];

    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let sessions = hours >= 12 ? "PM" : "AM";

    if (hours == 0) hours = 12;
    if (hours > 12) hours = hours - 12;

    session.textContent = sessions;

    let hDeg = hours * 30 + minutes * 0.5;
    let mDeg = minutes * 6 + seconds * 0.1;
    let sDeg = seconds * 6;

    hrHand.style.transform = "rotate(" + hDeg + "deg)";
    mnHand.style.transform = "rotate(" + mDeg + "deg)";
    seHand.style.transform = "rotate(" + sDeg + "deg)";

    setTimeout(showTime, 1000);
}