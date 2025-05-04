const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');
const originalContainer = document.getElementById('draggable-container');

draggables.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });

  item.addEventListener('click', () => {
    if (item.parentElement.classList.contains('drop-zone')) {
      originalContainer.appendChild(item);
    }
  });
});

dropZones.forEach(zone => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const dragged = document.getElementById(id);
    if (zone.children.length > 0) {
      originalContainer.appendChild(zone.firstElementChild);
    }
    zone.appendChild(dragged);
  });
});
