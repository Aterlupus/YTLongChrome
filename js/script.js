
//TODO: consider: counter for how many times the user has been redirected or used transformed url

// Replace all short URLS with long URLs
//TODO: replace deprecated DOMNodeInserted
document.addEventListener('DOMNodeInserted', function() {
	runIfExtensionEnabled(() => convertShortHrefsToLong());
});

// In case user gets to a short regardless, redirect to long
chrome.runtime.onMessage.addListener(function(request) {
	if (isYTLongMessage(request) && isOnYouTubeShort()) {
		redirectToYoutubeLong();
	}
});

function isYTLongMessage(request)
{
	return request.message === 'YTLong';
}

function isOnYouTubeShort()
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

function convertShortHrefsToLong()
{
	$("a[href*='shorts']").each(function() {
		let href = $(this).attr('href');
		$(this).attr('href', href.replace(/\/shorts\//, '/watch?v='));
	});
}

function runIfExtensionEnabled(callback) {
	chrome.storage.sync.get('enabled', function(data) {
		if (data['enabled'] ?? true) {
			callback();
		}
	});
}
