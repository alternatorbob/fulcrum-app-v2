import * as faceapi from "@vladmandic/face-api";
import Replicate from "replicate";
await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
await faceapi.nets.ageGenderNet.loadFromUri("/models");

const replicate = new Replicate({
    auth: "r8_Yi35Ac9D2LHTEWPV8CJoNO2qRFziyRu0acO9Q",
});

export async function displayDetections() {
    const canvas = document.querySelector(".result-canvas");
    const overlay = document.querySelector("#detections-overlay");
    overlay.width = canvas.width;
    overlay.height = canvas.height;

    const detections = await faceapi.detectAllFaces(canvas).withAgeAndGender();
    const displaySize = { width: canvas.width, height: canvas.height };
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    // draw detections into the canvas
    faceapi.draw.drawDetections(overlay, resizedDetections);

    console.log("detections: ", detections);

    const output = await replicate.run(
        "zhouzhengjun/lora_inpainting:8a87a90ef3a82a507b8b88e42bf522882c7d8a9118fc94557cfe5fce400bd2bd",
        {
            input: {
                prompt: "a photo of <1> riding a horse on mars",
            },
        }
    );
    console.log(output);
    // const displaySize = { width: canvas.width, height: canvas.height };
    // // resize the overlay canvas to the input dimensions
    // const overlay = document.querySelector("#detections-overlay");
    // faceapi.matchDimensions(overlay, displaySize);

    // // resize the detected boxes in case your displayed image has a different size than the original
    // const resizedDetections = faceapi.resizeResults(detections, displaySize);
    // // draw detections into the canvas
    // faceapi.draw.drawDetections(canvas, resizedDetections);

    // /* Display face landmarks */
    // const detectionsWithLandmarks = await faceapi
    //     .detectAllFaces(canvas)
    //     .withFaceLandmarks();
    // // resize the detected boxes and landmarks in case your displayed image has a different size than the original
    // const resizedResults = faceapi.resizeResults(
    //     detectionsWithLandmarks,
    //     displaySize
    // );
    // // draw detections into the canvas
    // faceapi.draw.drawDetections(canvas, resizedResults);
    // // draw the landmarks into the canvas
    // faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
}
