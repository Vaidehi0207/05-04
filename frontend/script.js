document.getElementById('quizForm').addEventListener('submit', function(event) {
  event.preventDefault();
  generateQuiz();
});

function generateQuiz() {
  const topics = Array.from(document.getElementById('topics').selectedOptions).map(option => option.value);
  const difficulty = document.getElementById('difficulty').value;
  const numQuestions = parseInt(document.getElementById('numQuestions').value);

  // Here, you would make an AJAX request to the backend
  // to fetch questions based on user input
  // For simplicity, let's assume questions are hardcoded here
  const questions = [
    { question: "Question 1?", answer: "A" },
    { question: "Question 2?", answer: "B" },
    // Add more questions
  ];

  displayQuiz(questions);
}

function displayQuiz(questions) {
  const quizContainer = document.getElementById('quizContainer');
  const questionsDiv = document.getElementById('questions');
  questionsDiv.innerHTML = '';

  questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
    const answerInput = document.createElement('input');
    answerInput.setAttribute('type', 'text');
    answerInput.setAttribute('id', `answer_${index}`);
    questionDiv.appendChild(answerInput);
    questionsDiv.appendChild(questionDiv);
  });

  quizContainer.style.display = 'block';
}

document.getElementById('submitQuiz').addEventListener('click', function() {
  const questions = document.querySelectorAll('#questions div');
  let score = 0;
  let feedback = '';

  questions.forEach((question, index) => {
    const userAnswer = document.getElementById(`answer_${index}`).value.trim().toUpperCase();
    const correctAnswer = 'A'; // Assuming correct answer for each question is 'A', for example
    if (userAnswer === correctAnswer) {
      score++;
    } else {
      feedback += `<p>Question ${index + 1}: Incorrect. Correct answer: ${correctAnswer}</p>`;
    }
  });

  const scorePercentage = (score / questions.length) * 100;
  const scoreMessage = `Score: ${score}/${questions.length} (${scorePercentage}%)`;

  document.getElementById('score').textContent = scoreMessage;
  document.getElementById('feedback').innerHTML = feedback;
  document.getElementById('quizResult').style.display = 'block';
});
