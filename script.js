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

$(document).ready(function () {
    var currentIndex = 2;
    var currentQuestion = questions[0];
    console.log(currentQuestion);   
    prepareTemplate(currentIndex);
});


function prepareTemplate(index) {
    const currentQuestion = questions[index];
    console.log(currentQuestion);
    document.getElementById('questionTitle').innerHTML = currentQuestion.question;

    const template = `<li class="list-group-item">
                        <div class="custom-control custom-radio">
                            <input type="radio" id="answer1" name="answer" value="1" class="custom-control-input">
                            <label class="custom-control-label" for="answer1">Colorful Style Sheet</label>
                        </div>
                    </li>`;
}


function displayRadioValue() {
    var ele = document.getElementsByName('answer');
    console.log('Ans', ele);
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) { 
            console.log(ele[i].value);
        }
            // document.getElementById("result").innerHTML
            //     = "Gender: " + ele[i].value;
    }
} 