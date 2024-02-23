// const spotifyUrl = "https://open.spotify.com"

// chrome.runtime.onInstalled.addListener(async(tab) => {
//     if(tab.url.startsWith(spotifyUrl)){
//         const prevState = await chrome.action.getBadgeText({tabId: tab.id});
//         const nextState = prevState === "ON" ? "OFF" : "ON"

//         await chrome.action.setBadgeText({
//             tabId: tab.id,
//             text: nextState
//         })

//         console.log(tab.id);
//     }
// })