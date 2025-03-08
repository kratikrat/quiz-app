const apiBaseURL = 'https://opentdb.com/api.php';
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let timer;
let timeRemaining = 180; // Set timer to 3 minutes (180 seconds)
document.getElementById('timer').textContent = timeRemaining;
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');
const answerContainer = document.getElementById('answer-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const questionNumberElement = document.getElementById('question-number'); // Element for the current question number
const totalQuestionsElement = document.getElementById('total-questions'); // Element for the total number of questions

nextButton.addEventListener('click', loadNextQuestion);
restartButton.addEventListener('click', resetQuiz);

function fetchQuestions() {
    const selectedCategory = localStorage.getItem('selectedCategory'); // Get category from localStorage
    const url = `${apiBaseURL}?amount=20&type=multiple&category=${selectedCategory}`; // Requesting 20 questions
    fetch(url)
        .then(response => response.json())
        .then(data => {
            questions = data.results;
            totalQuestionsElement.textContent = questions.length; // Update total questions
            startQuiz();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
}

function startQuiz() {
    score = 0;
    scoreElement.textContent = score;
    currentQuestionIndex = 0;
    loadQuestion(currentQuestionIndex);
    startTimer();
}

function loadQuestion(index) {
    const currentQuestion = questions[index];
    questionContainer.textContent = currentQuestion.question;

    answerContainer.innerHTML = ''; // Clear previous answers
    const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];

    // Shuffle options
    shuffleArray(allOptions);

    allOptions.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('answer-option');
        optionButton.addEventListener('click', () => checkAnswer(option, currentQuestion.correct_answer));
        answerContainer.appendChild(optionButton);
    });

    // Update the question number display
    questionNumberElement.textContent = currentQuestionIndex + 1; // Display current question number (1-based index)

    nextButton.disabled = true; // Disable the next button until an answer is selected
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
        scoreElement.textContent = score;
    }
    nextButton.disabled = false; // Enable next button after answer is selected
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex); // Load next question
    } else {
        clearInterval(timer); // Stop the timer
        alert('Quiz Over! Your final score is ' + score);
        // Store the score in localStorage and redirect to the index page
        localStorage.setItem('quizScore', score);
        window.location.href = 'index.html'; // Redirect to index page
    }
}

function resetQuiz() {
    clearInterval(timer); // Clear the timer if restarting
    timeRemaining = 180; // Reset timer to 3 minutes (180 seconds)
    timerElement.textContent = timeRemaining;
    questionNumberElement.textContent = 1; // Reset question number to 1
    fetchQuestions(); // Fetch new questions based on selected category
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert('Time is up! Your final score is ' + score);
            // Store the score and redirect to the index page
            localStorage.setItem('quizScore', score);
            window.location.href = 'index.html'; // Redirect to index page
        }
    }, 1000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

fetchQuestions(); // Start the quiz when the page loads
