// Snag our button
let btn = document.getElementById("changeFont")
let clickExamBtn = document.getElementById("clickExam")

// Set our button's color to the color that we stored
chrome.storage.sync.get("color", ({color}) => {
    btn.style.backgroundColor = color
})

// Run on click
btn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow:true}) // Find current tab

    chrome.scripting.executeScript({ // Run the following script on our tab
        target: {tabId: tab.id},
        function: () => {
            let elems = document.querySelectorAll("*"); // Grab every element in the dom
            for (var i = 0;i < elems.length; i++){ 
                elems[i].style.fontFamily = "Comic Sans MS";
            }
        }
    })
})

clickExamBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow:true}) // Find current tab

    chrome.scripting.executeScript({ // Run the following script on our tab
        target: {tabId: tab.id},
        function: () => {
            var exams = document.querySelectorAll('li[class*="s-curriculum-item-draggable curriculum-list--list-item--MB8ip curriculum-list--non-section-item--2ilUv"]');
            console.log("Examenes: "+exams.length);
            exams.forEach(element => {
                console.log("Preguntas: "+ element.querySelectorAll('li[data-purpose*="assessment-list-item"]').length);
                
            });

        }
    })
})
