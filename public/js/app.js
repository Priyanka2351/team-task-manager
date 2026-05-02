const API_URL = '/api/tasks';

// ── DOM references ──
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalCount = document.getElementById('totalCount');
const pendingCount = document.getElementById('pendingCount');
const doneCount = document.getElementById('doneCount');
const toast = document.getElementById('toast');

let toastTimer = null;

// ── Show a toast message ──
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Fetch and render all tasks ──
async function loadTasks() {
  taskList.innerHTML = '<div class="spinner"></div>';

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    const tasks = await res.json();

    renderTasks(tasks);
    updateStats(tasks);
  } catch (err) {
    taskList.innerHTML = `<div class="empty-state"><div class="icon">⚠️</div><p>Could not load tasks. Is the server running?</p></div>`;
    console.error(err);
  }
}

// ── Render task list to DOM ──
function renderTasks(tasks) {
  if (tasks.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        <div class="icon">📋</div>
        <p>No tasks yet. Add one above!</p>
      </div>`;
    return;
  }

  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.status === 'completed' ? 'completed' : ''}`;
    li.dataset.id = task._id;

    li.innerHTML = `
      <div class="check-circle"></div>
      <span class="task-title">${escapeHtml(task.title)}</span>
      <span class="task-status-badge ${task.status === 'completed' ? 'status-completed' : 'status-pending'}">
        ${task.status}
      </span>`;

    li.addEventListener('click', () => toggleTask(task._id, li));
    taskList.appendChild(li);
  });
}

// ── Update stats chips ──
function updateStats(tasks) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'completed').length;
  const pending = total - done;

  totalCount.textContent = total;
  pendingCount.textContent = pending;
  doneCount.textContent = done;
}

// ── Add a new task ──
async function addTask() {
  const title = taskInput.value.trim();
  if (!title) {
    showToast('⚠️  Please enter a task title');
    taskInput.focus();
    return;
  }

  addBtn.disabled = true;
  addBtn.textContent = 'Adding…';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error('Failed to add task');

    taskInput.value = '';
    showToast('✅  Task added!');
    await loadTasks();
  } catch (err) {
    showToast('❌  Could not add task');
    console.error(err);
  } finally {
    addBtn.disabled = false;
    addBtn.textContent = '+ Add Task';
  }
}

// ── Toggle task status ──
async function toggleTask(id, element) {
  element.style.pointerEvents = 'none';
  element.style.opacity = '0.5';

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'PUT' });
    if (!res.ok) throw new Error('Failed to update task');

    const updated = await res.json();
    const wasCompleted = updated.status === 'completed';
    showToast(wasCompleted ? '🎉  Task completed!' : '🔄  Marked as pending');
    await loadTasks();
  } catch (err) {
    showToast('❌  Could not update task');
    element.style.pointerEvents = '';
    element.style.opacity = '';
    console.error(err);
  }
}

// ── Escape HTML to prevent XSS ──
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Event listeners ──
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// ── Init ──
loadTasks();
