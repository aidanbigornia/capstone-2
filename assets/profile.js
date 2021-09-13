let token = localStorage.getItem("token");
let adminUser = localStorage.getItem("isAdmin") === "true";
let cardFooter;
if (adminUser === false || adminUser === null) {
    fetch("http://localhost:3000/api/orders/show-cart", 
    {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((result) => result.json())
    .then((result) => {
    console.log(result,"result ni showcart")
    let checkoutData; //specific Order Model(user)
    let user = result.firstName
    let orders = result.orders
    let total = result.totalPrice
    console.log(orders,"orders")
    console.log(user, "first name")

    console.log("result", result) //user info  tapos nested dito yung array of objects
    
    checkoutData = orders.map((product)=>{
        // console.log(product,"mapped")
        if(product !== 0){
        cardFooter =
            `
            <a href="./deleteOrder.html?productId=${product._id}" class="btn btn-warning border border-dark btn-block deleteButton">
            Delete Order
            </a>
            `
        }
        return orderData = 
            `
            <div class="col-md-4 col-lg-3 my-1">
                <div class="card border-danger"> 
                <div class="card-body">
                    <h5 class="card-title">
                    <span>${product.name}</span>
                    </h5>
                    <hr>
                    <p class="card-text text-center font-weight-light">
                    Product Id: ${product.productId}
                    </p>
                    <p class="card-text text-center">
                    Price: &#8369 ${product.price}
                    </p>
                    <p class="card-text text-center">
                    Qty: ${product.quantity}
                    </p>
                    <hr>
                    <p class="card-text text-center">
                    Subtotal: &#8369 ${product.subtotal}
                    </p>
                </div>
                <div class="card-footer">
                    ${cardFooter}
                </div>
            </div>
        </div>
            `
    }).join("");
    
let container = document.querySelector(`#checkoutContainer`);

container.innerHTML = checkoutData;

    let name = document.querySelector(`#greeting`);
    let greetingz = 
                    `
                    <div>
                    <h4> Hello there, ${user}</h4><br>
                    <h6> Total Amount: &#8369 ${total}</h6>
                    </div>
                    `

name.innerHTML = greetingz;
}
)
} else {
    console.log("admin detected")
    let name = document.querySelector(`#greeting`);
    let greetingz = 
                    `
                    <div>
                    <h4> Hello there, Admin</h4><br>
                    </div>
                    `

name.innerHTML = greetingz;
    
}