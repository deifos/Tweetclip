
const twittclipImage = document.getElementById("twittclip-image");

chrome.storage.local.get("twittclip-image", (result) => {
    const dataUrl = result["twittclip-image"];
    if (dataUrl) {
        twittclipImage.src = dataUrl;
    }
});