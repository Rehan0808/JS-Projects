const btn = document.querySelector("button");
const inputBox = document.querySelector("#input-box");
const listcontainer = document.querySelector("#list-container");

// Load tasks from localStorage on page load
window.addEventListener("load", loadTasks);

inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

btn.addEventListener("click", addTask);

function addTask() {
    if (inputBox.value === "") {
        alert("Write something in the input box");
    } else {
        createTaskElement(inputBox.value);
        saveTasks(); // Save tasks after adding
        inputBox.value = ""; // Clear input box
    }
}

// Helper function to create and add a task element
function createTaskElement(taskText) {
    const li = document.createElement("li");
    const para = document.createElement("p");
    para.innerHTML = taskText;
    li.appendChild(para);

    const span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Close icon
    li.appendChild(span);

    listcontainer.appendChild(li);
}

// Event listener for toggling and removing tasks
listcontainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // Toggle checked class
        saveTasks(); // Save updated state to localStorage
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Remove the task
        saveTasks(); // Save after removal
    }
});

// Save all tasks to localStorage
function saveTasks() {
    const tasks = [];  // Step 1: Create an empty array to store tasks.

    // Step 2: Loop through all <li> elements in the list container.
    listcontainer.querySelectorAll("li").forEach((li) => {
        tasks.push({
            text: li.querySelector("p").innerHTML, // Get the text content of the <p> tag inside <li>.
            checked: li.classList.contains("checked"), // Check if the task has the 'checked' class.
        });
    });

    // Step 3: Convert the tasks array to a JSON string and store it in localStorage.
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



// Load tasks from localStorage on page load
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];  
    // Step 1: Retrieve tasks from localStorage (if any). If none, use an empty array.

    savedTasks.forEach((task) => {  /**task in the forEach loop refers to each individual object in the savedTasks array,
         which includes all your tasks. eg : learn css is object */
        createTaskElement(task.text);  
        // Step 2: Create an <li> element for each task.

        if (task.checked) {  
            listcontainer.lastElementChild.classList.add("checked");  
            // Step 3: If the task was marked as checked (completed), apply the "checked" class.
        }
    });
}

