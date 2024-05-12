

  let tasks = [];
  let updateIndex = -1;

  function renderTasks() {
    const tableBody = document.querySelector('#todo-table tbody');
    tableBody.innerHTML = '';

    tasks.forEach((task, index) => {
      const row = tableBody.insertRow();

      const taskCell = row.insertCell(0);
      taskCell.textContent = task.name;

      const statusCell = row.insertCell(1);
      statusCell.textContent = task.status;

      const deadlineCell = row.insertCell(2);
      deadlineCell.textContent = task.deadline;

      const actionsCell = row.insertCell(3);
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '\u2716'; // Delete symbol
      deleteBtn.classList.add('btn', 'btn-delete');
      deleteBtn.onclick = () => deleteTask(index);
      actionsCell.appendChild(deleteBtn);

      const updateBtn = document.createElement('button');
      updateBtn.textContent = '✏️';
      updateBtn.classList.add('btn', 'btn-update');
      updateBtn.onclick = () => setUpdateIndex(index);
      actionsCell.appendChild(updateBtn);

      const completeBtn = document.createElement('button');
      completeBtn.textContent = '\u2714'; // Right tick symbol
      completeBtn.classList.add('btn', 'btn-complete');
      completeBtn.onclick = () => toggleStatus(index);
      actionsCell.appendChild(completeBtn);
    });
  }

  function addTask() {
    const taskInput = document.querySelector('#task-input');
    const deadlineInput = document.querySelector('#deadline-input');
    const taskName = taskInput.value.trim();
    const deadline = deadlineInput.value;
    if (taskName !== '') {
      if (updateIndex === -1) {
        tasks.push({ name: taskName, status: 'Pending', deadline: deadline });
      } else {
        tasks[updateIndex].name = taskName;
        tasks[updateIndex].deadline = deadline;
        updateIndex = -1;
      }
      renderTasks();
      taskInput.value = '';
      deadlineInput.value = '';
    }
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  function setUpdateIndex(index) {
    updateIndex = index;
    document.querySelector('#task-input').value = tasks[index].name;
    document.querySelector('#deadline-input').value = tasks[index].deadline;
  }

  function toggleStatus(index) {
    tasks[index].status = tasks[index].status === 'Pending' ? 'Complete' : 'Pending';
    renderTasks();
  }

  function checkDeadline() {
    const currentTime = new Date();
    tasks.forEach((task, index) => {
      const deadlineTime = new Date(task.deadline);
      const remainingTime = deadlineTime - currentTime;
      if (remainingTime > 0 && remainingTime <= 60000) { // Trigger alarm if less than or equal to 1 minute (60000 ms) remaining
        alert(`Time is running out for task: ${task.name}`);
      }
    });
  }

  setInterval(checkDeadline, 1000); // Check every second

  renderTasks();
