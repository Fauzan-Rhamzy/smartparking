import express, { request, response } from "express";
const app = express();

import pool from "./db.js";

// middleware
// import cors from "cors";
// app.use(cors());
app.use(express.json());
    
// TEST DB CONNECTION //
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ success: true, server_time: result.rows[0] });
        console.log("Database connection successful");
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error("Database connection error:", err);
    }
});

// ambil semua sensor
app.get("/api/sensors", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM sensors ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// test endpoint
app.post("/api/test", (req, res) => {
    const { deviceId, jarak } = req.body;
    console.log(`[DATA MASUK] Device: ${deviceId} | Jarak: ${jarak}`);
    res.json({ status: "success", message: "Data diterima" });
});

// update status sensor
app.patch("/api/sensor/update", async (req, res) => {
  const { sensor_name, status } = req.body;
  console.log(`Updating sensor ${sensor_name} to status ${status}`);
    if (!sensor_name || !status) {
        return res.status(400).json({ error: "sensor_name and status are required" });
    }
    if (status!=='occupied' && status!=='empty' && status!=='inactive') {
        return res.status(400).json({ error: "Invalid status value" });
    }
    try {
        await pool.query(
            "UPDATE sensors SET status = $1, updated_at = NOW() WHERE sensor_name = $2",
            [status, sensor_name]
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
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