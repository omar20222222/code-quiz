const questions = [
  {
    title: "What does CSS stand for?",
    correctOption: "Cascading Style Sheets",
    options: [
      "Creative Style Sheets",
      "Compact Style Sheets",
      "Cascading Style Sheets",
    ],
  },
  {
    title: "Choose the correct HTML tag for the largest heading",
    correctOption: "<h1></h1>",
    options: ["<heading>", "<h6>", "<h1></h1>"],
  },
  {
    title: "Where is the correct place to insert a JavaScript?",
    correctOption: "Both the <head> section and the <body> section are correct",
    options: [
      "The <body> section",
      "The <head> section",
      "Both the <head> section and the <body> section are correct",
    ],
  },
  {
    title: "How do you create a function in JavaScript?",
    correctOption: "function myFunction{}",
    options: [
      "function myFunction{}",
      "function myFunction{}",
      "function:myFunction()",
    ],
  },
  {
    title: "How does a WHILE loop start?",
    correctOption: "while (i<=10)",
    options: ["while i = 1 to 10", "while (i<=10)", "while (i<=10;i ++)"],
  },
];
let currentQuestionIndex = 0;
let count = questions.length * 5;

const constructOptions = function (options) {
  const optionsContainer = document.createElement("div");
  optionsContainer.setAttribute("class", "options-container");

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    // create my button
    const optionButton = document.createElement("button");
    optionButton.setAttribute("class", "option-item");
    optionButton.setAttribute("name", "option");
    optionButton.setAttribute("data-option", option);
    optionButton.textContent = option;

    optionsContainer.appendChild(optionButton);
  }

  return optionsContainer;
};

const constructAlert = function (className, text) {
  // construct div
  const alertDiv = document.createElement("div");
  alertDiv.setAttribute("class", className);
  alertDiv.textContent = text;

  return alertDiv;
};

const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
  }
};

const storeScore = function () {
  // get count value
  const score = count;

  // get user initials from input
  const initials = document.getElementById("user-initials").value;

  // construct score object
  const scoreObject = {
    score: score,
    initials: initials,
  };

  const highscores = getFromLocalStorage("highscores", []);

  // insert the score object
  highscores.push(scoreObject);

  localStorage.setItem("highscores", JSON.stringify(highscores));
};

const constructForm = function () {
  const divContainer = document.createElement("div");
  divContainer.setAttribute("class", "container score-form");

  const form = document.createElement("form");

  const h2Element = document.createElement("h2");
  h2Element.setAttribute("class", "question");
  h2Element.textContent = "Your score is " + count;

  const formContainer = document.createElement("div");
  formContainer.setAttribute("class", "form-container");

  const formInputDiv = document.createElement("div");
  formInputDiv.setAttribute("class", "form-item");

  const formInput = document.createElement("input");
  formInput.setAttribute("placeholder", "Enter your initials");
  formInput.setAttribute("id", "user-initials");

  const formButtonDiv = document.createElement("div");
  formButtonDiv.setAttribute("class", "form-item");

  const formButton = document.createElement("button");
  formButton.setAttribute("class", "btn");
  formButton.textContent = "Submit";

  formInputDiv.append(formInput);
  formButtonDiv.append(formButton);

  formContainer.append(formInputDiv, formButtonDiv);

  form.append(h2Element, formContainer);
  divContainer.append(form);

  form.addEventListener("submit", storeScore);

  return divContainer;
};

const renderSuccessAlert = function () {
  // construct alert
  const alert = constructAlert("answer-alert answer-alert-correct", "correct!");

  // append the alert to the document
  document.getElementById("alert-container").appendChild(alert);

  // declare a timeout function (to remove the element)
  const afterWait = function () {
    // remove alert
    alert.remove();

    // kill timeout
    clearTimeout(delay);
  };

  // start a timeout (delay)
  const delay = setTimeout(afterWait, 1000);
};

const renderDangerAlert = function () {
  // construct alert
  const alert = constructAlert("answer-alert answer-alert-incorrect", "Wrong!");

  // append the alert to the document
  document.getElementById("alert-container").appendChild(alert);

  const afterWait = function () {
    // remove alert
    alert.remove();

    // kill timeout
    clearTimeout(delay);
  };

  // start a timeout (delay)
  const delay = setTimeout(afterWait, 1000);
};

const renderScoreForm = function () {
  // remove the last question
  removeQuestionSection();

  // construct score form
  const form = constructForm();

  // append form to document
  document.getElementById("main-container").append(form);
};

const verifyAnswer = function (event) {
  const target = event.target;
  const currentTarget = event.currentTarget;

  // check if click is from button ONLY
  if (target.getAttribute("name") === "option") {
    // get the option user clicked on
    const userOption = target.getAttribute("data-option");

    // get the correct option for the question
    const correctOption = currentTarget.getAttribute("data-correct");

    // verify the 2
    if (userOption !== correctOption) {
      // time penalty deduct 5 seconds
      count -= 5;
      renderDangerAlert();
      if (count > 0) {
        document.getElementById("countdown").textContent = count;
      } else {
        document.getElementById("countdown").textContent = 0;
      }
    } else {
      renderSuccessAlert();
    }

    // go to next question 0 1 2 (3)
    currentQuestionIndex += 1;

    // check if last question
    if (currentQuestionIndex < questions.length) {
      // render the next question
      removeQuestionSection();
      renderQuestionSection();
    } else {
      if (count > 0) {
        renderScoreForm();
      } else {
        removeQuestionSection();
        renderGameOver();
      }
    }
  }
};

const constructQuestionSection = function (question) {
  // construct container div
  const questionSection = document.createElement("div");
  questionSection.setAttribute("class", "container question-container");
  questionSection.setAttribute("id", "question-container");
  questionSection.setAttribute("data-correct", question.correctOption);

  // construct h2 element
  const questionH2 = document.createElement("h2");
  questionH2.setAttribute("class", "question");
  questionH2.textContent = question.title;

  // construct options div
  const options = constructOptions(question.options);

  // appending h2 and options div to container div
  questionSection.append(questionH2, options);

  // add event listener to listen for click events
  questionSection.addEventListener("click", verifyAnswer);

  return questionSection;
};

// render question container
const renderQuestionSection = function () {
  // get the current question
  const currentQuestion = questions[currentQuestionIndex];

  // construct the HTML for the question container
  const questionSection = constructQuestionSection(currentQuestion);

  // append the container to the document
  document.getElementById("main-container").appendChild(questionSection);
};

const removeStartContainer = function () {
  // target start container
  const startContainer = document.getElementById("start-container");
  // remove from document
  startContainer.remove();
};

const removeQuestionSection = function () {
  // target question container
  const questionSection = document.getElementById("question-container");
  // remove from document
  questionSection.remove();
};

const renderGameOver = function () {
  const divContainer = document.createElement("div");
  divContainer.setAttribute("class", "container game-over");

  const h2Element = document.createElement("h2");
  h2Element.textContent = "GAME OVER";

  divContainer.append(h2Element);

  document.getElementById("main-container").append(divContainer);
};

const startTimer = function () {
  // declare the timer tick function
  const timerTick = function () {
    if (currentQuestionIndex >= questions.length) {
      clearInterval(timer);
    } else if (count < 0) {
      clearInterval(timer);
      removeQuestionSection();
      renderGameOver();
    } else {
      document.getElementById("countdown").textContent = count;
      count -= 1;
    }
  };

  // declare the timer
  const timer = setInterval(timerTick, 1000);
};

const initialLocalStorage = function () {
  const dataFromLS = JSON.parse(localStorage.getItem("highscores"));

  if (!dataFromLS) {
    localStorage.setItem("highscores", JSON.stringify([]));
  }
};

// function to execute when start button is called
const startQuiz = function () {
  // initialize local storage
  initialLocalStorage();

  // remove start container
  removeStartContainer();

  // render question container
  renderQuestionSection();

  // start timer
  startTimer();
};

// target the start quiz button
const startButton = document.getElementById("start-quiz");

// add a click event listener and start quiz
startButton.addEventListener("click", startQuiz);
