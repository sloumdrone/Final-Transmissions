document.addEventListener('DOMContentLoaded', handleEventHandlers);



function handleEventHandlers() {

    const confirm = document.querySelectorAll(".log-out");
    const noBtn = document.querySelector(".no");
    const logOutModal = document.querySelector(".logOut-container");
    const editText = document.querySelectorAll(".edit-text");

    editText.forEach((elem)=>elem.addEventListener("click",makeInput))
    noBtn.addEventListener("click",function(){
        logOutModal.classList.add("hide");
    });

    for(let i=0;i<confirm.length;i++){
        confirm[i].addEventListener("click", function(){
            logOutModal.classList.remove("hide")
     });
    }

    heightMonitor();
}

function heightMonitor() {
    const userContainer = document.querySelector('#user-container');
    if(userContainer.offsetHeight<window.innerHeight){
        userContainer.style.height="100vh"
    }else{
        userContainer.style.height="inherit"
    }
}



function makeInput() {
    this.disabled=true;
    const fragment = document.createDocumentFragment();
    const form = document.createElement("form")
    const input = document.createElement("input")
    const submit = document.createElement("button")
    const cancel = document.createElement("button")
    const email = document.querySelector(".user-details.email")
    form.classList.add("email-container");
    input.type="email";
    input.placeholder=email.innerHTML;
    input.pattern="^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
    input.required=true;
    input.classList.add("email-input");
    submit.textContent="Submit";
    cancel.type="button";
    cancel.classList.add("cancel");
    submit.onclick=function(){
        if(this.previousSibling.value.match(/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            document.querySelector('.modal').classList.remove('hide');
            console.log(this.previousSibling.value)
        }
    }
    cancel.onclick=function() {
        revertInput();
    }
    cancel.textContent="Cancel"
    form.appendChild(input);
    form.appendChild(submit);
    form.appendChild(cancel)
    fragment.appendChild(form);
    email.parentNode.replaceWith(fragment);
}


function revertInput() {
    document.querySelector(".edit-text").disabled=false;
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    const emailh4 = document.createElement('h4');
    div.classList.add("email-holder");
    emailh4.className="user-details email"
    emailh4.textContent=document.querySelector('.email-container input').placeholder
    div.appendChild(emailh4);
    fragment.appendChild(div);
    event.target.parentNode.replaceWith(fragment);
}



function updateEmail(elem) {
const inputData = elem.previousSibling.value
    axios.put({
        url: "/email",
        method: "POST",
        responseType: "document",
        data: inputData
    }).then(function(response) {
        document.querySelector('.modal').classList.add('hide');
        window.location = response.data.URL;
    }).catch(function(error) {
        console.error(errorMsg, error);
    });
}
