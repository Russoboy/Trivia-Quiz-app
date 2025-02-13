const triviaContainer = document.getElementById('Trivia-Container');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const scoreContainer = document.getElementById('score-container');

let currentQuestion = {};
const quizQuestion = data.question;




   


const loadQuestion = async () => {
try{
    // const apiURL = `https://opentdb.com/api.php?amount=10`
    const response = await fetch("https://opentdb.com/api.php?amount=10")
    const data = await response.json();
    console.log("Fetched Data:", data); // Log data to see if API returns something

     if (data.results.length > 0) {
        currentQuestion = data.results[0];
        displayQuizQuestion(currentQuestion);   
 }  else {
    throw new Error("No quiz questions found in API response.");
} }
 catch(error) {
    triviaContainer.style.display = "red";
    triviaContainer.innerText = `Error fetching quiz: ${error.message}`;


  }


}

function displayQuizQuestion(data) {
    const quizQuestion = data.question;
    const quizOption = data.option;

    let quizOptions = [...data.incorrect_answers, data.correct_answer];

    // Shuffle options
    quizOptions = quizOptions.sort(() => Math.random() - 0.5);
  
    triviaContainer.innerHTML = 
    `<p><h1 id="question-container">${quizQuestion}</h1></p>
     <ul>
            ${quizOptions.map((option, index) => `
                <li>
                    <input type="radio" name="option" value="${option}" id="option${index}">
                    <label for="option${index}">${option}</label>
                </li>
            `).join('')}
        </ul>
    <button id="next-button" onclick="nextButtonFunc()">Next</button>
    <button id="restart-button">Restart</button>
   ` 
}
function nextButtonFunc() {
    const selectedOption = document.querySelector('input[name="option"]:checked'); 
    if (selectedOption) {
        loadQuestion();     
    } else {
   alert('pick an option')     
    }   
}

loadQuestion();
