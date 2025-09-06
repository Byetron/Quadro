const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const myChoice = document.getElementById("myChoice");
const compBox = document.getElementById("comp");

const initialScreen = document.getElementById("initialScreen");
const resultScreen = document.getElementById("resultScreen");
const result = document.getElementById("result");
const fin = document.getElementById("fin");

function play(choice) {
    let comp = Math.floor(Math.random() * 3);
    let compChoice = comp === 0 ? "Rock" : comp === 1 ? "Paper" : "Scissors";
    let outcome = "";

    // Set the background image based on the computer's choice
    if (compChoice === "Rock") {
        compBox.style.backgroundImage = "url('/images/rock.png')";
    } else if (compChoice === "Paper") {
        compBox.style.backgroundImage = "url('/images/paper.png')";
    } else { // Scissors
        compBox.style.backgroundImage = "url('/images/scissors.png')";
    }

    if (choice === compChoice) {
        outcome = "It's a Tie!";
    } else if (
        (choice === "Rock" && compChoice === "Scissors") ||
        (choice === "Paper" && compChoice === "Rock") ||
        (choice === "Scissors" && compChoice === "Paper")
    ) {
        outcome = "You Win!";
    } else {
        outcome = "You Lose!";
    }

    // Fade to result screen
    setTimeout(() => {
        initialScreen.classList.add("hidden");
        setTimeout(() => {
            // Use innerHTML to render the line break
            fin.innerHTML = `You chose ${choice}, I chose ${compChoice}.<br><br>${outcome}`;
            resultScreen.classList.remove("hidden");
        }, 800);
    }, 1500);
}

rock.onclick = () => play("Rock");
paper.onclick = () => play("Paper");
scissors.onclick = () => play("Scissors");