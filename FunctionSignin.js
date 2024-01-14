const Url = "https://mature-spider-52.hasura.app/api/rest/Users";
const Secret =
    "NpqGrcbFQB1sEq521VhOt3CXOFRrNXRGJRA5S598ycr7DTKdhbSBJkwmRUliaGMZ";

function signinUser(event) {
    event.preventDefault();
    let x = document.getElementById("emailInput").value;
    let y = document.getElementById("passwordInput").value;
    if(y < 1 || x < 1 ) {
        alert("Input not fill")
        return false
    }
    else if (y < 1) {
        alert("password not fill")
    }
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    axios.post(Url, { email, password }, {
        headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": Secret,
        },
    })
        .then((response) => {
            // Handle the response data here
            console.log("Successful response:", response.data);

            // Check if users array is not empty
            if (response.data.users && response.data.users.length > 0) {
                // User found, implement your authentication logic here
                console.log(response.data)
                console.log("User found:", response.data.users[0]);
                localStorage.setItem("user", JSON.stringify(response.data.users));
                location.href = 'index 1.html';
            } else {
                // User not found, handle accordingly
                console.log("User not found");
                alert("Invalid email or password ");
                document.getElementById("myForm").reset();
                cleart
            }
        })
        .catch((error) => {
        });


}