const express = require ('express');
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const users = [
    { email: "admin@example.com", password: "admin", rol: "admin" },
    { email: "user@example.com", password: "user", rol: "user" },
];

const app = express();  
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

// Middleware para gestionar que solo lleguen solicitudes por métodos HTTP válidos
    if (!validMethods.includes(req.method)) {
        return res.status(400).json({ message: 'Método HTTP no válido' });
    }

    next();
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

//Autenticación
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email && user.password === password );

    if (user) {
        const token = jwt.sign(user, process.env.SECRET_KEY);
        res.status(200).json({ token });
    }else{ 
        return res.status(401).send({ error: "Invalid user name or password" })
    };
    });

  //Middleware JWTValidation
const JWTValidation = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
        return res.status(401).json({ error: "Invalid token" });
        }

        req.rol = decoded.rol;
        next();
    });
};

  //Rutas privadas
app.get('/premium-clients', JWTValidation, (req, res) => {
    if (req.rol === 'admin') {
        return res.json({ message: "premium-clients list" });
    } else {
        return res.status(403).json({ error: "Access not allowed" });
    }
});

app.get('/medium-clients',  JWTValidation, (req, res) => {
    if (req.rol === 'admin' || req.rol === 'user') {
        return res.json({ message: "medium-clients list" });
    } else {
        return res.status(403).json({ error: "Access not allowed" });
    }
});


app.get("/", function (req, res) {
    res.send("Bienvenido a la api de ADA Cars");
});

  // Instancia del servidor
const server = app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
});

  // Exportación del servidor
module.exports = server;