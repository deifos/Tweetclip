chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: "Summon Twittclip(pop up will show when img is ready)",
        contexts: ["page", "selection", "image", "link"],
        id: "twittclip",
    });
})


chrome.contextMenus.onClicked.addListener(summonTwittclip);

function summonTwittclip(info, tab) {
    const linkUrl = info.linkUrl;
    if (!linkUrl.match(/^https?:\/\/twitter\.com\/.*\/status\/\d+/)) {
        return;
    }

    const apiUrl =
        "http://localhost:3000/api/gettweet?tweetLink=" + encodeURIComponent(linkUrl);
    fetch(apiUrl)
        .then((response) => response.text())
        .then((dataUrl) => {
            chrome.storage.local.set({ "twittclip-image": dataUrl });
            const notificationId = 'id123'

            const options = {
                type: 'basic',
                iconUrl: 'images/get_started16.png',
                title: 'TweetClip is ready',
                message: 'Please open the pop up on the top bar to see the image',
            }

            const callback = notificationId => console.log('notificationId: ', notificationId)

            chrome.notifications.create(notificationId, options, callback)

        })
        .catch((error) => {
            console.error(error);
        });
}