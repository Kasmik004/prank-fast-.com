// Select the element to observe
const speedValueElement = document.getElementById('speed-value');

let add_value = 0;

chrome.storage.sync.get('value', (data) => {
    if (data.value) {
        add_value = parseInt(data.value, 10);
        // console.log('Retrieved value:', add_value);
    }
});




// Create a MutationObserver
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            // console.log('Speed value changed:', speedValueElement.textContent, add_value);

            // Convert text to integer
            let num = parseInt(speedValueElement.textContent, 10);

            if (!isNaN(num)) {
                // Update the element safely without triggering an infinite loop
                observer.disconnect(); // Stop observing temporarily
                speedValueElement.textContent = add_value + num;
                observer.observe(speedValueElement, { childList: true, characterData: true, subtree: true }); // Resume observing
            }
        }
    }
});

// Configure the observer
observer.observe(speedValueElement, { childList: true, characterData: true, subtree: true });

// Log the initial value
// console.log('Initial speed value:', speedValueElement.textContent);

// Change the value to trigger the observer
// speedValueElement.textContent = '1000';
