let params = new URLSearchParams(window.location.search);
let productId = params.get('productId');
let token = localStorage.getItem("token")
let inputQuantity = document.querySelector("#inputQuantity");
fetch(`http://localhost:3000/api/products/${productId}`,
    {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
)
.then(result => result.json())
.then( result => {
    let productData;
    console.log (result, "result from get single product") 
    let productInfo = result;
    productData =
             `
            <div class="col-md-4 offset-md-4 my-5">
                <div class="card cardProduct"> 
                    <img src="${result.image}" alt="${result.name} class=" card-img-top productImage img-fluid">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">
                            ${result.name}
                        </h5>
                        <p class="card-text text-center">
                            ${result.description}
                        </p>
                        <p class="card-text text-center">
                        Price:&#8369 ${result.price}
                        </p>
                    </div>
                </div>
            </div>

            `

let container = document.querySelector(`#cartContainer`);

    container.innerHTML = productData;

})
.then(result => {
    fetch("http://localhost:3000/api/orders/addCart", 
    {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
)
.then(result => result.json())
.then(result => {
    // console.log(result, "result from addCart")
        inputQuantity.addEventListener("submit", (e) => {
            e.preventDefault();
        
            let quantity = document.querySelector(`#quantity`).value;
        
            if(quantity !== 0 || quantity !== null) {
                fetch(`http://localhost:3000/api/orders/${productId}/add-to-cart`, 
                    {
                        method: "POST", 
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            quantity: quantity
                        })
                    }
            )
            .then((result)=> result.json())
            .then(result => {
                if(quantity < 1){
                    alert(" Minimum quantity for ordering is 1")
                } else {
                
                alert("Product Added to Cart")
                window.location.replace("./products.html")
            
            }})
           
    
        }})
});
})






