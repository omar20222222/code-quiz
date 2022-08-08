root {
  --background: gray;
  --hover: pink;
}

* {
  box-sizing: border-box;
}

body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background-color: white;
  text-align: center;
}

.header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 20px;
  background-color: lightgray;
  padding: 20px;
}

.timer {
  display: flex;
  align-items: center;
  width: 100px;
  height: 45px;
  
  font-weight: 400;
  font-size: 20px;
  margin-top: 15px;
}


.start-btn button {
  font-size: 25px;
  font-weight: 300;
  padding: 10px;
  margin-top: 10px;
  outline: none;
  border: solid;
  border-color: black;
  border-radius: 10px;
  
}

.start-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 25px;
  border-radius: 5px;
  text-align: center;
  margin: 60px;
  max-height: 500px;
  padding: 50px;
}

.question-container {
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  border-style: solid;
  border-color: var(--border);
  border-radius: 5px;
  text-align: center;
  margin: 40px;
  padding: 40px;
  align-items: center;
}

.question-container .question-text {
  font-size: 25px;
  font-weight: 500;
}

.question-container .option-item {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background: whitesmoke;
  border: 1px;
  border-style: solid;
  border-color: var(--border);
  border-radius: 7px;
  margin: 1rem;
  padding: 1rem;
}

.option-item:hover {
  background: #cce5ff;
  border-color: var(--border);
  cursor: pointer;
}

.option-item:active {
  background-color: pink ;
}


.answer-alert-correct {
  position: relative;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: lightgreen;
}

.answer-alert-incorrect {
  position: relative;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: red;
}


.btn, .buttons button {
  margin: 20px;
  height: 30px;
  padding: 0px 13px;
}

.btn:hover {
  background-color: pink;
  border-color: var(--border);
  cursor: pointer;
}


.game-over {
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  width: 500px;
  margin: 20px 200px;
  padding: 25px 30px;
  border-radius: 15px;
  text-align: center;
}


.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
