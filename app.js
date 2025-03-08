const startQuizButton = document.getElementById('start-quiz-btn');
const categorySelect = document.getElementById('category-select');
const scoreDisplay = document.createElement('p'); // To display the score

// Check if the score is stored in localStorage
const storedScore = localStorage.getItem('quizScore');
if (storedScore !== null) {
    scoreDisplay.textContent = `Your last quiz score: ${storedScore}`;
    document.getElementById('choose-topic-container').appendChild(scoreDisplay);
    localStorage.removeItem('quizScore'); // Clear the stored score after displaying it
}

startQuizButton.addEventListener('click', () => {
    const selectedCategory = categorySelect.value;
    localStorage.setItem('selectedCategory', selectedCategory); // Store selected category in localStorage
    window.location.href = 'quiz.html'; // Redirect to quiz page
});
