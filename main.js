const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

// find the elements
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const sumbitBtn = document.querySelector('#submit');


// game changers
let score = 0; 
let questionIndex = 0;

clearPage()
showQuestion()
sumbitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	// questions

	// another method
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])

	headerContainer.innerHTML = title

	// answers
	let answerNumber = 1;

	for (answerText of questions[questionIndex]['answers']) {
		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;

		let answerHTML = questionTemplate
							.replace('%answer%', answerText)
							.replace('%number%', answerNumber)

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
}

function checkAnswer() {

	// selected button
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	// if no answer
	if (!checkedRadio) {
		sumbitBtn.blur()
		return
	} 

	// user response
	const userAnswer = parseInt(checkedRadio.value);

	// if the answer is correct, then increase
	questions[questionIndex]['correct']
	if (userAnswer === questions[questionIndex]['correct']) {
		score++
	} 

	if (questionIndex !== questions.length - 1) {
		questionIndex++
		clearPage();
		showQuestion();
		return
	} else {
		clearPage();
		showResults();
	}
}


function showResults() {
	const resultsTemplate = `
	<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>
	`;

	let title, message;

	if (score === questions.length) {
		title = 'Congratulations!'
		message = 'Your answers are correct for all questions!!!'
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Not bad!'
		message = 'You answered more than half of the questions!!!'
	} else {
		title = 'Study better!!!'
		message = 'You have less than half of the correct answers!!!'
	}

	let result = `${score} with ${questions.length}`

	// final answer
	const finalMessage = resultsTemplate
							.replace('%title%', title)
							.replace('%message%', message)
							.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

	// replace btn
	sumbitBtn.blur();
	sumbitBtn.innerText = 'Start again?';
	sumbitBtn.onclick = () => history.go();
}