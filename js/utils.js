import { handleViewChange } from "../main";
import { displayDetections } from "./faceDetection";
export let imageResult,
    activeView = "home";

export function attachListeners() {
    //home
    const inputElement = document.querySelector("#camera-input");
    inputElement.addEventListener("change", async (event) => {
        // imageResult = await handleImageUpload(event);
        await onImageUpload(event);
        switchView("result");
    });

    //result
    const editButton = document.querySelector("#edit-button");
    const backButton = document.querySelector("#back-button");

    editButton.addEventListener("click", () => {
        switchView("edit");
    });

    backButton.addEventListener("click", () => {
        switchView("home");
    });

    const downloadButton = document.querySelector("#download-button");
    downloadButton.addEventListener("click", () => {
        switchView("home");
    });

    const cancelButtons = document.querySelectorAll(".cancel-button");
    cancelButtons.forEach((button) => {
        button.addEventListener("click", () => {
            switch (activeView) {
                case "result":
                    switchView("home");
                    break;

                case "edit":
                    switchView("result");
                    break;
                case "edit-prompt":
                    switchView("edit");
                    break;
            }
        });
    });
    const doneButtons = document.querySelectorAll(".done-button");
    doneButtons.forEach((button) => {
        button.addEventListener("click", () => {
            switch (activeView) {
                case "result":
                    switchView("home");
                    break;

                case "edit":
                    switchView("result");
                    break;

                case "edit-prompt":
                    switchView("edit");
                    break;
            }
        });
    });

    //edit
    const popupContainer = document.querySelector(".popup-container");
    const promptButton = document.querySelector("#prompt-button");

    promptButton.addEventListener("click", async () => {
        popupContainer.classList.add("active");
        activeView = "edit-prompt";
        await handleViewChange();
    });
}

export function switchView(destination) {
    if (activeView == "edit-prompt") {
        document.querySelector(".popup-container").classList.remove("active");
    } else {
        let viewSelector = document.querySelector(`.${activeView}`);

        viewSelector.classList.add("hidden");

        viewSelector = document.querySelector(`.${destination}`);
        viewSelector.classList.remove("hidden");
    }

    activeView = destination;
    handleViewChange();
}

async function onImageUpload(e) {
    const canvases = document.querySelectorAll(".result-canvas");
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.onload = async () => {
            canvases.forEach(async (canvas) => {
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.save();
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                await displayDetections();
            });
        };
        img.src = e.target.result;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}
