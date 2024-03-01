document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let url = tabs[0].url;
        let isSpotify = url.includes("open.spotify.com");
        let status = document.getElementById('status')

        if (isSpotify) {
            status.innerText = "Spotify Open"
            status.style.color = "#e0ca00"
            return;
        }
        else {
            status.innerText = "Spotify Not Open"
            status.style.color = "red"
        }
    })
})