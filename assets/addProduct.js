
let addProduct = document.querySelector(`#addProduct`)

addProduct.addEventListener("submit", (e) => {
    e.preventDefault();


let productImage = document.querySelector(`#productImage`).value;
let productName = document.querySelector(`#productName`).value;
let productPrice = document.querySelector(`#productPrice`).value;
let productDescription = document.querySelector(`#productDescription`).value;

if(productImage !== "", productName !== "", productPrice !== "", productDescription !== "" ){

    let token = localStorage.getItem("token");

    fetch("https://sashopee.herokuapp.com/api/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            image: productImage, 
            name: productName, 
            price: productPrice, 
            description: productDescription, 
        })
    })
    .then(result => result.json())
    .then( result => {
        if(result){
            alert("Product Successfully Added!")
            window.location.replace("./products.html")
        } else {
            alert("Something Went Wrong!")
        }
    })
}
})