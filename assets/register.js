// target HTML
// 1, the form

let registerForm = document.querySelector(`#registerUser`);

// add event listener 
registerForm.addEventListener("submit", (e) => {

    e.preventDefault();


// 2. id inside the form ().value;

let firstName = document.getElementById(`firstName`).value;
let lastName = document.getElementById(`lastName`).value;
let email = document.getElementById(`email`).value;
let password = document.getElementById(`password`).value;
let password2 = document.getElementById(`password2`).value;


    if(password === password2 && password !== "" && password2 !== "" ){
        // fetch
        fetch("https://sashopee.herokuapp.com/api/users/checkEmail",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            }
        )
        .then(result => result.json())
        .then(result => {
            if(result === false){
                fetch("https://sashopee.herokuapp.com/api/users/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ 
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: password
                        })
                    }
                )
                .then(result => result.json())
                .then(result => {

                    if(result === true){
                        alert("Registered Successfully")
						window.location.replace('./login.html');

                    } else {
                        alert("Something went wrong!");
                    }
                })
            } else {
                alert("Email Already Exists");
            }
        })
    }
});

