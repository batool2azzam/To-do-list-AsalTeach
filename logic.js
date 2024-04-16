document.addEventListener("DOMContentLoaded", function () {
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

  const modal = document.getElementById("myModal");
  const inputField = document.querySelector(".input");
  const span = document.querySelector(".close");

  inputField.onclick = () => (modal.style.display = "block");
  span.onclick = () => (modal.style.display = "none");
  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
  };

  document.getElementById("addTaskBtn").addEventListener("click", addTask);
  document
    .getElementById("allBtn")
    .addEventListener("click", () => updateUI(tasks));
  document
    .getElementById("completedBtn")
    .addEventListener("click", () => updateFilteredUI(true));
  document
    .getElementById("incompleteBtn")
    .addEventListener("click", () => updateFilteredUI(false));

  function addTask() {
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskCategory = document.getElementById("taskCategory").value;
    tasks.push({
      title: taskTitle,
      desc: taskDescription,
      isDone: false,
      category: taskCategory,
    });
    updateUI(tasks);
    modal.style.display = "none";
  }

  function updateUI(tasks) {
    const taskContainer = document.getElementById("theToDoListContainer");
    taskContainer.innerHTML = tasks
      .map((task, index) => renderTask(task, index))
      .join("");
    document.getElementById("taskCount").textContent = tasks.length;
    assignEventListeners();
  }

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
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="${isDoneClass} fa-circle-check" data-task-index="${index}"></i>
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>
      `;
  }

  function assignEventListeners() {
    const checkIcons = document.querySelectorAll(".fa-circle-check");
    checkIcons.forEach((icon) =>
      icon.addEventListener("click", toggleTaskCompletion)
    );
  }

  function toggleTaskCompletion(event) {
    const index = parseInt(event.target.dataset.taskIndex);
    tasks[index].isDone = !tasks[index].isDone;
    updateUI(tasks);
  }

  function updateFilteredUI(isCompleted) {
    const filteredTasks = tasks.filter((task) => task.isDone === isCompleted);
    updateUI(filteredTasks);
  }

  function getClassForCategory(category) {
    if (category === "Personal") return "theToDoListRed";
    if (category === "Freelancer") return "theToDoListBlue";
    return "theToDoListYellow";
  }

  function getClassForCategoryTitle(category) {
    if (category === "Personal") return "TitleToDORed";
    if (category === "Freelancer") return "TitleToDOBlue";
    return "TitleToDOYellow";
  }

  updateUI(tasks);
});