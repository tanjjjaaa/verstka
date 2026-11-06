const questions = [
    {
        text: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        answers: [
            { text: "Пол деревни, за раз", correct: false },
            { text: "Полдеревни, зараз", correct: true },
            { text: "Пол-деревни, за раз", correct: false }
        ],
        explanation: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом."
    },
    {
        text: "А эти слова как пишутся?",
        answers: [
            { text: "Капуччино и эспрессо", correct: false },
            { text: "Каппуччино и экспресо", correct: false },
            { text: "Капучино и эспрессо", correct: true }
        ],
        explanation: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо»."
    },
    {
        text: "Как нужно писать?",
        answers: [
            { text: "Черезчур", correct: false },
            { text: "Черес-чур", correct: false },
            { text: "Чересчур", correct: true }
        ],
        explanation: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур»."
    },
    {
        text: "Где допущена ошибка?",
        answers: [
            { text: "Аккордеон", correct: false },
            { text: "Белиберда", correct: false },
            { text: "Эпелепсия", correct: true }
        ],
        explanation: "Верно! Это слово пишется так: «эпИлепсия»."
    },
    {
        text: "В каких предложениях слово «одевать» употреблено правильно с точки зрения литературной нормы?",
        answers: [
            { text: "Мама одевает ребёнка перед прогулкой.", correct: true },
            { text: "Он одевает пальто и выходит на улицу.", correct: false },
            { text: "Стилист одевает клиента перед фотосессией.", correct: true },
            { text: "Она одевает шапку и бежит на работу", correct: false }
        ],
        explanation: "Правильно. Глагол «одевать» — переходный: он употребляется, когда кто-то одевает кого-то другого (ребёнка, клиента)."
    }
];

const WAIT_BEFORE_LEAVE = 2000; 
const STEP = 450;
const MOVE = 900;

const area = document.getElementById("area");
const finishText = document.getElementById("finish");
const statsText = document.getElementById("stats");

const order = shuffle(questions);
let current = 0;
let correctCount = 0;
const questionBlocks = [];

function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function showQuestion() {
    const q = order[current];

    const column = document.createElement("div");
    column.className = "column";

    const qBlock = document.createElement("div");
    qBlock.className = "question";
    qBlock.textContent = (current + 1) + ". " + q.text;
    column.appendChild(qBlock);

    const reveal = createReveal(q);
    column.appendChild(reveal);

    questionBlocks.push({ qBlock, reveal });

    const answersBox = document.createElement("div");
    answersBox.className = "column";
    const answers = shuffle(q.answers);

    answers.forEach(function (a) {
        const aBlock = document.createElement("div");
        aBlock.className = "answer";
        aBlock.textContent = a.text;

        if (a.correct) {
            const explain = document.createElement("span");
            explain.className = "answer__explain";
            explain.textContent = q.explanation;
            aBlock.appendChild(explain);
        }

        aBlock.addEventListener("click", function () {
            chooseAnswer(a, aBlock, answersBox, qBlock);
        });

        answersBox.appendChild(aBlock);
    });

    column.appendChild(answersBox);
    area.appendChild(column);
}

function createReveal(q) {
    const reveal = document.createElement("div");
    reveal.className = "reveal";

    const rightAnswers = q.answers
        .filter(function (a) { return a.correct; })
        .map(function (a) { return a.text; });

    const answerP = document.createElement("p");
    answerP.className = "reveal__answer";
    answerP.textContent = "Правильный ответ: " + rightAnswers.join(" / ");

    const explainP = document.createElement("p");
    explainP.className = "reveal__explain";
    explainP.textContent = q.explanation;

    reveal.appendChild(answerP);
    reveal.appendChild(explainP);
    return reveal;
}

function chooseAnswer(answer, aBlock, answersBox, qBlock) {
    if (answersBox.classList.contains("answers-locked")) return;
    answersBox.classList.add("answers-locked");
    aBlock.classList.add("selected");

    const blocks = Array.from(answersBox.children);
    let leaveOrder;

    if (answer.correct) {
        correctCount++;
        aBlock.classList.add("correct");
        leaveOrder = blocks.filter(function (b) { return b !== aBlock; });
        leaveOrder.push(aBlock);
    } else {
        leaveOrder = blocks;
    }

    setTimeout(function () {
        leaveOrder.forEach(function (b, i) {
            b.style.setProperty("--i", i);
            b.classList.add("leave");
        });

        const leaveTime = (leaveOrder.length - 1) * STEP + MOVE;

        setTimeout(function () {
            answersBox.remove();
            const mark = document.createElement("span");
            if (answer.correct) {
                mark.className = "mark ok";
                mark.textContent = " ✔";
            } else {
                mark.className = "mark bad";
                mark.textContent = " ✘";
            }
            qBlock.appendChild(mark);
            setTimeout(nextQuestion, 600);
        }, leaveTime);
    }, WAIT_BEFORE_LEAVE);
}

function nextQuestion() {
    current++;
    if (current < order.length) {
        showQuestion();
    } else {
        finishTest();
    }
}

function finishTest() {
    finishText.classList.add("show");
    statsText.textContent = "Правильных ответов: " + correctCount + " из " + order.length;
    statsText.classList.add("show");
    questionBlocks.forEach(function (item) {
        item.qBlock.classList.add("clickable");

        item.qBlock.addEventListener("click", function () {
            const isOpen = item.reveal.classList.contains("show");

            questionBlocks.forEach(function (other) {
                other.reveal.classList.remove("show");
                other.qBlock.classList.remove("selected");
            });

            if (!isOpen) {
                item.reveal.classList.add("show");
                item.qBlock.classList.add("selected");
            }
        });
    });
}
showQuestion();