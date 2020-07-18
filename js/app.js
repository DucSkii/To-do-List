// Elements, what makes up the page with functionality
const clear = document.querySelector(".clear"); //.clear because it is a class, list, date and input are id
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const completed = "fa-check-circle";
const incomplete = "fa-circle-thin";
const line_through = "lineThrough";

// Varaibles
let LIST = []
let id = 0

// Getting data from localstorage
let data = localStorage.getItem("TODO");

// Check if localstorage is not empty
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length; // sets id to last on the last
    loadList(LIST); // function to load the list
}

// Loads list
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

// Clear button
clear.addEventListener("click", function(event) {
    localStorage.clear();
    location.reload();
})

// Show date 
const currentDate = new Date(); // in-built function
const days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`]; //.getday/.getmonth func picks number 0-6 or 0-11 and picks from array
const months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];
function showdate(date) { // "date" being passed through can be named anything
    console.log(`currentDate`, date) // you can name your console log
    const month = ` ` + months[date.getMonth()];
    const day = days[date.getDay()];
    const dayNumber = date.getDate();
    return day + `,` + month + ` ` + dayNumber //using spaces and commas in string
}
dateElement.innerHTML = showdate(currentDate) //using innerHTML of dateElement

// Add todo function
function addToDo(toDo, id, done, trash) {
    if(trash) { 
        return;
    } // if trash is true the code below wont run
    const status = done ? completed : incomplete;
    const line = done ? line_through : ""; // ${} acts as place holder, status could be complete or incomplete true/false
    const item = `<li class="item">
                    <i class="fa ${status} co" job="complete" id=${id}></i>
                    <p class="text ${line}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                  </li>`
    const position = "beforeend"
    list.insertAdjacentHTML(position, item)
}

// Making function add when Enter is pressed
document.addEventListener("keyup", function(event) {
    if(event.keyCode == 13) { // 13 is Enter
        const toDo = input.value;
        // if something is in the text field fucntion "addToDo" will run
        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false,
            })
            // add item to localstorage (needs to be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++; // incrementing id
        }
        input.value = "" // resets the text box
    }
})

// Function to complete ToDo
function completeToDo(element) {
    element.classList.toggle(completed); // checks if they exist and adds or remove if they do or dont
    element.classList.toggle(incomplete);
    element.parentNode.querySelector(".text").classList.toggle("lineThrough");
    LIST[element.id].done ? LIST[element.id].done = false : LIST[element.id].done = true;
    console.log(LIST)
    console.log(element.id)
}
    
// Remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// Making list buttons work
list.addEventListener("click", function(event) { 
    const element = event.target;
    const elementJOB = element.attributes.job.value; // trash has job delete / check has job complete
    if(elementJOB == "complete") {
        completeToDo(element);
    } else if(elementJOB == "delete") {
        removeToDo(element);
    }
    // add item to localstorage (needs to be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
})