const images = document.querySelectorAll('.drag-img');
const targets = document.querySelectorAll('.drop-target');
const targets2 = document.querySelectorAll('.drop-target-letter');

// const requiredWords = ["zorina", "zar", "zahar", "azor"];
// let correctPlacements = {};

// // Initialize all as false
// requiredWords.forEach(word => {
//   correctPlacements[word] = false;
// });

// function checkAllPlacedCorrectly() {
//   return requiredWords.every(word => correctPlacements[word]);
// }

// function showLetterDropZones() {
//   document.querySelectorAll('.drop-target-letter').forEach(el => {
//     el.style.display = "inline";  // Or "inline-block" as needed
//   });
// }


images.forEach(img => {
  img.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.word);
    e.dataTransfer.setDragImage(e.target, 40, 40);
  });
});

targets.forEach(target => {
  target.addEventListener('dragover', (e) => {
    e.preventDefault();
    // target.style.backgroundColor = '#e0ffe0';
  });

  target.addEventListener('dragleave', () => {
    target.style.backgroundColor = '';
  });

  target.addEventListener('drop', (e) => {
    e.preventDefault();
    const droppedWord = e.dataTransfer.getData('text/plain');
    if (droppedWord === target.dataset.word) {
      target.textContent = '';
      const img = document.querySelector(`img[data-word="${droppedWord}"]`);
      // correctPlacements[droppedWord] = true;

      // if (checkAllPlacedCorrectly()) {
      //   showLetterDropZones();
      // }

    //img.style.display = 'none';
      const newImg = img.cloneNode();
    //   newImg.style.width = '40px';
      target.appendChild(newImg);
    //   target.style.backgroundColor = '#c8f7c5';
    } else {
    //   target.style.backgroundColor = '#f7c5c5';
    }
  });
});

targets2.forEach(target => {
  target.addEventListener('dragover', (e) => {
    e.preventDefault();
    // target.style.backgroundColor = '#e0ffe0';
  });

  target.addEventListener('dragleave', () => {
    target.style.backgroundColor = '';
  });

  target.addEventListener('drop', (e) => {
    e.preventDefault();
    const droppedWord = e.dataTransfer.getData('text/plain');
    if (droppedWord === target.dataset.word) {
      target.textContent = '';
      const img = document.querySelector(`img[data-word="${droppedWord}"]`);
    //img.style.display = 'none';
      const newImg = img.cloneNode();
    //   newImg.style.width = '40px';
      target.appendChild(newImg);
    //   target.style.backgroundColor = '#c8f7c5';
    } else {
    //   target.style.backgroundColor = '#f7c5c5';
    }
  });
});