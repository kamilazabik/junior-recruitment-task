/**
 * Funkcja pobierająca dane z localStorage
 */

function getData(){
    var data = {}
      , dataTask = localStorage.getItem('todo');

    if(dataTask != null){
        data = JSON.parse(dataTask)
    }
    return data;
}//getData

/**
 * Funkcja pobierająca dane z localStorage i generująca tabelę
 */

function showData(){
    var data = getData();

    for (var prop in data) {
        addRow(data[prop].task,data[prop].done)
    }
}//showData

/**
 * Funkcja dodająca zadanie do localStorage
 *
 * Każde zadanie to nowy obiekt w obiekcie data
 */

function addTaskToData(){
    var task = document.getElementById('task').value
        , table = document.getElementById('toDoList')
        , numberOfRows = table.rows.length- 1
        , data = getData()
        , nameTask = {task: task, done: ''}
        , input = document.getElementById('task').value;

    if(task == ''){
        alert('Wpisz zadanie')
    }else {
        addRow(input, null);
        data[numberOfRows] = nameTask;
        localStorage.setItem('todo', JSON.stringify(data));
    }
}//addTaskToData

/**
 * Funkcja dodająca zadanie oznaczone jako wykonane do localStorage
 *
 * @param {object} checkbox - zaznaczony input
 * @param {number} numberOfRow - numer wiersza zadania oznaczonego jako wykonane
 */

function addDoneTaskToData(checkbox, numberOfRow){
    var data = getData();

    if(checkbox.checked){
        data[numberOfRow].done = 'done-task';
        localStorage.setItem('todo', JSON.stringify(data));
    }else{
        data[numberOfRow].done = 'not-done';
        localStorage.setItem('todo', JSON.stringify(data));
    }
}//addDoneTaskToLocalStorage

/**
 * Funkcja usuwająca zadanie z localStorage
 *
 * @param {number} deletedRow - numer usuniętego wiersza
 */

function removeFromData(deletedRow){
    var data = getData();
    delete data[deletedRow];
    for (var prop in data) {
        var newName = parseInt(prop - 1);
        if(prop > deletedRow && newName != prop){
            var temp = data[prop];
            delete data[prop];
            data[newName] = temp;
        }
    }
    localStorage.setItem('todo', JSON.stringify(data));
}//removeFromData

