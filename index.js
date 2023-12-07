const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

// Ruta para obtener la lista de tareas
app.get("/", (rep, res)=>{
    res.status(200).send(taks);
}); 

app.post("/taks", (req,res) => {
    const newTaks = req.body;
    taks.push(newTaks);
    console.log("***", newTaks)

    res.status(200).send({
        mensaje: "Taks creado exitosamente",
    });
});

app.delete("/taks/:id", (req, res) => {
    const id = req.params.id;
    taks = taks.filter((taks) => taks.id != id);
    res.status(200).json(taks);
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
