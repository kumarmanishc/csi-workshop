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
    var currentIndex = 0;
    prepareTemplate(currentIndex);
});


function prepareTemplate(index) {
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

}


function displayRadioValue(nextIndex) {

    let selectedQuestion = questions[nextIndex - 1];

    var options = document.getElementsByName('answer');

    let selectedAnd = false;

    for (i = 0; i < options.length; i++) {
        if (options[i].checked) {
            selectedAnd = options[i];
        }
    }

    if (selectedQuestion.correctAnswer === selectedAnd.value) {
        console.log("Options are correct : ");
    } else {
        console.log('Wrong answer');
    }
    selectedQuestion.userOption = selectedAnd.value;
    userAns.push(selectedQuestion);

    if (nextIndex >= questions.length) {
        console.log("User Answers :", userAns);
        let successTemplate = `<li class="list-group-item"><button type="button" class="btn btn-info" onclick="displayResult()">Show Quiz Result</button></li>`;

        document.getElementById('quizwizard').innerHTML = "<b>Question is submitted successfully</b><br/>" + successTemplate;
    } else {
        prepareTemplate(nextIndex);
    }
} 