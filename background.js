chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
	if (isOnYoutubeShort(changeInfo)) {
		chrome.tabs.sendMessage(tabId, {message: 'YTLong'});
	}
});

function isOnYoutubeShort(changeInfo)
{
	return changeInfo !== undefined && changeInfo.status === 'loading' && isYoutubeShortURL(changeInfo.url);
}

function isYoutubeShortURL(url)
{
	return url !== undefined && url.includes("youtube.com/shorts/");
}
