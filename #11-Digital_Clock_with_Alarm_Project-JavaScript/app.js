const DigitalClock = document.getElementById("DigitalClock");
const DigitalDate = document.getElementById("DigitalDate");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const session = document.getElementById("session");
const alarmName = document.getElementById("alarmName");
const setAlarmTime = document.getElementById("setAlarmTime");
const alarmInterval = document.getElementById("alarmInterval");
const setAlarm = document.getElementById("setAlarm");
const alarmRow = document.getElementById("alarmRow");

let alarmTime = "";
let alarmClearInterval = "";
let alarmTone = new Audio("/Peaky-Blinders.mp3");
let alarmPlayPause = false;

window.addEventListener("load", () => {
    showTime();

    for (h = 1; h <= 12; h++) {
        let option = document.createElement("option");
        option.text = zeroPad(h);
        option.value = zeroPad(h);
        hours.appendChild(option);
    }

    for (m = 0; m < 60; m++) {
        let option = document.createElement("option");
        option.text = zeroPad(m);
        option.value = zeroPad(m);
        minutes.appendChild(option);
    }
})

function showTime() {
    const currentDateTime = new Date();
    DigitalDate.innerHTML = `${currentDateTime.toLocaleString("default", { weekday: "long" })} ${currentDateTime.toLocaleString("default", { month: "long" })}, ${currentDateTime.getDate()} - ${currentDateTime.getFullYear()}`;

    let h = currentDateTime.getHours();
    let m = currentDateTime.getMinutes();
    let s = currentDateTime.getSeconds();
    let ses = h > 12 ? "PM" : "AM";

    if (h == 0) { h = 12 };
    if (h > 12) { h = h - 12 };

    let time = zeroPad(h) + ":" + zeroPad(m) + ":" + zeroPad(s) + " " + ses;
    DigitalClock.innerHTML = time;

    if (alarmTime == time) {
        alarmInterval.innerText = "";
        clearTimeout(alarmInterval);
        alarmTone.play();
        alarmTone.loop = true;
        alarmName.value = "";
        setAlarmTime.innerText = "";
    }
    setInterval(showTime, 1000);
}

setAlarm.addEventListener("click", () => {
    if (setAlarm.innerText == "Set Alarm") {
        if (alarmName.value !== "") {
            alarmTime = hours.value + ":" + minutes.value + ":00 " + session.value;
            getTimeDifference();

            setAlarm.innerText = "Stop Alarm";
            alarmRow.setAttribute("style", "display: none");
            setAlarm.setAttribute("style", "background: #EF6262");

            let h5 = document.createElement("h5");
            h5.innerText = alarmName.value + "- Alarm";
            setAlarmTime.append(h5);

            let p = document.createElement("p");
            p.innerText = hours.value + ":" + minutes.value + ":" + session.value;
            setAlarmTime.appendChild(p);
        } else {
            alarmName.focus();
            alarmName.setAttribute("style", "border-bottom: 2px solid #EF6262")
        }
    } else {
        setAlarm.innerText = "Set Alarm";
        alarmRow.setAttribute("style", "display: block");
        setAlarm.setAttribute("style", "background: black");
        setAlarmTime.innerText = "";
        alarmName.value = "";
        alarmInterval.innerText = "";

        clearTimeout(alarmClearInterval);
        alarmTone.pause();
    }
});

function getTimeDifference() {
    let today = new Date();
    let date = zeroPad(today.getDate());
    let month = zeroPad(today.getMonth());
    let year = today.getFullYear();
    today = month + "/" + date + "/" + year;

    let alarmStart = new Date(today + " " + DigitalClock.innerHTML);
    let alarmEnd = new Date(today + " " + alarmTime);
    let diff = alarmEnd - alarmStart;


    let msec = diff;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    if (hh < 0) {
        hh = 24 + hh;
    }
    alarmInterval.innerHTML = zeroPad(hh) + ":" + zeroPad(mm) + ":" + zeroPad(ss);
    alarmClearInterval = setTimeout(getTimeDifference, 100);
}

function zeroPad(param) {
    return String(param).padStart(2, "0");
}