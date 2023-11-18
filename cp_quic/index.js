import quic from "node-quic";
import fs from "fs";
import path from "path";

const port = 1234;
const address = "127.0.0.1";
const videoDir = "./videos/";

quic
  .listen(port, address)
  .then(() => {
    console.log(`QUIC server is listening on ${address}:${port}`);
  })
  .onError((error) => {
    console.error("Error:", error);
  })
  .onData((videoName, stream) => {
    const [use, data, name] = videoName.toString().split(" ");
    // const receivedData = JSON.parse(data);

    console.log(use);
    if (use == "upload") {
      console.log("upload!!!");
      const videoBuffer = Buffer.from(data, "base64");
      fs.writeFileSync(`videos/${name}`, videoBuffer);
      stream.write({ success: "Video Uploaded SuccessFully" });
      stream.end();
    } else {
      console.log("receive!!!");

      const videoName = data;
      const videoPath = path.join(videoDir, videoName);
      if (fs.existsSync(videoPath)) {
        const videoBuffer = fs.readFileSync(videoPath);
        stream.write(videoBuffer);
        stream.end();
      } else {
        stream.write({ error: "File not found" });
        stream.end();
      }
    }
  });
//   .onUpload();
