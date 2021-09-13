let token = localStorage.getItem("token");
let adminUser = localStorage.getItem("isAdmin") === "true";
let adminButton = document.querySelector("#adminButton");
let cardFooter;

if (adminUser === false || adminUser === null) {
  adminButton.innerHTML = null;
  fetch("http://localhost:3000/api/products/active", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((result) => result.json())
    .then((result) => {
      let productData;
      if (result.length < 1) {
        // productData = "No products Available";
        return true
      } else {
        productData = result
          .map((product) => {
            console.log(product);

            if (adminUser === false || !adminUser) {
              cardFooter = `
                              <a href="./addToCart.html?productId=${product._id}" class="btn btn-danger  border border-dark btn-block addToCartButton">
                              Add To Cart
                              </a>
                          `;
            } else {
              if (product.isActive == true) {
                cardFooter = `
                                  <a href="./editProduct.html?productId=${product._id}" class="btn btn-danger  border border-dark btn-block editButton">
                                  Edit Product
                                  </a>
                                  <a href="./archiveProduct.html?productId=${product._id}" class="btn btn-warning  border border-dark btn-block archiveButton">
                                  Archive Product
                                  </a>
                                  <a href="./deleteProduct.html?productId=${product._id}" class="btn btn-dark border border-dark btn-block deleteButton">
                                  Delete Product
                                  </a>
                              `;
              } else {
                cardFooter = `
                                  <a href="./unarchiveProduct.html?productId=${product._id}" class="btn btn-secondary border border-dark btn-block unarchiveButton text-center">
                                  Unarchive Product
                                  </a>    
                              `;
              }
            }

            return `
                                  <div class="col-md-4 col-lg-3 my-5">
                                      <div class="card"> 
                                          <img src="${product.image}" alt="${product.name} class=" card-img-top productImage img-fluid">
                                          <div class="card-body">
                                              <h5 class="card-title font-weight-bold">
                                                  ${product.name}
                                              </h5>
                                              <p class="card-text text-center">
                                                  ${product.description}
                                              </p>
                                              <p class="card-text text-center">
                                              Price: &#8369 ${product.price}
                                              </p>
                                          </div>
                                          <div class="card-footer">
                                              ${cardFooter}
                                          </div>
                                      </div>
                                  </div>
                          `;
          })
          .join("");
      }

      let container = document.querySelector(`#productContainer`);

      container.innerHTML = productData;
    });
} else {
  adminButton.innerHTML = `
            <div class="col-md-2 offset-md-5">
                <a href="./addProduct.html" class="btn btn-block btn-danger">
            Add Product
                </a>
            </div>
    `;

  fetch("http://localhost:3000/api/products/all", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((result) => result.json())
    .then((result) => {
      let productData;
      if (result.length < 1) {
        productData = "No products Available";
      } else {
        productData = result
          .map((product) => {
            console.log(product);

            if (adminUser === false || !adminUser) {
              cardFooter = `
                    <a href="./addToCart.html?productId=${product._id}" class="btn btn-danger  border border-dark btn-block addToCartButton">
                    Add To Cart
                    </a>
                `;
            } else {
              if (product.isActive == true) {
                cardFooter = `
                        <a href="./editProduct.html?productId=${product._id}" class="btn btn-danger  border border-dark btn-block editButton">
                        Edit Product
                        </a>
                        <a href="./archiveProduct.html?productId=${product._id}" class="btn btn-warning  border border-dark btn-block archiveButton">
                        Archive Product
                        </a>
                        <a href="./deleteProduct.html?productId=${product._id}" class="btn btn-dark border border-dark btn-block deleteButton">
                        Delete Product
                        </a>
                    `;
              } else {
                cardFooter = `
                        <a href="./unarchiveProduct.html?productId=${product._id}" class="btn btn-secondary border border-dark btn-block unarchiveButton text-center">
                        Unarchive Product
                        </a>    
                    `;
              }
            }

            return `
                        <div class="col-md-4 col-lg-3 my-5">
                            <div class="card cardProduct"> 
                                <img src="${product.image}" alt="${product.name} class=" card-img-top productImage img-fluid">
                                <div class="card-body">
                                    <h5 class="card-title font-weight-bold">
                                        ${product.name}
                                    </h5>
                                    <p class="card-text text-center">
                                        ${product.description}
                                    </p>
                                    <p class="card-text text-center">
                                    Price: &#8369 ${product.price}
                                    </p>
                                </div>
                                <div class="card-footer">
                                    ${cardFooter}
                                </div>
                            </div>
                        </div>
                `;
          })
          .join("");
      }

      let container = document.querySelector(`#productContainer`);

      container.innerHTML = productData;
    });
}
