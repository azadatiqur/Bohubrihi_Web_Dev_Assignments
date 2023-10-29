let menu = document.querySelector('#menu');
let inputForm = document.querySelector('#input-form');

menu.addEventListener("change", showInputField);



function showInputField(e) {
    inputForm.innerHTML = `
        <br>
        <label>Please enter the ${e.target.value.toUpperCase()} :</label>
        <input type="text" id="input-box" placeholder="Type here..."></input>
        <input type="submit" id="input-submit">
        `
    let inputSubmit = document.querySelector('#input-submit');
    let selectedExpression = e.target.value;
    inputSubmit.addEventListener('click', (e) => {
        let inputBox = document.querySelector('#input-box');
        let inputText = inputBox.value;
        //console.log(inputText);
        //console.log(selectedExpression);
        if(inputText == "") {
            alert("Input must be filled!");
        }
        else {
            inputBox.value = "";
            validate(inputText, selectedExpression);
        }
        e.preventDefault();
    });
    e.preventDefault();
}

function validate(inputText, selectedExpression) {
    let re;
    switch(selectedExpression){
        case "email" :
            re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            break;
        case "phone-number":
            re = /^(\+)?(88)?01[0-9]{9}$/;
            break;
        case "post-code":
            re = /^[0-9]{4}$/
            break;
        case "ip-address":
            re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            break;
        case "url":
            re = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
            break;
    }
    
    if(re.test(inputText)) {
        alert(`Congratulations! It is a valid ${selectedExpression.toUpperCase()}.`);
    }
    else {
        alert(`Sorry! It is an invalid ${selectedExpression.toUpperCase()}.`);
    }
}

