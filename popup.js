// popup.js
document.getElementById('sendButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value;

    // Send the input value to the background script
    chrome.runtime.sendMessage({ type: 'SEND_TO_CONTENT', data: userInput });

    chrome.storage.sync.set({ 'value': userInput }, () => {
        // console.log('Value is set to ' + userInput);
    })

    document.getElementById('response').textContent
        = `the speed will be increased by ${userInput} (wink emoji)`;
});


document.getElementById('reset').addEventListener('click', () => {
    chrome.storage.sync.set({ 'value': 0 }, () => {
        // console.log('Value is reset');
    })

    document.getElementById('response').textContent
        = `the speed will be reset to 0 (why would you do that?)(devil being sad emoji)`;
});