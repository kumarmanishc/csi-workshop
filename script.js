
let questions = [
    {
        question: "What does CSS stand for?",
        answers: {
            a: 'Colorful Style Sheet',
            b: 'Cascading Style Sheets',
            c: 'Creative Style Sheets',
            d: 'Creative Style Sheets'
        },
        correctAnswer: 'b'
    },
    {
        question: "What is 10/2?",
        answers: {
            a: '3',
            b: '5'
        },
        correctAnswer: 'b'
    },
    {
        question: "What is 10x5",
        answers: {
            a: '3',
            b: '5',
            c: '50'
        },
        correctAnswer: 'c'
    }
];

let userAns = [];
$(document).ready(function () {
    var currentIndex = getCurrenIndex() ? getCurrenIndex() : 0;
    prepareTemplate(currentIndex);
});

function getCurrenIndex(params = 'currentQueIndex') {
    return parseInt(window.localStorage.getItem(params));
};


function getTime(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function startTimer(sec) {

    this.timer = setTimeout(() => {

        document.getElementById('time').innerHTML = `<span>${getTime(parseInt(sec / 60))}</span>:<span>${getTime(sec % 60)}</span>`;
        if (sec > 0) {
            window.localStorage.setItem('currentTime', sec);
            startTimer(sec - 1);
        } else {
            window.localStorage.removeItem('currentTime');
            let currentIndex = getCurrenIndex() + 1;
            prepareTemplate(currentIndex);
        }

    }, 1000);
}


function prepareTemplate(index) {

    if (questions.length > index) {
        clearTimeout(this.timer);
        window.localStorage.setItem('currentQueIndex', index);
        const currentQuestion = questions[index];

        document.getElementById('questionTitle').innerHTML = currentQuestion.question;

        const answer = currentQuestion.answers;

        const answersKeys = Object.keys(currentQuestion.answers);

        let template = '';

        answersKeys.forEach((ans, i) => {
            template += `<li class="list-group-item">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="answer${i + 1}" name="answer" value="${ans}" class="custom-control-input">
                                <label class="custom-control-label" for="answer${i + 1}">${answer[ans]}</label>
                            </div>
                        </li>`;
        });

        template += `<li class="list-group-item"><button type="button" class="btn btn-primary" onclick="displayRadioValue(${index + 1})">Submit</button></li>`;

        document.getElementById('quizwizard').innerHTML = template;
        let currentTime = getCurrenIndex('currentTime') ? getCurrenIndex('currentTime') : 10;
        startTimer(currentTime);
    } else {
        resetForm();
        window.localStorage.removeItem('currentQueIndex');

    }

}


function displayRadioValue(nextIndex) {
    window.localStorage.removeItem('currentTime');
    let selectedQuestion = questions[nextIndex - 1];

    var options = document.getElementsByName('answer');

    let selectedAnd = false;
    let isChecked = false;
    for (i = 0; i < options.length; i++) {
        if (options[i].checked) {
            isChecked = true;
            selectedAnd = options[i];
        }
    }
    if (!isChecked) {
        $("#myModal").modal('show');
        return;
    }
    selectedQuestion.isCorrect = selectedQuestion.correctAnswer === selectedAnd.value ? true : false;

    selectedQuestion.userOption = selectedAnd.value;
    userAns.push(selectedQuestion);

    if (nextIndex >= questions.length) {
       
        resetForm();
        
    } else {
        prepareTemplate(nextIndex);
    }
}

function resetForm(){
    clearTimeout(this.timer);
    document.getElementById('time').innerHTML = "";
    document.getElementById('questionTitle').innerHTML = "";
    window.localStorage.removeItem('currentQueIndex');

    console.log("User Answers :", userAns);
    let successTemplate = `<li class="list-group-item"><button type="button" class="btn btn-info" onclick="displayResult()">Show Quiz Result</button></li>`;
    document.getElementById('quizwizard').innerHTML = successTemplate;
}

function displayResult() {

    let attemptQue = userAns.length;
   let correctAnswer = userAns.filter((item)=>item.isCorrect).length;
   let totalQue =  questions.length;
   console.log("attemptQue",attemptQue);
   console.log("correctAnswer",correctAnswer);
   document.getElementById('totalQue').innerHTML = totalQue;
   document.getElementById('attemptQue').innerHTML = attemptQue;
   document.getElementById('correctAns').innerHTML = correctAnswer;

   $("#showResult").modal('show');
};