import express, { request, response } from "express";
const app = express();
// import pool from "./db.js"

// middleware
// import cors from "cors";
// app.use(cors());
app.use(express.json());

// ROUTES //
app.get("/test", (request, response) => {
    return response.send("HI")
})

app.post("/api/sensor", (request, response) => {
    const {deviceId, jarak} = request.body;
    console.log(`[DATA MASUK] Device: ${deviceId} | Jarak: ${jarak}`)

    response.status(200).json({
        message:"Data diterima server",
        status: "success"
    })
})

// 

const PORT=3000;
app.listen(PORT, () => {
    console.log(`running port ${PORT}`)
})