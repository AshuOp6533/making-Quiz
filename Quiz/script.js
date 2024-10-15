let arr = [
  {
    question: "Which type of JavaScript language is?",
    options: [
      "Object-Oriented",
      "Object-Based",
      "Assembly-language",
      "High-level",
    ],
    answer: "Object-Based",
  },
  {
    question:
      "Which one of the following is also known as Conditional Expression?",
    options: [
      "Alternative",
      "Switch statement",
      "If-then-else",
      "Ternary operator",
    ],
    answer: "Ternary operator",
  },
  {
    question: "In JavaScript, what is a block of statement?",
    options: [
      "Conditional block",
      "Compound statement",
      "Block statement",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "When the interpreter encounters an empty statement, what will it do?",
    options: [
      "Throw an error",
      "Ignore it",
      "Execute the next statement",
      "None of the above",
    ],
    answer: "Ignore it",
  },
  {
    question: "The 'function' and 'var' are known as:",
    options: ["Keywords", "Data types", "Variables", "Statements"],
    answer: "Keywords",
  },
  {
    question: "Which of the following is a JavaScript Data Type?",
    options: ["String", "Boolean", "Null", "All of the above"],
    answer: "All of the above",
  },
  {
    question:
      "Which method is used to convert a JSON string into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.toObject()",
      "JSON.object()",
    ],
    answer: "JSON.parse()",
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    options: ["=", "==", "===", ":="],
    answer: "=",
  },
  {
    question:
      "What will be the output of the following code: console.log(typeof NaN)?",
    options: ["number", "undefined", "object", "NaN"],
    answer: "number",
  },
  {
    question: "Which of the following is NOT a JavaScript framework?",
    options: ["Express", "Node", "Django", "Angular"],
    answer: "Django",
  },
  {
    question:
      "Which method can be used to round a number to the nearest integer in JavaScript?",
    options: ["Math.floor()", "Math.ceil()", "Math.round()", "Math.trunc()"],
    answer: "Math.round()",
  },
  {
    question: "Which of the following is a looping structure in JavaScript?",
    options: ["for", "if", "switch", "try"],
    answer: "for",
  },
  {
    question: "What will the following code return: Boolean(10 > 9)?",
    options: ["true", "false", "undefined", "null"],
    answer: "true",
  },
  {
    question: "Which symbol is used for single line comment in JavaScript?",
    options: ["//", "#", "/* */", "<!-- -->"],
    answer: "//",
  },
  {
    question:
      "Which JavaScript method is used to access an HTML element by its id?",
    options: [
      "getElementByClassName()",
      "getElementByTagName()",
      "getElementById()",
      "querySelector()",
    ],
    answer: "getElementById()",
  },
  {
    question: "What does 'this' keyword refer to in JavaScript?",
    options: [
      "The current object",
      "The previous object",
      "The parent object",
      "None of the above",
    ],
    answer: "The current object",
  },
  {
    question:
      "Which of the following function definitions is valid in JavaScript?",
    options: [
      "function myFunction() {}",
      "def myFunction() {}",
      "func myFunction() {}",
      "Function myFunction {}",
    ],
    answer: "function myFunction() {}",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onmouseclick", "onchange", "onclick", "onhover"],
    answer: "onclick",
  },
  {
    question: "Which of the following is a JavaScript object method?",
    options: ["toString()", "parseInt()", "indexOf()", "charAt()"],
    answer: "toString()",
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: [
      "var carName;",
      "variable carName;",
      "v carName;",
      "declare carName;",
    ],
    answer: "var carName;",
  },
];

function getRandom(arr, num) {
  const selectedQues = new Set();
  while (selectedQues.size < num) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    selectedQues.add(arr[randomIndex]);
  }
  return Array.from(selectedQues);
}

let randomQuestions = getRandom(arr, 5);
let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
  const quizContainer = document.getElementById("quiz");
  const questionListContainer = document.getElementById("question-list");
  const questionObj = randomQuestions[currentQuestionIndex];
  let optionsHtml = "";

  for (const option of questionObj.options) {
    optionsHtml += `<label class="option">
        <input type="radio" name="option" value="${option}" />
        ${option}
    </label>`;
  }

  quizContainer.innerHTML = `<h2>${questionObj.question}</h2>
    <div id="options">${optionsHtml}</div>`;

  questionListContainer.innerHTML = randomQuestions
    .map((_, index) => {
      return `<button class="question-number" data-index="${index}">${
        index + 1
      }</button>`;
    })
    .join(" ");

  document.getElementById("next").disabled = true;

  document.getElementById("previous").style.display =
    currentQuestionIndex === 0 ? "none" : "inline-block";
  document.getElementById("next").style.display =
    currentQuestionIndex === randomQuestions.length - 1
      ? "none"
      : "inline-block";
  document.getElementById("submit").style.display =
    currentQuestionIndex === randomQuestions.length - 1
      ? "inline-block"
      : "none";

  const radioButtons = document.querySelectorAll('input[name="option"]');
  radioButtons.forEach((rb) => {
    rb.addEventListener("change", () => {
      document.getElementById("next").disabled = false;
    });
  });

  const questionNumberButtons = document.querySelectorAll(".question-number");
  questionNumberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentQuestionIndex = parseInt(button.getAttribute("data-index"));
      displayQuestion();
    });
  });
}

function handleNextButtonClick() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    if (selectedOption.value === randomQuestions[currentQuestionIndex].answer) {
      score++;
      console.log(score);
      
    }
    currentQuestionIndex++;
    displayQuestion();
  }
}

function handlePreviousButtonClick() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

function showResults() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = "";
  const questionListContainer = document.getElementById("question-list");
  questionListContainer.innerHTML = "";
  const resultDiv = document.getElementById("result");
  const scorePercent = (score / randomQuestions.length) * 100;
  const qualificationMessage =
    scorePercent >= 60 ? "You are qualified!" : "You are not qualified.";
  resultDiv.innerHTML = `<h2>You Scored: ${scorePercent}%</h2>
                         <h3>${qualificationMessage}</h3>`;
  resultDiv.style.display = "block";
  document.getElementById("next").style.display = "none";
  document.getElementById("previous").style.display = "none";
  document.getElementById("submit").style.display = "none";
}

function handleSubmitClick() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    if (selectedOption.value === randomQuestions[currentQuestionIndex].answer) {
      score++;
      console.log(score);
      
    }
  }
  showResults();
}

displayQuestion();
document
  .getElementById("next")
  .addEventListener("click", handleNextButtonClick);
document
  .getElementById("previous")
  .addEventListener("click", handlePreviousButtonClick);
document.getElementById("submit").addEventListener("click", handleSubmitClick);
