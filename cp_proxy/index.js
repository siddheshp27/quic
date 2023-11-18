const express = require("express");
const quic = require("node-quic");
const cors = require("cors");

const PORT = 3001;

const QUIC_SERVER_PORT = 1234;
const QUIC_SERVER_ADDRESS = "127.0.0.1";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.get("/video/:videoName", (req, res) => {
  const { videoName } = req.params;

  quic
    .send(QUIC_SERVER_PORT, QUIC_SERVER_ADDRESS, `test ${videoName}`)
    .onData((data, buffer) => {
      if (data.error) {
        res.status(404).send(data.error);
      } else {
        console.log(buffer);
        res.send(buffer);
      }
    })
    .onError((error) => {
      console.error("Error fetching video data from QUIC server:", error);
      res.status(500).send("Error fetching video data.");
    });
});
app.post("/video", (req, res) => {
  const videoBuffer = req.body.base;
  const videoName = req.body.name;
  const videoData = `upload ${videoBuffer} ${videoName}`;
  console.log(videoData);
  quic
    .send(QUIC_SERVER_PORT, QUIC_SERVER_ADDRESS, videoData)
    .onData((data, buffer) => {
      if (data.error) {
        res.status(404).send(data.error);
      } else {
        console.log(buffer.toString());
        res.json(buffer.toString());
      }
    })
    .onError((error) => {
      console.error("Error fetching video data from QUIC server:", error);
      res.status(500).send("Error fetching video data.");
    });
});

app.listen(PORT, () => {
  console.log(`Proxy server started on http://localhost:${PORT}`);
});
