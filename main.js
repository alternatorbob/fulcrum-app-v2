import { attachListeners, activeView, imageResult } from "./js/utils";
import { displayDetections } from "./js/faceDetection";

export function handleViewChange() {
    switch (activeView) {
        case "home":
            console.log(`Current View: ${activeView}`);
            break;

        case "result":
            console.log(`Current View: ${activeView}`);
            // displayDetections();
            // const imageSelector = document.querySelector("#image-result");
            // imageSelector.src = imageResult;
            break;

        case "edit":
            console.log(`Current View: ${activeView}`);
            break;

        case "edit-prompt":
            console.log(`Current View: ${activeView}`);
            break;
    }
}

attachListeners();
const container = document.querySelector(".container");
for (const child of container.children) {
    child.classList.toggle("hidden", child !== container.firstElementChild);
}
