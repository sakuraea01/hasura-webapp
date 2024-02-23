
/////////////////////////////////////////////param////////////////////////////////////////////////////////////////////////////////////////////////

const user = localStorage.getItem("user");
const parsedUser = user ? JSON.parse(user) : null;
const UrlPostPersonal =
    "https://mature-spider-52.hasura.app/api/rest/PostPersonal";
const UrlPublic =
    "https://mature-spider-52.hasura.app/api/rest/PublicPost";
const UrlShowPublic =
    "https://mature-spider-52.hasura.app/api/rest/ShowPublicPost";
const UrlShowPesonal =
    "https://mature-spider-52.hasura.app/api/rest/ShowPersonalPost";
const UrlDeletePesonalPost =
    "https://mature-spider-52.hasura.app/api/rest/deletepersonalpost";
const Secret =
    "NpqGrcbFQB1sEq521VhOt3CXOFRrNXRGJRA5S598ycr7DTKdhbSBJkwmRUliaGMZ";
    
//PersonalPost
var postpersonalenter = document.getElementById("personalpost");

//PublicPost
var postpublicenter = document.getElementById("publicpost");



////////////////////////////////////////////////////eventListener//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let newMessage = false;
postpublicenter.addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
        PostPublic(e);
        e.target.value = "";
        if (!newMessage) {
            var newTodoItemContainer = document.createElement(`div`)
            newTodoItemContainer.className = `todoListWrapperNewmessage`
            newTodoItemContainer.innerHTML = `Click Newmessage`
            newTodoItemContainer.addEventListener("click", function () {
                window.location.reload()
            })
            document.getElementById("showfeedpublic").prepend(newTodoItemContainer)
            newMessage = true;
        }
    }
});

postpersonalenter.addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
        PostPersonal(e);
        e.target.value = "";
    }
});



////////////////////////////////////////////////////////function////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getPulicPost() {
    axios
        .get(UrlShowPublic, {
            headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": Secret,
            },
        })
        .then((response) => {
            const showdata = document.getElementById("showfeedpublic");
            for (let i = response.data.publice_post.length - 1; i < response.data.publice_post.length; i--) {
                var feedParam = response.data.publice_post[i];
                document.getElementById("showfeedpublic").innerHTML += `
                    <div class="boxcomment">
                    <div class="boxname">
                        ${feedParam.user.username}
                        </div>
                        <div class="boxpost">
                        ${feedParam.post}
                        </div>
                    </div>
                        
                `
            }
        })
        .catch((error) => {
            // Handle errors here
            console.error(error);
        });
}

function getPesonalPost() {
    const personalpost = parsedUser[0]?.id;
    axios
        .post(UrlShowPesonal,{personalpost}, {
            headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": Secret,
            },
        })
        .then((response) => {
            for (let i = response.data.personal_post.length - 1; i < response.data.personal_post.length; i--) {
                var feedParam = response.data.personal_post[i];
                document.getElementById("showfeedpersonal").innerHTML += `
                        <div class="boxcomment ">
                        <div class="boxname" ">
                        ${feedParam.post}
                        </div>
                        <div class="boxdelete">
                        <button class="btn btn-danger" onclick="DeletePersonalPost(event)">Delete
                        <div hidden id="id_postpersonal" >
                        ${feedParam.id}
                        </div>
                        </button>
                        </div>
                        </div>
                `
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

function PostPublic(event) {
    event.preventDefault();
    const postpublic = document.getElementById("publicpost").value;
    const user_id = parsedUser[0]?.id;
    axios
        .post(
            UrlPublic,
            {
                user_id,
                postpublic,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret": Secret,
                },
            }
        )
        .then((response) => {
            // Handle the response data here
            console.log(response.data);
        })
        .catch((error) => {
            // Handle errors here
            console.error(error);
        });
}

function PostPersonal(event) {
    event.preventDefault();
    const postpersonal = document.getElementById("personalpost").value;
    const user_id = parsedUser[0]?.id;
    axios
        .post(
            UrlPostPersonal,
            {
                user_id,
                postpersonal,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret": Secret,
                },
            }
        )
        .then((response) => {
            console.log(response.data);
            window.location.reload()

        })
        .catch((error) => {
            console.error(error);
        });
}


function DeletePersonalPost(event) {
    event.preventDefault();
    const id_postpesonal = Number(event.target.querySelector("#id_postpersonal").textContent);    
    const user_id = parsedUser[0]?.id;
    console.log(id_postpesonal);
    console.log(user_id);
    axios
        .delete(
            UrlDeletePesonalPost,
            {
                data: {
                    user_id,
                    id_postpesonal
                },
                headers: {
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret": Secret,
                },
            }
        )
        .then((response) => {
            // Handle the response data here
            console.log(response.data);
            window.location.reload()})
        .catch((error) => {
            // Handle errors here
            console.error(error);
        });
}


async function logOut() {
    await localStorage.removeItem("user");
    location.href = "sign_in.html";
}

/////////////onload //but Vue is Mounted and Created//////////////////////////////////////////////////////////////////////////////////////////////
window.onload = getPulicPost();
window.onload = getPesonalPost();

/////////////////////////////////////Use Vue//////////////////////////////////////////////////////////////////////////////////////////
var app = new Vue({
    el: '#app',
    data:{
        parsedUser
    },
})
