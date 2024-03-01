//injects a script into the webpage that can modify DOM
const fetchAndReplace = async() => {
    const currentTrack = document.querySelector("a[data-testid=context-link]");
    if(currentTrack){
        const currentTrackUrl = currentTrack.href;
        const transformedCurrentTrackUrl = new URL(currentTrackUrl);
        const currentTrackId = transformedCurrentTrackUrl.search.split("%3A")[2];
        // console.log(currentTrackId)


        const innerMostDiv = document.querySelector("main[aria-label=Spotify] > div > div:nth-child(2)");

        const innerMostDivSpan = innerMostDiv.querySelector("span");
        if(!innerMostDivSpan) return;
        if(innerMostDivSpan) innerMostDivSpan.remove();

        const singleDiv = document.createElement("div")
        innerMostDiv.appendChild(singleDiv);


        const apiUrl = `http://localhost:8181/api/lyrics/${currentTrackId}`
        const response = await fetch(apiUrl)
        if(!response.ok) {
            return;
        }
        const json = await response.json();


        for(const line of json.lyric.lyrics.lines){
            const outerDiv = document.createElement("div");
            outerDiv.setAttribute("dir", "auto");
            outerDiv.setAttribute("data-testid", "fullscreen-lyric");

            const innerDiv = document.createElement("div");
            innerDiv.textContent = line.words
            outerDiv.appendChild(innerDiv)
            singleDiv.appendChild(outerDiv);
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