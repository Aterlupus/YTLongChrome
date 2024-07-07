
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
	if (isOnYouTubeShort(changeInfo)) {
		runIfExtensionEnabled(() => runRedirection(tabId));
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

function isOnYouTubeShort(changeInfo)
{
	return changeInfo !== undefined && changeInfo.status === 'loading' && isYouTubeShortURL(changeInfo.url);
}

function isYouTubeShortURL(url)
{
	return url !== undefined && url.includes("youtube.com/shorts/");
}

function getRerunTimeout(repeatNo)
{
	return repeatNo * 10;
}

function runIfExtensionEnabled(callback) {
	chrome.storage.sync.get('enabled', function(data) {
		if (data['enabled'] ?? true) {
			callback();
		}
	});
}
