import express, { request, response } from "express";
const app = express();

import pool from "./db.js";

// middleware
import cors from "cors";
app.use(cors());
app.use(express.json());

import { Server } from "socket.io";

// import {createServer} from "http";

// TEST DB CONNECTION //
app.get("/test-db", async (request, response) => {
    try {
        const result = await pool.query("SELECT NOW()");
        response.json({ success: true, server_time: result.rows[0] });
        console.log("Database connection successful");
    } catch (err) {
        response.status(500).json({ error: err.message });
        console.error("Database connection error:", err);
    }
});

// ambil semua sensor
app.get("/api/sensors", async (request, response) => {
    try {
        const result = await pool.query("SELECT * FROM sensors ORDER BY id");

        // request
        response.json(result.rows);
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
});

// test endpoint
app.post("/api/test", (request, response) => {
    const { sensor_name, jarak } = request.body;
    console.log(`[DATA MASUK] Device: ${sensor_name} | Jarak: ${jarak}`);
    response.json({ status: "success", message: "Data diterima" });
});

// update status sensor
app.patch("/api/sensor/update", async (request, response) => {
  const { sensor_name, distance } = request.body;

  console.log(`Receivewd request from sensor ${sensor_name} with distance ${distance}`);

    if (!sensor_name || !distance) {
        return response.status(400).json({ error: "sensor_name and distance are required" });
    }

    try {

        const thresholdAndStatus = await pool.query(
            "SELECT threshold, status FROM sensors WHERE sensor_name = $1",
            [sensor_name]
        );

        const status = distance <= thresholdAndStatus.rows[0].threshold ? 'occupied' : 'empty';

        if (thresholdAndStatus.status !== status) {
            await pool.query(
                "UPDATE sensors SET status = $1, updated_at = NOW() WHERE sensor_name = $2",
                [status, sensor_name]
            );
        }

        response.json({ success: true });
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
});

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