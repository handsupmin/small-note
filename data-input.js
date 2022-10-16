const questionArray = JSON.parse(JSON.stringify(data)).questions;

function inputData() {
    const title = document.getElementById("title");
    const subTitle = document.getElementById("sub-title");
    const targetText = document.getElementById("target-text");

    let newData = {
        "title" : title.value.replace(/\n/gi, "\n"),
        "subTitle" : subTitle.value.replace(/\n/gi, "\n"),
        "targetText" : targetText.value.replace(/\n/gi, "\n"),
    };

    questionArray.push(newData);

    title.value = "";
    subTitle.value = "";
    targetText.value = "";
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([`data = { "questions" : ${JSON.stringify(content)} }`], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function saveJson() {
    download(questionArray, "question-data.json", "text/javascript");
}
