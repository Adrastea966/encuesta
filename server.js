const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Esquema de respuestas
const respuestaSchema = new mongoose.Schema({
    contacto: String,
    calificacion: String,
    trabajo: String,
    espera: String,
    resolucion: String,
    amabilidad: String,
    comentarios: String,
});

const Respuesta = mongoose.model('Respuesta', respuestaSchema);

app.use(bodyParser.json());
app.use(cors());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para guardar respuestas
app.post('/api/respuestas', (req, res) => {
    const nuevaRespuesta = new Respuesta(req.body);
    nuevaRespuesta.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Datos guardados con éxito');
        }
    });
});

// Ruta para obtener todas las respuestas
app.get('/api/respuestas', (req, res) => {
    Respuesta.find({}, (err, respuestas) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(respuestas);
        }
    });
});

// Para cualquier otra ruta, servir el archivo index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
