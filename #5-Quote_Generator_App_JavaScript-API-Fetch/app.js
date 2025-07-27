const quote = document.querySelector(".quote"),
    generate = document.getElementById("generate"),
    category = document.getElementById("category"),
    likeQuote = document.getElementById("likeQuote"),
    likeList = document.getElementById("likeList"),
    quoteArea = document.querySelector(".quoteArea"),
    favoriteList = document.querySelector(".favoriteList"),
    favoriteData = document.getElementById("favoriteData")


let favoriteListArr = localStorage.getItem("favoriteListItems") ? JSON.parse(localStorage.getItem("favoriteListItems")) : [];
// console.log(facoriteListArr)
window.addEventListener("load", () => {
    generateQuotes();
    favoriteList.style.display = "none"
    if (favoriteListArr.length == 0) {
        likeList.style.opacity = "0.6"
        likeList.style.pointerEvents = "none"
    } else {
        likeList.style.opacity = "1"
        likeList.style.pointerEvents = "auto"
    }
})
function generateQuotes() {

    let div = document.createElement("div");
    quote.innerHTML = 'Loading New Quotes...<i class="fa-solid fa-sync fa-spin"></i>'
    generate.innerHTML = "Generating..."
    fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": "yln+5jNWa7c7OtCwwNO1Ig==wIiWusFHC0HRvQLU" }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            generate.innerHTML = "New Quote"
            quote.innerHTML = "";
            div.innerHTML += '<i class="fa-solid fa-quote-left"></i> &nbsp;';
            div.innerHTML += data[0].quote;
            div.innerHTML += '&nbsp; <i class="fa-solid fa-quote-right"></i>';

            div.innerHTML += `<div class="author"><span>__</span>${data[0].author}</div>`
            quote.append(div);

            category.innerHTML = data[0].category;
        })
}

function LikeQuote() {
    if (likeQuote.style.color == "red") {
        likeQuote.removeAttribute("class")
        likeQuote.setAttribute("class", "fa-regular fa-heart")
        likeQuote.style.color = "black"

        favoriteListArr = favoriteListArr.filter(function (e) {
            return e !== quote.innerHTML;
        });
        localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr))
    } else {
        likeQuote.setAttribute("class", "fa-solid fa-heart")
        likeQuote.style.color = "red"

        favoriteListArr.push(quote.innerHTML);
        localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr))
    }

    if (favoriteListArr.length == 0) {
        likeList.style.opacity = "0.6"
        likeList.style.pointerEvents = "none"
    } else {
        likeList.style.opacity = "1"
        likeList.style.pointerEvents = "auto"
    }
}
function CopyQuote() {
    navigator.clipboard.writeText(quote.innerText);
}

likeList.addEventListener("click", () => {
    favoriteData.innerHTML = "";
    quoteArea.style.display = "none"
    favoriteList.style.display = "block"

    let li = document.createElement("li");
    favoriteListArr.forEach((item) => {
        console.log(item);
        let li = document.createElement("li")
        li.innerHTML = item;
        favoriteData.append(li)
    })
})

function switchQuotes() {
    quoteArea.style.display = "block"
    favoriteList.style.display = "none"

    if (favoriteListArr.length == 0) {
        likeList.style.opacity = "0.6"
        likeList.style.pointerEvents = "none"
    } else {
        likeList.style.opacity = "1"
        likeList.style.pointerEvents = "auto"
    }
}

function clearFavoriteList() {
    favoriteData.innerHTML = ""
    favoriteListArr = [];
    localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr))

    likeQuote.removeAttribute("class")
    likeQuote.setAttribute("class", "fa-regular fa-heart")
    likeQuote.style.color = "black"
}