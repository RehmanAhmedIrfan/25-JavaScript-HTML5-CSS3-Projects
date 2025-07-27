const ageValue = document.getElementById("ageValue");
const calculateAge = document.getElementById("calculateAge");
const currentAge = document.getElementById("currentAge"),
    DOB = document.getElementById("DOB");

const InYears = document.getElementById("InYears");
const InMonths = document.getElementById("InMonths");
const InWeeks = document.getElementById("InWeeks");
const InDays = document.getElementById("InDays");
const InHours = document.getElementById("InHours");
const InMinutes = document.getElementById("InMinutes");
const InSeconds = document.getElementById("InSeconds");
const nextBirthDaysLeft = document.getElementById("nextBirthDaysLeft");

const today = new Date(),
    seconds = 1000,
    minutes = 60,
    hours = 24,
    week = 7;
let maxDate = today.toISOString().substring(0, 10);
ageValue.setAttribute("max", maxDate);

calculateAge.addEventListener("click", function (e) {
    if (ageValue.value === maxDate) {
        alert("Invalid Date of Birth");
    }

    let oneDay = seconds * minutes * minutes * hours;
    let oneHour = seconds * minutes * minutes;
    let oneMinutes = seconds * minutes;

    if (ageValue.value !== "") {
        let birthDate = new Date(ageValue.value);

        let totalYears = today.getFullYear() - birthDate.getFullYear();
        let totalMonths = today.getMonth() - birthDate.getMonth() + (today.getFullYear() - birthDate.getFullYear()) * 12;
        let totalWeeks = Math.round(Math.abs(today.getTime() - birthDate.getTime()) / (oneDay * week));
        let totalDays = Math.round(Math.abs(today.getTime() - birthDate.getTime()) / oneDay);
        let totalHours = Math.round(Math.abs(today.getTime() - birthDate.getTime()) / oneHour);
        let totalMinutes = Math.round(Math.abs(today.getTime() - birthDate.getTime()) / oneMinutes);
        let totalSeconds = Math.round(Math.abs(today.getTime() - birthDate.getTime()) / seconds);


        let monthTotal = Math.abs(birthDate.getMonth() - today.getMonth());
        let dayTotal = Math.abs(today.getDate() - birthDate.getDate());

        currentAge.innerText = `${totalYears} Years ${monthTotal} Months ${dayTotal} Days`;

        DOB.innerText = `${birthDate.toLocaleString("default", { weekday: "long" })} ${birthDate.toLocaleString("default", { month: "long" })} ${birthDate.getDate()}, ${birthDate.getFullYear()}`;

        InYears.innerText = totalYears;
        InMonths.innerText = totalMonths;
        InWeeks.innerText = totalWeeks;
        InDays.innerText = totalDays;
        //from current time
        InHours.innerText = totalHours;
        InMinutes.innerText = totalMinutes;
        InSeconds.innerText = totalSeconds;

        let birthDayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (today > birthDayThisYear) {
            birthDayThisYear.setFullYear(today.getFullYear() + 1);
        }
        let totalDaysLeft = Math.round((birthDayThisYear.getTime() - today.getTime()) / oneDay);
        nextBirthDaysLeft.innerText = totalDaysLeft;
    }
});