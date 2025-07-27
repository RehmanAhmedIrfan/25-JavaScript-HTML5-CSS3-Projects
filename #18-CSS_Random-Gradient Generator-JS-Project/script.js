colInputs = document.querySelectorAll('.color input')
bg_div = document.querySelector('.background')
select_tag = document.querySelector('select')
textarea_tag = document.querySelector('textarea')
refresh_btn = document.querySelector('.refresh')
copy_btn = document.querySelector('.copy')

function makeRandomColor(){
    Random_colors = Math.floor(Math.random() * 0Xffffff).toString(16);
    return `#${Random_colors}`;
}


function generateCOlors(isRandom) {
    console.log('checking')
    if (isRandom) {
        colorOption1 = makeRandomColor()
        colorOption2 = makeRandomColor()
        colInputs[0].value = colorOption1
        colInputs[1].value = colorOption2;
        console.log('true')
    } else if (!isRandom) {

        colorOption1 = colInputs[0].value
        colorOption2 = colInputs[1].value
        console.log(colorOption2)
    }

    gradient = `linear-gradient(${select_tag.value}, ${colorOption1}, ${colorOption2})`
    bg_div.style.background = gradient;
    textarea_tag.value = `background-image:${gradient}`
}


colInputs.forEach(function (onebyone) {
    onebyone.addEventListener('input', function(){generateCOlors(false)})
})

select_tag.addEventListener('change', function(){generateCOlors(false)})
refresh_btn.addEventListener('click', function(){generateCOlors(true)})
copy_btn.addEventListener('click', copyCode)
 
function copyCode(){
    navigator.clipboard.writeText(textarea_tag.value)
    this.innerText = 'Code Copied'
    setTimeout(function(){
        copy_btn.innerText = 'Copy Code'  
    },1000)
}





