function saveOption(name, value) {
    chrome.storage.sync.set({[name]: value}, onOptionsSaved);
}

function onOptionsSaved() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved';
    setTimeout(function() {
        status.textContent = '';
    }, 1000);
}

function loadOptions() {
    chrome.storage.sync.get(null, function (data) {
        let inputs = document.getElementsByTagName("input")
        for (let input of inputs) {
            if (input.type == "checkbox") {
                input.checked = data[input.name]
                input.onchange = function() {
                    saveOption(input.name, input.checked)
                }
            }
        }
    })
}

document.addEventListener('DOMContentLoaded', loadOptions);