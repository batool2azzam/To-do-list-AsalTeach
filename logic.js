// Initial tasks data
let tasks = [
  {
    title: "Complete UI/UX design",
    desc: "Prepare for the meeting with the client",
    isDone: false,
    category: "Freelancer",
  },
  {
    title: "Finish the To-do list logic",
    desc: "Delete and modify tasks in the list",
    isDone: true,
    category: "Training",
  },
  {
    title: "Go shopping",
    desc: "Buy vegetables, fruits, and milk",
    isDone: false,
    category: "Personal",
  },
];

// Load tasks from localStorage on window load
window.addEventListener("load", () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    updateUI(tasks);
  }
});

// DOM elements
const addModal = document.getElementById("addModal");
const editModal = document.getElementById("editModal");
const inputField = document.getElementById("taskInput");

// Event listeners for modals
inputField.onclick = () => (addModal.style.display = "block");
window.onclick = (event) => {
  if (event.target == addModal) addModal.style.display = "none";
  if (event.target == editModal) editModal.style.display = "none";
};

// Function to close modals
function closeModal() {
  editModal.style.display = "none";
  addModal.style.display = "none";
}

// Function to add a new task
function addTask() {
  const taskTitle = document.getElementById("taskTitle").value;
  const taskDescription = document.getElementById("taskDescription").value;
  const taskCategory = document.getElementById("taskCategory").value;

  if (taskTitle == "") {
    showAlert("Task title cannot be empty!", "alert-danger");
    return;
  }

  // Add new task to tasks array
  tasks.unshift({
    title: taskTitle,
    desc: taskDescription,
    isDone: false,
    category: taskCategory,
  });

  // Clear input fields 
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";

  // Update UI
  updateUI(tasks);
  addModal.style.display = "none";

  // Show success alert
  showAlert("Task has been added successfully!", "alert-info");

  // Update tasks in localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  
}

// Function to edit an existing task
function editTask(index) {
  editModal.style.display = "block";
  const editTaskTitle = document.getElementById("editTaskTitle");
  const editTaskDescription = document.getElementById("editTaskDescription");
  const editTaskBtn = document.getElementById("editTaskBtn");

  // Git existing fields to edit easily
  editTaskTitle.value = tasks[index].title;
  editTaskDescription.value = tasks[index].desc;

  // Update the task fieldes with the new values
  editTaskBtn.onclick = function () {
    tasks[index].title = editTaskTitle.value;
    tasks[index].desc = editTaskDescription.value;
    editModal.style.display = "none";
    updateUI(tasks);
    showAlert("Task description Edited successfully!", "alert-info");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
}

// Function to update the UI with tasks
function updateUI(tasks) {
  const taskContainer = document.getElementById("theToDoListContainer");
  taskContainer.innerHTML = tasks
    .map((task, index) => renderTask(task, index))
    .join("");
  document.getElementById("taskCount").textContent = tasks.length;
}

// Function to render a single task
function renderTask(task, index) {
  const class1 = getClassForCategory(task.category);
  const class2 = getClassForCategoryTitle(task.category);
  const isDoneClass = task.isDone ? "fa-solid" : "fa-regular";
  return `
        <div class="${class1}">
          <div class="taskTitleDesc">
            <div class="${class2}">${task.title}</div>
            <div class="desc">${task.desc}</div>
          </div>
          <div class="icons">
            <i class="fa-solid fa-pen-to-square" onclick="editTask(${index})"></i>
            <i class="${isDoneClass} fa-circle-check" data-task-index="${index}" onclick="toggleTaskCompletion(${index})"></i>
            <i class="fa-solid fa-trash-can" onclick="showDeleteConfirmationModal(${index})"></i>
          </div>
        </div>
      `;
}

// Function to toggle task completion status
function toggleTaskCompletion(index) {
  tasks[index].isDone = !tasks[index].isDone;
  updateUI(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to show delete confirmation modal
function showDeleteConfirmationModal(index) {
  const deleteModal = document.getElementById("deleteConfirmationModal");
  deleteModal.style.display = "block";

  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  confirmDeleteBtn.addEventListener("click", function () {
    deleteModal.style.display = "none";
    deleteTask(index);
  });

  cancelDeleteBtn.addEventListener("click", function () {
    deleteModal.style.display = "none";
  });
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateUI(tasks);
  showAlert("Task has been Deleted successfully!", "alert-info");
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to clear all completed tasks
function clearAllCompleted() {
  tasks = tasks.filter((task) => !task.isDone);
  updateUI(tasks);
  showAlert("Completed Todos Deleted successfully!");

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to update UI based on completion status
function updateFilteredUI(isCompleted) {
  const filteredTasks = tasks.filter((task) => task.isDone === isCompleted);
  updateUI(filteredTasks);
}

// Function to get class for task category
function getClassForCategory(category) {
  if (category === "Personal") return "theToDoListRed";
  if (category === "Freelancer") return "theToDoListBlue";
  return "theToDoListYellow";
}

// Function to get class for task category title
function getClassForCategoryTitle(category) {
  if (category === "Personal") return "TitleToDORed";
  if (category === "Freelancer") return "TitleToDOBlue";
  return "TitleToDOYellow";
}

// Function to show alert message
function showAlert(message, colorClass = "alert-success") {
  const successAlert = document.getElementById("successAlert");
  successAlert.innerHTML = message;
  successAlert.classList.remove("d-none");
  successAlert.classList.add(colorClass);
  setTimeout(() => {
    successAlert.classList.add("d-none");
    successAlert.classList.remove(colorClass);
  }, 3000);
}

// Initial UI update
updateUI(tasks);
