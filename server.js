import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/vehicle-data", (req, res) => {
    const filePath = path.join("data.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).send("Error reading file");
            return;
        }

        const vehicleData = JSON.parse(data);
        const limit = parseInt(req.query.limit) || 15;
        const endIndex = 0 + limit;
        const batchData = vehicleData.slice(0, endIndex);

        res.json({
            limit,
            total: vehicleData.length,
            data: batchData,
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
