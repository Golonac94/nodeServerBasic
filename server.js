const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

console.log(`🚀 Intentando iniciar el servidor en el puerto: ${PORT}`);


app.get('/', (req, res) => {
    res.send('Hola desde el server prueba rama ');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});

//comentario de prueba