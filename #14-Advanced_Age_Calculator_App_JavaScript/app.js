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
    return;
  }

  let oneDay = seconds * minutes * minutes * hours;
  let oneHour = seconds * minutes * minutes;
  let oneMinute = seconds * minutes;

  if (ageValue.value !== "") {
    let birthDate = new Date(ageValue.value);

    // Correctly calculate total Years, Months, Days
    let totalYears = today.getFullYear() - birthDate.getFullYear();
    let totalMonths = today.getMonth() - birthDate.getMonth();
    let totalDays = today.getDate() - birthDate.getDate();

    // Adjust if birthday hasn't occurred yet this year
    if (totalMonths < 0 || (totalMonths === 0 && totalDays < 0)) {
      totalYears--;
      totalMonths += 12;
    }

    // Adjust days if negative
    if (totalDays < 0) {
      const prevMonthLastDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      totalDays += prevMonthLastDate;
      totalMonths--;
      if (totalMonths < 0) {
        totalMonths += 12;
        totalYears--;
      }
    }

    // Accurate timestamp differences
    const timeDiff = Math.abs(today.getTime() - birthDate.getTime());
    const totalDaysLived = Math.floor(timeDiff / oneDay);
    const totalWeeks = Math.floor(timeDiff / (oneDay * week));
    const totalHours = Math.floor(timeDiff / oneHour);
    const totalMinutes = Math.floor(timeDiff / oneMinute);
    const totalSeconds = Math.floor(timeDiff / seconds);

    // Set current age string
    currentAge.innerText = `${totalYears} Years ${totalMonths} Months ${totalDays} Days`;

    DOB.innerText = `${birthDate.toLocaleString("default", {
      weekday: "long",
    })} ${birthDate.toLocaleString("default", {
      month: "long",
    })} ${birthDate.getDate()}, ${birthDate.getFullYear()}`;

    // Set total lived values
    InYears.innerText = totalYears + Math.floor(totalMonths / 12); // for display
    InMonths.innerText = Math.floor(totalYears * 12 + totalMonths);
    InWeeks.innerText = totalWeeks;
    InDays.innerText = totalDaysLived;
    InHours.innerText = totalHours;
    InMinutes.innerText = totalMinutes;
    InSeconds.innerText = totalSeconds;

    // Calculate days left for next birthday
    let nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    let totalDaysLeft = Math.ceil(
      (nextBirthday.getTime() - today.getTime()) / oneDay
    );
    nextBirthDaysLeft.innerText = totalDaysLeft;
  }
});
