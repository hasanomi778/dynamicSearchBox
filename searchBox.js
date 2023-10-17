document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("search-input");
    const searchExample = document.getElementById("searchExample");

    inputField.addEventListener("click", function() {
        searchExample.classList.add('show');
    });
    
    document.addEventListener("click", function(event) {
        if (event.target !== inputField && event.target !== searchExample) {
            searchExample.classList.remove('show');
        }
    });

    const searchExamples = document.querySelectorAll(".searchExample li");
    let currentIndex = 0;

    function typeWriterEffect(text, index, speed) {
        if (index < text.length) {
            inputField.placeholder = text.substring(0, index + 1);
            setTimeout(function() {
                typeWriterEffect(text, index + 1, speed);
            }, speed);
        } else {
            setTimeout(function() {
                backspaceEffect(text.length, 15);
            }, 1000);
        }
    }

    function backspaceEffect(length, speed) {
        if (length >= 0) {
            inputField.placeholder = searchExamples[currentIndex].textContent.substring(0, length);
            setTimeout(function() {
                backspaceEffect(length - 1, speed);
            }, speed);
        } else {
            currentIndex = (currentIndex + 1) % searchExamples.length;
            setTimeout(function() {
                typeWriterEffect(searchExamples[currentIndex].textContent, 0, 60);
            }, 500);
        }
    }

    function handleArrowKeys(event) {
        if (event.key === "ArrowUp") {
            currentIndex = (currentIndex - 1 + searchExamples.length) % searchExamples.length;
            updateInputValue();
        } else if (event.key === "ArrowDown") {
            currentIndex = (currentIndex + 1) % searchExamples.length;
            updateInputValue();
        }
    }

    function updateInputValue() {
        const selectedLi = searchExamples[currentIndex];
        const liText = selectedLi.textContent;
        inputField.value = liText;

        searchExamples.forEach(function(li) {
            li.classList.remove("active");
        });

        selectedLi.classList.add("active");
    }

    document.addEventListener("keydown", function(event) {
        if (searchExample.classList.contains("show")) {
            handleArrowKeys(event);
        }
    });

    searchExamples.forEach(function(li, index) {
        li.addEventListener("click", function() {
            const liText = li.textContent;
            inputField.value = liText;
            searchExample.classList.remove('show');
            updateInputValue();
        });
    });

    typeWriterEffect(searchExamples[currentIndex].textContent, 0, 60);
});