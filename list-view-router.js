const express = require('express');
const listViewRouter = express.Router();

// Middleware para verificar que los parámetros sean correctos**Ruta para ver una tarea en específico
const validateParams2 = (req, res, next) => {
  const taskId = parseInt(req.params.taskId);

  // Verificar si taskId es un número válido 
  if (isNaN(taskId) || taskId <= 0) {
    return res.status(400).json({ message: 'El parámetro taskId debe ser un número positivo.' });
  }

  next();
};

// Middleware para verificar que los parámetros sean correctos Ruta filtrar tareas completas o incompletas
const validateParams3 = (req, res, next) => {
  const validParams = ['completed', 'incomplete'];
  const status = req.params.status;

  if (status && !validParams.includes(status.toLowerCase())) {
    return res.status(400).json({ message: 'Parámetros incorrectos' });
  }

  next();
};



let tasks = [
  { id: 1, title: 'Tarea 1', completed: false },
  { id: 2, title: 'Tarea 2', completed: true },
  { id: 3, title: 'Tarea 3', completed: false },
  { id: 4, title: 'Tarea 4', completed: true },
];


// Ruta para listar todas las tareas
listViewRouter.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Ruta para ver una tarea en específico
listViewRouter.get('/tasks/:taskId', validateParams2, (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = tasks.find(t => t.id === taskId);

    if (task) {
      res.json(task);
    } else {
      res.status(400).json({ message: 'Tarea no encontrada' });
    }
});

// Ruta para filtrar tareas completas o incompletas
listViewRouter.get('/tasks/filter/:status', validateParams3, (req, res) => {
  const status = req.params.status.toLowerCase();
  const filteredTasks = tasks.filter(t => (status === 'completed' && t.completed) || (status === 'incomplete' && !t.completed));

  res.json(filteredTasks);
});

module.exports = listViewRouter;
