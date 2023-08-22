const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const checkedButton = document.getElementById("checkedButton");
const uncheckedButton = document.getElementById("uncheckedButton");
const allButton = document.getElementById("allButton");

addButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", updateTaskStatus);

  const taskLabel = document.createElement("span");
  taskLabel.textContent = taskText;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => editTask(taskLabel));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTask(li));

  li.appendChild(checkbox);
  li.appendChild(taskLabel);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);

  taskInput.value = "";
}

function updateTaskStatus(event) {
  const checkbox = event.target;
  if (checkbox.checked) {
    showToast("Task checked: " + checkbox.nextSibling.textContent);
  } else {
    showToast("Task unchecked: " + checkbox.nextSibling.textContent);
  }
}

function editTask(label) {
  const newText = prompt("Edit task:", label.textContent);
  if (newText !== null) {
    label.textContent = newText;
  }
}

function deleteTask(taskItem) {
  const confirmDelete = confirm("Delete this task?");
  if (confirmDelete) {
    taskList.removeChild(taskItem);
    showToast("Task deleted.");
  }
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    document.body.removeChild(toast);
  }, 2000);
}

checkedButton.addEventListener("click", displayCheckedTasks);
uncheckedButton.addEventListener("click", displayUncheckedTasks);
allButton.addEventListener("click", displayAllTasks);

function displayCheckedTasks() {
  const checkedTasks = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
    .map(checkbox => checkbox.nextSibling.textContent);
  showToast("Checked Tasks:\n" + checkedTasks.join("\n"));
}

function displayUncheckedTasks() {
  const uncheckedTasks = Array.from(document.querySelectorAll("input[type='checkbox']:not(:checked)"))
    .map(checkbox => checkbox.nextSibling.textContent);
  showToast("Unchecked Tasks:\n" + uncheckedTasks.join("\n"));
}

function displayAllTasks() {
  const allTasks = Array.from(document.querySelectorAll("li span"))
    .map(span => span.textContent);
  showToast("All Tasks:\n" + allTasks.join("\n"));
}
