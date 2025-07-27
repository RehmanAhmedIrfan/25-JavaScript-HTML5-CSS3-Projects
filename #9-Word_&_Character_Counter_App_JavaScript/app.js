const wordCounter = document.getElementById("wordCounter"),
    Totalwords = document.getElementById("Totalwords"),
    TotalCharWithSpace = document.getElementById("TotalCharWithSpace"),
    TotalCharWithoutSpace = document.getElementById("TotalCharWithoutSpace"),
    TotalSpecialChar = document.getElementById("TotalSpecialChar"),
    TotalReadTime = document.getElementById("TotalReadTime");


wordCounter.addEventListener("keyup", function (e) {
    let countValues = e.target.value;
    Totalwords.innerText = getTotalWords(countValues);
    TotalCharWithSpace.innerText = getTotalCharWithSpace(countValues);
    TotalCharWithoutSpace.innerText = getTotalCharWithoutSpace(countValues);
    TotalSpecialChar.innerText = getTotalSpecialChar(countValues);
    TotalReadTime.innerText = getTotalReadTime(countValues);
})
function getTotalWords(str) {
    return str.length > 0 ? str.split(/\s+/).length : 0;
}

function getTotalCharWithSpace(str) {
    return str.length;
}

function getTotalCharWithoutSpace(str) {
    return str.split(" ").join("").length;
}

function getTotalSpecialChar(str) {
    let spChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let counts = 0;
    for (let i = 0; i < str.length; i++) {
        if (spChar.test(str[i])) {
            counts++;
        }
    }
    return counts;
}

function getTotalReadTime(str) {
    let WPM = 200;
    return Math.ceil(getTotalWords(str) / WPM);
}