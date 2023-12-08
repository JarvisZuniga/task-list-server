const express = require('express');
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

app.use((req, res, next) => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

// Middleware para gestionar que solo lleguen solicitudes por métodos HTTP válidos
    if (!validMethods.includes(req.method)) {
        return res.status(400).json({ message: 'Método HTTP no válido' });
    }

    next();
    });


// Inicia el servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
