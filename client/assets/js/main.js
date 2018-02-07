document.addEventListener("DOMContentLoaded", init);

function init(){
  handleEvents();
}

function handleEvents(){
  const cancelBtns = document.querySelectorAll('.cancel');
  const landingBtns = document.querySelectorAll('.landingbtn');
  const formBtns = document.querySelectorAll('.formButton');
  const repeatPass = document.querySelector('.repeat-pass');
  assignClickHandlers(landingBtns, handleLandingBtn); //SignUp & LogIn
  assignClickHandlers(cancelBtns, handleCancel); // Cancel Buttons for both Forms
}

function assignClickHandlers(arr, eventfunction){
  for(let i=0;i<arr.length;i++){
    arr[i].addEventListener('click', eventfunction)
  }
}

function handleCancel(event){
    event.preventDefault();
    const grandParent = event.target.parentNode.parentNode;
    const greeting = document.querySelector('.greeting');
    grandParent.classList.add('fade-out');
    setTimeout(function () {
      grandParent.classList.remove('fade-in');
      grandParent.classList.remove('fade-out');
  }, 300);
    greeting.classList.remove('fade-out');
    greeting.classList.add('fade-in');

}

function handleLandingBtn(){
  const formLog = document.querySelector('.formLog');
  const formSign = document.querySelector('.formSign');
  const greeting = document.querySelector('.greeting');
  if(this.classList.contains('signUp')){
    formSign.classList.add('fade-in');
    greeting.classList.add('fade-out');
  }else if(this.classList.contains('logIn')){
    formLog.classList.add('fade-in');
    greeting.classList.add('fade-out');
  }
}

function checkValidity(elemArr){
    let invalidElems=[];
    elemArr.forEach(function(elem){
        if(!elem.validity.valid){
            invalidElems.push(elem.name)
        }
    })
    return invalidElems;
}

function generateErrorMsg(invalidArr){
    const error = document.getElementById("error")
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    if(error.children[1]){
        error.removeChild(error.children[1]);
    }
    invalidArr.forEach(function(elem){
        const li = document.createElement('li');
            if(elem==="username"){
                li.textContent="• "+elem+" has to be 4-20 characters long"
            }else if(elem==="password"){
                li.textContent="• "+elem+" has to be 8-25 characters long with atleast one uppercase letter, one number and one special character"
            }else if(elem==="password2"){
                li.textContent="• Both passwords has to match"
            }else{
                li.textContent="• "+elem+" has to be in valid email format"
            }
            ul.appendChild(li)
        });
    fragment.appendChild(ul);
    error.appendChild(fragment);
    error.style="display:block";
}
