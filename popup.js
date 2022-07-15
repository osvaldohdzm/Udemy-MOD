

let clickExamBtn = document.getElementById("clickExam");

async function waitForElm(selector) {
    console.log("funcion...")   ;
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}


function countInArray(array, value) {
    return array.reduce((n, x) => n + (x === value), 0);
}

async function main() {
    var exams = document.querySelectorAll('div.quiz-editor--quiz-editor--2RKDC.default-item-editor--item-editor--3GhNq');
    console.log("Exams: " + exams.length);
    
    for (let j = 0; j < exams.length; j++) {
        var preguntas = exams[j].querySelectorAll('div.assessment-list--assessment-list--1sF23 > ul > li')
        console.log("Questions in exam " + (j + 1) + ": " + preguntas.length);
        document.querySelectorAll('div.quiz-editor--quiz-editor--2RKDC.default-item-editor--item-editor--3GhNq > div:nth-child(1) > div > div.item-bar--right--4qb_w.item-bar--row--3ZgKF > button')[j].click();
        var arr = [];
        for (let i = 0; i < preguntas.length; i++) {      
            var querySelector = 'div.assessment-list--assessment-list--1sF23 > ul > li:nth-child(' + (i + 1) + ') > div > button:nth-child(5)';             
            preguntas[i].querySelector(querySelector).click();
            querySelector = 'input[type=radio][data-purpose="knowledge-area-option-toggle"]:checked';  
            
            var item = document.querySelector(querySelector);
            while (item === null) {
                await new Promise(resolve => setTimeout(resolve, 200));
                item = document.querySelector(querySelector);
            };

            var selectedId = item.id;
            const knowledge_area = document.getElementById(selectedId).parentElement.parentElement.querySelector('input[data-purpose="knowledge-area-option-input"]').value.toUpperCase().normalize();
            arr.push(knowledge_area);
            document.querySelectorAll('div.quiz-editor--quiz-editor--2RKDC.default-item-editor--item-editor--3GhNq > div:nth-child(1) > div > div.item-bar--right--4qb_w.item-bar--row--3ZgKF > button')[j].click();
            console.log("Question " + (i + 1)+ " : "+ knowledge_area);

          
            
        };
        const count = {};
        arr.forEach(e => count[e] ? count[e]++ : count[e] = 1 );
        console.log(count);
    };

    return 0;
}


clickExamBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow:true}) 
    chrome.scripting.executeScript({ 
        target: {tabId: tab.id},
        func: main,
        args: [],
    } ,
    (injectionResults) => {
        console.log('Status: ' + injectionResults);
    } );
})