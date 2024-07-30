document.addEventListener('DOMContentLoaded', () => {
    const bgColorInput = document.getElementById('bg-color');
    const fontSelect = document.getElementById('font-select');
    const saveButton = document.getElementById('save-button');

    if (chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.get(['settings'], (data) => {
            if (data.settings) {
                bgColorInput.value = data.settings.color;
                fontSelect.value = data.settings.font;
            }
        });

        saveButton.addEventListener('click', () => {
            const color = bgColorInput.value;
            const font = fontSelect.value;
            chrome.storage.sync.set({ settings: { color, font } }, () => {
                alert('Settings saved.');
            });
        });
    } else {
        console.error('chrome.storage.sync is not available.');
    }
});
