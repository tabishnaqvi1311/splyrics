document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let url = tabs[0].url;
        let isSpotify = url.includes("open.spotify.com");
        let status = document.getElementById('status')

        if (isSpotify) {
            status.innerText = "Waiting For Lyrics..."
            status.style.color = "#e0ca00"
            return;
        }
        else {
            status.innerText = "Not On Spotify"
            status.style.color = "red"
        }
    })
})