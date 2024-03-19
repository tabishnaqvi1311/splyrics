const main = () => {
    let trackId = null;

        /**
     * Fetches lyrics from the API and replaces the DOM content with the fetched lyrics.
     * @param {string} currentTrackId - The ID of the current track.
     */
    const fetchAndReplace = async (currentTrackId) => {
        const innerMostDiv = document.querySelector("main[aria-label=Spotify] > div > div:nth-child(2)");

        const innerMostDivSpan = innerMostDiv.querySelector("span");
        if (!innerMostDivSpan) return;
        if (innerMostDivSpan) innerMostDivSpan.remove();

        const singleDiv = document.createElement("div")
        innerMostDiv.appendChild(singleDiv);

        if (!currentTrackId) return;
        const apiUrl = `http://localhost:8181/api/lyrics/${currentTrackId}`
        const response = await fetch(apiUrl)
        if (!response.ok) {
            return;
        }
        const json = await response.json();

        for (const line of json.lyric.lyrics.lines) {
            const outerDiv = document.createElement("div");
            outerDiv.setAttribute("dir", "auto");
            outerDiv.setAttribute("data-testid", "fullscreen-lyric");

            const innerDiv = document.createElement("div");
            innerDiv.textContent = line.words
            outerDiv.appendChild(innerDiv)
            singleDiv.appendChild(outerDiv);
        }
    }

       /**
     * Sends a message to the background script to request the track ID.
     */
    const getTrackID = () => {
        chrome.runtime.sendMessage("reqTrackID", (response) => {
            trackId = response.trackId;
            console.log(trackId);
            fetchAndReplace(trackId);
        })
    }

    const lyricsButton = document.querySelector("button[data-testid=lyrics-button]");
    if (!lyricsButton) setTimeout(() => {
        main();
    }, 5000);
    lyricsButton.addEventListener("click", () => {
        console.log("clicked")
        if (lyricsButton.getAttribute("data-active") === "false") {
            getTrackID();
        }
    });
}

//entry point
window.addEventListener("load", () => {
    console.log("page fully loaded");
    main();
});