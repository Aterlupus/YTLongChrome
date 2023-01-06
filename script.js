chrome.runtime.onMessage.addListener(function(request) {
	if (request.message === 'YTLong' && isOnYoutubeShort()) {
		document.location = "https://www.youtube.com/watch?v=" + getCurrentVideoId();
	}
});

function isOnYoutubeShort()
{
	return document.URL.includes("youtube.com/shorts/");
}

function getCurrentVideoId()
{
	let url = new URL(document.URL);
	let matches = url.pathname.match(/shorts\/([A-Za-z0-9-_]*)/);

	return matches[1];
}
