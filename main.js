const questionArray = JSON.parse(JSON.stringify(data)).questions;

const _maxLength = questionArray.length;
let _idx = 0;

window.onload = function () {
    setQuestion();
}

function setQuestion() {
    if (_idx === _maxLength) {
        alert("문제가 더 이상 없습니다.");
        return;
    }

    const question = questionArray[_idx];
    _idx += 1;

    document.getElementById('inputText1').value = '';
    document.getElementById('inputText2').value = '';
    document.getElementById('inputText3').value = '';
    document.getElementById('inputText4').value = '';

    const title = document.getElementById("title");
    const targetText1 = document.getElementById("targetText1");
    const targetText2 = document.getElementById("targetText2");
    const targetText3 = document.getElementById("targetText3");
    const targetText4 = document.getElementById("targetText4");

    const titleContent = question.title;
    const targetText1Content = question.targetText1;
    const targetText2Content = question.targetText2;
    const targetText3Content = question.targetText3;
    const targetText4Content = question.targetText4;

    title.innerHTML = `<b>${titleContent}</b>`;

    targetText1.dataset.answer = targetText1Content;
    targetText1.innerText = targetText1Content;

    targetText2.dataset.answer = targetText2Content;
    targetText2.innerText = targetText2Content;

    targetText3.dataset.answer = targetText3Content;
    targetText3.innerText = targetText3Content;

    targetText4.dataset.answer = targetText4Content;
    targetText4.innerText = targetText4Content;
}

function pressEnter(idx) {
    if (window.event.keyCode === 13) {
        validateText(idx);
        window.event.preventDefault();
    }
}

function validateText(idx) {
    const inputText = document.getElementById(`inputText${idx}`);
    const targetText = document.getElementById(`targetText${idx}`);
    const result = document.getElementById(`result${idx}`);

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