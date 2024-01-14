const Url = "https://mature-spider-52.hasura.app/api/rest/SignUp";
///////////param////////////////////////////////////////////////////////
const Secret =
    "NpqGrcbFQB1sEq521VhOt3CXOFRrNXRGJRA5S598ycr7DTKdhbSBJkwmRUliaGMZ";




/////function////////////////////////////////////////////////////////////
async function signupUser(event) {
    event.preventDefault();
    let x = document.getElementById("usernameInput").value;
    let y = document.getElementById("emailInput").value;
    let z = document.getElementById("passwordInput").value;
    if(y < 1 || x < 1 || z< 1) {
        alert("Input not fill")
        return false
    }
    const username = document.getElementById("usernameInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    console.log(username);
    console.log(email);
    console.log(password);
    axios
        .post(
            Url,
            {
                email,
                password,
                username,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret": Secret,
                },
            }
        )
        .then(() => {
            // Handle the response data here
            location.href = 'sign_in.html'
        })
        .catch(() => {
            // Handle errors here
            alert("username or email already");
            document.getElementById("signupForm").reset();
        });
    }




