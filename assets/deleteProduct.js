
let params = new URLSearchParams(window.location.search);
let productId = params.get('productId');

let token = localStorage.getItem('token');

fetch(`http://localhost:3000/api/products/${productId}/delete`,
	{
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}
)
.then(result => result.json())
.then( result => {
	console.log(result)

	if(result){
        
		window.location.replace('./products.html');
        alert("Deleted Successfully")

	} else {

		alert("Something went wrong")
	}
})