let low = 1;
let high = 10;
let pressToStart = document.querySelector('#press-to-start');
let gameDiv = document.querySelector('.game-div');

pressToStart.addEventListener('click', LoadTheGameUi);

function LoadTheGameUi() {
    pressToStart.remove();

    let correct_ans = getRandomNumber(low, high);
    let chances = 3;
    
    gameDiv.innerHTML = `
        <h5>Guess a number between ${low} to ${high}<h5>
        <form>
            <label>Please enter your guess:</labe>
            <input type="number" id="user-guess" placeholder="Type..." min="${low}" max="${high}">
            <input type="submit" id="input-submit">
        </form>
        <p id="chances"><i>Chances Left: 3</i></p>
    `
    let submitBtn = document.querySelector('#input-submit');
    let chancesP = document.querySelector('#chances');
    
    submitBtn.addEventListener('click', (e) => {
        
        let inputField = document.querySelector('#user-guess');
        let inputNum = parseInt(inputField.value);
                
        if(validateInput(inputNum)) {
            chances--;
            let checkAnswerStatus = checkAnswer(correct_ans, inputNum);
            if((chances == 0) || checkAnswerStatus) {
                chancesP.remove();
                submitBtn.disabled = true;
                inputField.disabled = true;
                if(checkAnswerStatus) {
                    gameDiv.innerHTML += `
                        <h3>You Win!</h3>
                        <button id="restart">Press to restart</button>
                    `
                }
                else {
                    gameDiv.innerHTML += `
                    <h3>You Lose!</h3>
                    <button id="restart">Press to restart</button>
                    `;
                }
                checkForRestart();
            }
            
            else {
                if(inputNum > correct_ans) {
                    alert("Correct answer is smaller!");
                }
                else {
                    alert("Correct answer is greater!");
                }
                chancesP.innerHTML = `<i>Chances Left: ${chances}</i>`;
                inputField.value = "";
            }
            
        }

        else {
            alert("Input must be filled and must be between 1 to 10");
        }

        e.preventDefault();
    });
}


function getRandomNumber(l, h) {
    return Math.floor(Math.random() * (h - l + 1)) + l;
}

function checkAnswer(correct_ans, inputNum) {
    if(correct_ans == inputNum) {
        return true;
    }
    else {
        return false;
    }
}

function validateInput(num) {
    return (!isNaN(num) && num>=1 && num<=10);//true if valid 
}

function checkForRestart() {
    let restartBtn = document.querySelector('#restart');
    restartBtn.addEventListener('click', LoadTheGameUi);
}