chrome.runtime.onMessage.addListener(function(request) {
	if (isYTLongMessage(request) && isOnYoutubeShort()) {
		redirectToYoutubeLong();
	}
});

function isYTLongMessage(request)
{
	return request.message === 'YTLong';
}

function isOnYoutubeShort()
{
	return document.URL.includes("youtube.com/shorts/");
}

function redirectToYoutubeLong()
{
	let url = "https://www.youtube.com/watch?v=" + getCurrentVideoId();
	window.location.replace(url);
}

function getCurrentVideoId()
{
	let url = new URL(document.URL);
	let matches = url.pathname.match(/shorts\/([A-Za-z0-9-_]*)/);

	return matches[1];
}
