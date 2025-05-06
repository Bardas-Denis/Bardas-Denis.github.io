// Keep track of successful drop
const dropSuccess = new WeakMap();
  
interact('.draggable').draggable({
  inertia: true,
  modifiers: [
    interact.modifiers.restrict({
      restriction: 'body', // Restrict within body for better control
      endOnly: true
    })
  ],
  listeners: {
    move(event) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },
    end(event) {
      if (!dropSuccess.get(event.target)) {
        // If not dropped successfully, reset position
        event.target.style.transform = 'translate(0px, 0px)';
        event.target.removeAttribute('data-x');
        event.target.removeAttribute('data-y');
      }

      // Reset drop success state
      dropSuccess.set(event.target, false);
    }
  }
});

interact('.drop-zone').dropzone({
  accept: '.draggable',
  overlap: 0.75,
  ondrop(event) {
    const dragged = event.relatedTarget;
    const dropzone = event.target;

    // Return previous item if present
    if (dropzone.firstElementChild) {
      const existing = dropzone.firstElementChild;
      // Reset styles before returning to original container
      resetDraggableStyles(existing);
      document.getElementById('draggable-container').appendChild(existing);
    }

    dropzone.appendChild(dragged);

    // Clear transforms and reset inline styles
    dragged.style.transform = 'none';
    dragged.removeAttribute('data-x');
    dragged.removeAttribute('data-y');

    // Make image fit inside zone
    dragged.style.position = 'static';
    dragged.style.width = '100%';
    dragged.style.height = '100%';
    dragged.style.objectFit = 'cover';

    // Mark as successful drop
    dropSuccess.set(dragged, true);
  }
});

// Click to return image to top
document.querySelectorAll('.draggable').forEach(item => {
  item.addEventListener('click', () => {
    if (item.parentElement.classList.contains('drop-zone')) {
      document.getElementById('draggable-container').appendChild(item);
      // Restore original size and clear styling
      resetDraggableStyles(item);
    }
  });
});
function resetDraggableStyles(el) {
  el.style.width = '150px';
  el.style.height = '150px';
  el.style.objectFit = '';
  el.style.position = 'static';
  el.style.transform = 'translate(0px, 0px)';
  el.removeAttribute('data-x');
  el.removeAttribute('data-y');
}