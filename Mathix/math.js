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
    if (targetElement.classList.contains('drop-zone')) {
        targetElement.textContent = draggedElement.textContent; // Set the content of the drop zone
        targetElement.style.backgroundColor = "#6868ff"; // Change color for feedback
        targetElement.style.color = "#ffffff"
        // draggedElement.style.display = 'none'; // Hide the dragged element
    }
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('drop-zone')) {
        const zone = event.target;

        // If the drop zone has a letter
        if (zone.textContent !== '') {
            // Clear the drop zone
            zone.textContent = ''; // Empty the drop zone
            zone.style.backgroundColor = "#ddd";
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


function generateNumberSquares() {
    const alphabetContainer = document.querySelector('.numbers');
    const alphabet = '1234567890+-*/=';
    alphabet.split('').forEach(number => {
        // Create a div for each letter in the alphabet
        const square = document.createElement('div');
        square.classList.add('number-square');
        square.id = `number-${number}`; // Set a unique ID
        square.textContent = number;
        square.setAttribute('draggable', 'true');
        square.setAttribute('ondragstart', 'drag(event)');
        alphabetContainer.appendChild(square);
    });
}

generateNumberSquares();
