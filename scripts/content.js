//injects a script into the webpage that can modify DOM
const fetchAndReplace = async() => {
    const currentTrack = document.querySelector("a[data-testid=context-link]");
    if(currentTrack){
        const currentTrackUrl = currentTrack.href;
        const transformedCurrentTrackUrl = new URL(currentTrackUrl);
        const currentTrackId = transformedCurrentTrackUrl.search.split("%3A")[2];
        // console.log(currentTrackId)

        const apiUrl = `http://localhost:8181/api/lyrics/${currentTrackId}`
        const response = await fetch(apiUrl)
        const json = await response.json();


        const innerMostDiv = document.querySelector("main[aria-label=Spotify] > div > div:nth-child(2)");
        const innerMostDivSpan = innerMostDiv.querySelector("span");
        if(innerMostDivSpan) innerMostDivSpan.remove();

        const singleDiv = document.createElement("div")
        innerMostDiv.append(singleDiv);

        // console.log(json)

        for(const line of json.lyric.lyrics.lines){
            const div = document.createElement("div");
            div.textContent = line.words
            singleDiv.appendChild(div);
        }

    }
    else console.log("not found, ", currentTrack)
}


// document.addEventListener("DOMContentLoaded", () => {
//     console.log("page fully loaded");
//     fetchAndReplace();
// });


window.addEventListener("click", () => {
    console.log("click detected, running func...");
    fetchAndReplace();
});