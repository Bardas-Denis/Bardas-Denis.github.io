// Allow dropping on the target element
function allowDrop(event) {
    event.preventDefault();
}

// Handle the drag event
function drag(event) {
    event.dataTransfer.setData("text", event.target.id); // Store the dragged element's ID
}

// Handle touch start
function touchStart(event) {
    draggedElement = event.target;
}

// Handle touch move
function touchMove(event) {
    event.preventDefault();
    const touch = event.touches[0];
    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${touch.pageX - draggedElement.offsetWidth / 2}px`;
    draggedElement.style.top = `${touch.pageY - draggedElement.offsetHeight / 2}px`;
}

function touchEnd(event) {
    const dropZones = document.elementsFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    for (const zone of dropZones) {
        if (zone.classList.contains('drop-zone') && zone.textContent === '') {
            zone.textContent = draggedElement.textContent; // Set the letter in the drop zone
            //zone.classList.add('filled'); // Add a class to mark it filled
            //draggedElement.style.display = 'none'; // Hide the original letter
            draggedElement.style.position = 'static'; // Reset position
            return;
        }
    }
    // Reset the dragged element if no valid drop zone is found
    draggedElement.style.position = 'static';
}

// Handle the drop event
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text"); // Get the dragged element's ID
    const draggedElement = document.getElementById(data);
    const targetElement = event.target;

    // Only allow dropping into a drop-zone
    if (targetElement.classList.contains('drop-zone') || targetElement.classList.contains('drop-zone-basenji')) {
        targetElement.textContent = draggedElement.textContent; // Set the content of the drop zone

        const parentRow = targetElement.closest('.vowel-row'); // Find the nearest parent with class 'vowel-row'
        // targetElement.style.backgroundColor = "#11066f"; // Change color for feedback
        
        const dropZone = event.target;

        if (dropZone.classList.contains("drop-zone-basenji")) {
            targetElement.style.color = "red";
        }

        if(parentRow.classList.contains('a'))
        {
            targetElement.style.backgroundColor = "red";
        }else if (parentRow.classList.contains('e')) {
            targetElement.style.backgroundColor = "orange"; 
        } else if (parentRow.classList.contains('i')) {
            targetElement.style.backgroundColor = "yellow"; 
        } else if (parentRow.classList.contains('o')) {
            targetElement.style.backgroundColor = "#72b400"; 
        } else if (parentRow.classList.contains('u')) {
            targetElement.style.backgroundColor = "#6868ff"; 
        }else if (parentRow.classList.contains('ă')) {
            targetElement.style.backgroundColor = "#b702b7"; 
        } else if (parentRow.classList.contains('â')) {
            targetElement.style.backgroundColor = "#ff58c7"; 
        } else if (parentRow.classList.contains('î')) {
            targetElement.style.backgroundColor = "red"; 
        }
        
        targetElement.style.color = "#ffffff"
        // draggedElement.style.display = 'none'; // Hide the dragged element
    }
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('drop-zone') || event.target.classList.contains('drop-zone-basenji')) {
        const zone = event.target;

        // If the drop zone has a letter
        if (zone.textContent !== '') {
            // Clear the drop zone
            zone.textContent = ''; // Empty the drop zone
            zone.style.backgroundColor = "#ffffff";
        }
    }
});

function addEventListenersToLetters(letterElements) {
    letterElements.forEach(letter => {
        letter.addEventListener('touchstart', touchStart);
        letter.addEventListener('touchmove', touchMove);
        letter.addEventListener('touchend', touchEnd);
    });
}

// Generate the alphabet letters dynamically
function generateAlphabetSquares() {
    const alphabetContainer = document.querySelector('.alphabet');
    const alphabet = 'AĂÂBCDEFGHIÎJKLMNOPQRSTUVWXYZ';
    alphabet.split('').forEach(letter => {
        // Create a div for each letter in the alphabet
        const square = document.createElement('div');
        square.classList.add('alphabet-square');
        square.id = `letter-${letter}`; // Set a unique ID
        square.textContent = letter;
        square.setAttribute('draggable', 'true');
        square.setAttribute('ondragstart', 'drag(event)');
        alphabetContainer.appendChild(square);
    });
}

generateAlphabetSquares();
