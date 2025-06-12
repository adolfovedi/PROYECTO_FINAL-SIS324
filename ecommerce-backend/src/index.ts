import express from "express";
import Router from "./routes/EcommersRouter";
import cors from "cors";

const app = express();

//configuraciones de CORS
const corsOptions = {
    "origin": "http://localhost:3000", // Cambiado
    "methods": "GET, POST, PUT, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}

app.use(cors(corsOptions));

app.use(express.json());

//Rutas de usuario
app.use('/api', Router);

const PORT = 5000; // Cambiado

app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`); // Agregado
});