let editProduct = document.querySelector("#editProduct");

let params = new URLSearchParams(window.location.search);
let productId = params.get("productId")
// console.log(productId, "productId pakita")

let token = localStorage.getItem("token");

let productImage = document.querySelector(`#productImage`);
let productName = document.querySelector(`#productName`);
let productPrice = document.querySelector(`#productPrice`);
let productDescription = document.querySelector(`#productDescription`);
    
fetch(`http://localhost:3000/api/products/${productId}`,   
    {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
)
.then(result => result.json())
.then(result => {
    // console.log("result after fetching get single product", result)
    productImage.value = result.image
    productName.value = result.name
    productPrice.value = result.price
    productDescription.value = result.description
})

editProduct.addEventListener("submit", (e) => {
    e.preventDefault();

    productImage = productImage.value
    productName = productName.value
    productPrice = productPrice.value
    productDescription = productDescription.value

    fetch(`http://localhost:3000/api/products/${productId}/edit`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`   
            },
            body: JSON.stringify({
                image: productImage,
                name: productName,
                price: productPrice,
                description: productDescription
            })

        }
    )
    .then(result => result.json())
    .then(result => {
        // console.log("result ng update", result)
        if(result !== undefined){
            alert(`Product Successfully Updated!`)
            window.location.replace("./products.html")
        } else {
            alert("Something Went Wrong, please check details.")
        }
        
    })
})