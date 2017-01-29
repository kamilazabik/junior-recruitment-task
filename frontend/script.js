/**
 * Funkcja dodająca nowe zadanie do tabeli
 *
 * @param {string} param - wartość elementu input
 * @param {string} done - wartość pola obiektu localStorage
 */

function addRow(param, done){
    var table = document.getElementById('toDoList')
      , input = document.getElementById('task')
      , numberOfRows =table.rows.length- 1
      , numberOfCells =table.rows[0].cells.length
      , newInput = document.createElement('input')
      , image =  document.createElement('img')
      , nameTask = document.createElement('p')
      , nameClass =  done;

    table.insertRow(numberOfRows);
    image.setAttribute('src', "../assets/trash.png");
    newInput.setAttribute("type", "checkbox");

    for (var i =0,  m = numberOfCells; i < m; i++) {
        table.rows[numberOfRows].insertCell(i);
    }
    nameTask.innerHTML = param.trim();
    newInput.onchange = markTaskAsDone(newInput);
    table.rows[numberOfRows].cells[0].appendChild(newInput);
    table.rows[numberOfRows].cells[2].appendChild(nameTask);
    table.rows[numberOfRows].cells[3].classList.add('trash');
    table.rows[numberOfRows].cells[3].appendChild(image);
    var id = table.rows[numberOfRows].cells[2].id = numberOfRows;

    if (done) {
        table.rows[numberOfRows].cells[2].firstChild.classList.add(nameClass);
    }

    if (done == 'done-task') {
        newInput.checked = true;
        table.rows[numberOfRows].cells[3].firstChild.classList.add('trash-done')
    }
    image.onclick = removeTask;
    input.value = "";

}//adRow

/**
 * Funkcja oznaczająca zadanie jako wykonane
 *
 * @param {object} checkbox - zaznaczony input
 */

function markTaskAsDone(checkbox) {
    checkbox.addEventListener('change', function(event){
        var deletedRow = event.target.parentNode.parentNode.rowIndex
           , textTask = checkbox.parentNode.nextSibling.nextSibling.childNodes
           , trash = checkbox.parentNode.nextSibling.nextSibling.nextSibling.childNodes;

        if(checkbox.checked){
            textTask[0].classList.add('done-task');
            trash[0].classList.add('trash-done');
        }else{
            textTask[0].classList.remove('done-task');
            trash[0].classList.remove('trash-done');
        }
        addDoneTaskToData(checkbox, deletedRow)
    });
}//markTaskAsDone

/**
 * Funkcja usuwająca zadanie z tabeli
 */

function removeTask(e){
    var deletedRow = e.target.parentNode.parentNode.rowIndex;

    if(e.target.parentNode.classList.contains('trash')){
        document.getElementById("toDoList").deleteRow(deletedRow)

        removeFromData(deletedRow)
    }
}//removeTask

/**
 * Funkcja dodająca zdarzenie do ikony plusa
 */

function createTask(){
    var plus = document.getElementById('plus');
    plus.onclick = addTaskToData;
    showData();
}//createTask

window.onload =  createTask;
