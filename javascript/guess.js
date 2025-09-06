const submitGuess = document.getElementById("submitGuess");
const myGuess = document.getElementById("myGuess");
const result = document.getElementById("result");

let randomNum;

submitGuess.onclick = function() {
    randomNum = Math.floor(Math.random() * 10) + 1;

    if(myGuess.value == randomNum) {
        result.textContent = `You guessed right! The number was ${randomNum}.`;
        myGuess.value = "";
    } 
    
    else if (myGuess.value < 1 || myGuess.value > 10) {
        result.textContent = "Please enter a number between 1 and 10.";
        myGuess.value = "";
    }

    else if (myGuess.value == "") {
        result.textContent = "Please enter a number.";
        myGuess.value = "";
    }
    
    else{
        result.textContent = `Wrong guess! The number was ${randomNum}. Try again!`;
        myGuess.value = "";
    }
}
