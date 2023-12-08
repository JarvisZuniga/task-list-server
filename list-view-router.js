const express = require('express');
const listViewRouter = express.Router();

let tasks = [
  { id: 1, title: 'Tarea 1', completed: false },
  { id: 2, title: 'Tarea 2', completed: true },
  { id: 3, title: 'Tarea 3', completed: false },
  { id: 4, title: 'Tarea 4', completed: true },
];

listViewRouter.use((req, res, next) => {
  // Middleware para verificar que los parámetros sean correctos
  const validParams = ['completed', 'incomplete'];

  if (req.params.status && !validParams.includes(req.params.status.toLowerCase())) {
    return res.status(400).json({ message: 'Parámetros incorrectos' });
  }

  next();
});

// Ruta para listar todas las tareas
listViewRouter.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Ruta para ver una tarea en específico
listViewRouter.get('/tasks/:taskId',  (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = tasks.find(t => t.id === taskId);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

// Ruta para filtrar tareas completas o incompletas
listViewRouter.get('/tasks/filter/:status', (req, res) => {
  const status = req.params.status.toLowerCase();
  const filteredTasks = tasks.filter(t => (status === 'completed' && t.completed) || (status === 'incomplete' && !t.completed));

  res.json(filteredTasks);
});

module.exports = listViewRouter;
