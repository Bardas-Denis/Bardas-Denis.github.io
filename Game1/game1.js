const dropSuccess = new WeakMap();

interact('.drag-img').draggable({
  inertia: true,
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
      setTimeout(() => {
        if (!dropSuccess.get(event.target)) {
          event.target.style.transform = 'translate(0px, 0px)';
          event.target.removeAttribute('data-x');
          event.target.removeAttribute('data-y');
        }
    
        dropSuccess.set(event.target, false);
      }, 0); 
    }
  }
});

interact('.drop-target').dropzone({
  accept: '.drag-img',
  overlap: 'center',
  ondropactivate(event) {
    console.log("Dropzone activated");
  },
  ondrop(event) {
    const dropzone = event.currentTarget; // This is the actual drop zone element
    const draggable = event.relatedTarget;
    const word = draggable.dataset.word;
  
    if (dropzone.dataset.word === word) {
      const img = draggable;
      img.style.transform = 'none';
      img.removeAttribute('data-x');
      img.removeAttribute('data-y');
      img.style.cursor = 'default';
      img.setAttribute('draggable', false);  
      dropSuccess.set(draggable, true);
      dropzone.replaceWith(img); 
    }}
});
