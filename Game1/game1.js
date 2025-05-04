const images = document.querySelectorAll('.drag-img');
const targets = document.querySelectorAll('.drop-target');

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