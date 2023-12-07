const express = require('express');
const listEditRouter = express.Router();

let tasks = [
  { id: 1, title: 'Tarea 1', completed: false },
  { id: 2, title: 'Tarea 2', completed: true },
  { id: 3, title: 'Tarea 3', completed: false },
  { id: 4, title: 'Tarea 4', completed: true },
];

// Ruta para crear una tarea
listEditRouter.post('/tasks', (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'El título de la tarea es obligatorio' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: completed || false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Ruta para eliminar una tarea en específico
listEditRouter.delete('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ message: 'Tarea eliminada correctamente' });
});

// Ruta para actualizar una tarea en específico
listEditRouter.put('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const { title, completed } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: title || tasks[taskIndex].title,
      completed: completed !== undefined ? completed : tasks[taskIndex].completed,
    };

    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});


module.exports = listEditRouter;







