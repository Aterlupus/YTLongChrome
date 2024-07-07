
$(document).ready(function() {
    initializeButtonState();

    $('.button').click(function() {
        toggleExtensionState();
    });
});

function initializeButtonState() {
    chrome.storage.sync.get('enabled', function(data) {
        if (data['enabled'] ?? true) {
            $('#extension-popup').addClass('enabled');
        }
    });
}

function toggleExtensionState() {
    let extensionPopup = $('#extension-popup');
    extensionPopup.toggleClass('enabled');

    setExtensionEnabled(extensionPopup.hasClass('enabled'));
}

function setExtensionEnabled(enabled) {
    chrome.storage.sync.set({'enabled': enabled});
}
