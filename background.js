chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
	if (isOnYoutubeShort(changeInfo)) {
		runRedirection(tabId);
	}
});

function runRedirection(tabId, repeatNo = 0)
{
	return chrome.tabs.sendMessage(tabId, {message: 'YTLong'}).catch(() => {
		if (repeatNo < 20) {
			setTimeout(
				() => { runRedirection(tabId, repeatNo + 1) },
				getRerunTimeout(repeatNo)
			);
		}
	});
}

function isOnYoutubeShort(changeInfo)
{
	return changeInfo !== undefined && changeInfo.status === 'loading' && isYoutubeShortURL(changeInfo.url);
}

function isYoutubeShortURL(url)
{
	return url !== undefined && url.includes("youtube.com/shorts/");
}

function getRerunTimeout(repeatNo)
{
	return repeatNo * 10;
}
