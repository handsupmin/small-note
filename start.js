try {
    var tryParseJson = JSON.parse(JSON.stringify(data)).questions;
}
catch (error) {
    alert("문제 파일이 없습니다. 파일 생성 후 다시 시도해주세요.");
}

const questionArray = tryParseJson;
const _maxLength = questionArray.length;
let _idx = -1;

window.onload = function () {
    if (_maxLength === 0) {
        alert("문제가 없습니다. 문제 추가 후 다시 시도해주세요.");
        return;
    }

    setQuestion(1);
    document.getElementById("max-idx").innerText = " / " + _maxLength;
}

function setQuestion(order) {
    _idx += order;

    if (order === -1 && _idx === -1) {
        alert("이전 문제가 없습니다.");
        _idx = 0;
        return;
    }

    if (_idx === _maxLength) {
        alert("다음 문제가 없습니다.");
        _idx = _maxLength - 1;
        return;
    }

    const question = questionArray[_idx];

    document.getElementById("current-idx").innerText = _idx + 1;
    document.getElementById("input-text").value = "";

    const title = document.getElementById("title");
    const subTitle = document.getElementById("sub-title");
    const targetText = document.getElementById("target-text");

    const titleContent = question.title;
    const subTitleContent = question.subTitle;
    const targetTextContent = question.targetText;

    title.innerHTML = `<b>${titleContent}</b>`;
    subTitle.innerText = subTitleContent;

    targetText.dataset.answer = targetTextContent;
    targetText.innerText = targetTextContent;

    targetText.classList.remove("hidden");
    targetText.dataset.isQna = "false";
}

function moveQuestion() {
    targetIdx = document.getElementById("move-page").value;

    if (targetIdx < 1 || targetIdx > _maxLength) {
        alert("문제 수를 벗어났습니다.");
        return;
    }

    _idx = document.getElementById("move-page").value - 1;
    document.getElementById("move-page").value = "";
    setQuestion(0);
}

function validateNum() {
    inputKeyCode = window.event.keyCode;

    if (!(inputKeyCode >= 48 && inputKeyCode <= 57 || inputKeyCode == 8 || inputKeyCode == 46 || inputKeyCode == 37 || inputKeyCode == 39)) {
        window.event.preventDefault();
        return;
    }
}

function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = (12 + obj.scrollHeight) + "px";
}

function quickSearch() {
    if (window.event.keyCode === 13) {
        moveQuestion();
        window.event.preventDefault();
    }
}

function validateText() {
    const inputText = document.getElementById("input-text");
    const targetText = document.getElementById("target-text");
    const result = document.getElementById("result");

    if (targetText.dataset.answer === "") {
        result.style.color = "green";
        result.innerHTML = "입력하지 않아도 됩니다";
        inputText.value = "";
    } else if (targetText.dataset.isQna === "false") {
        if (inputText.value === targetText.dataset.answer) {
            result.style.color = "green";
            result.innerHTML = "암기 시작!";
            inputText.value = "";
            targetText.dataset.isQna = "true";
            targetText.classList.add("hidden");
        } else {
            result.style.color = "red";
            result.innerHTML = "다시 입력해주세요";
            inputText.focus()
        }
    } else {
        if (inputText.value === targetText.dataset.answer) {
            result.style.color = "blue";
            result.innerHTML = "정답입니다";
        } else {
            result.style.color = "red";
            result.innerHTML = "오답입니다";
        }

        targetText.classList.remove("hidden");
        targetText.dataset.isQna = "false";
    }

    result.style.opacity = 1;

    setTimeout(() => {
        fadeOut(result)
    }, 1000)
}

function fadeOut(element) {
    const fadeTarget = element;

    const fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);
}