let currentTrackId = null;

chrome.webRequest.onBeforeRequest.addListener((details) => {
    if (details.url.includes("spclient.wg.spotify.com/color-lyrics")) {
        const url = details.url
        const trackId = url.split("/")[6];
        currentTrackId = trackId;
    }
}, { urls: ["<all_urls>"] });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message === "reqTrackID"){
        sendResponse({trackId: currentTrackId});
    }
})

