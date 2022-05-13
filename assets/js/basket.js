let button = document.querySelectorAll(".button");

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("basket") !== null) {
        calculate();
    }
});


let basket = [];


button.forEach((btn) => {
    btn.addEventListener('click', function (e) {
        e.preventDefault()

        if (localStorage.getItem("basket") !== null) {
            basket = JSON.parse(localStorage.getItem("basket"));
        }

        let mod = this.parentNode.querySelector("h5").innerText;
        let img = this.parentNode.previousElementSibling.src;
        let price = this.parentNode.querySelector(".price").innerText;
        let id = this.getAttribute("data-id");
        let existent = basket.find((x) => x.id == id);

        if (existent === undefined) {
            let product = {
                id,
                mod,
                img,
                price,
                count: 1,
            }
            basket.push(product)
        } else {
            existent.count++;
        }
        localStorage.setItem("basket", JSON.stringify(basket));
        calculate();
        // console.log(basket);
    })
})
function calculate() {
    let basket = JSON.parse(localStorage.getItem("basket"))
    let count = basket.reduce((t, val) => {
        return (t += val.count);
    })
    let countval = document.querySelector("sup")
    countval.innerText = count;
}