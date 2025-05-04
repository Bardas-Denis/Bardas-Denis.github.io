function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const sentenceMatch = draggedElement.getAttribute("data-match");
    const imageMatch = ev.target.parentElement.getAttribute("data-match");

    if (sentenceMatch === imageMatch) {
      ev.target.appendChild(draggedElement);
      draggedElement.style.cursor = "default";
      draggedElement.setAttribute("draggable", false);
      checkWin();
    } 
  }

//   function checkWin() {
//     const allZones = document.querySelectorAll(".drop-zone");
//     const allFilled = Array.from(allZones).every(zone => zone.children.length > 0);

//     if (allFilled) {
//       alert("Congratulations! You matched all correctly!");
//     }
//   }