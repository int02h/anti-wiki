function buildStyle(options) {
    let result = "user-select: text; -webkit-user-select: text;"
    if (options.resetColor) {
        result += "color: inherit;"
    }
    if (options.resetDecoration) {
        result += "text-decoration: inherit;"    
    }
    if (options.resetCursor) {
        result += "cursor: inherit;"
    }
    return result
}

function patchStyle(element, options) {
    let oldStyle = element.getAttribute("style") || ""
    element.setAttribute("style", oldStyle + buildStyle(options))
    element.setAttribute("draggable", "false")
}

function patchLinks(options) {
    let links = document.links;
    for (let i = 0; i < links.length; i++) {
        let link = links[i]
        patchStyle(link, options)
        if (options.suppressClicks) {
            link.href = "javascript:;"
            link.onclick = null
        }
    }
}

chrome.storage.sync.get(null, function (data) {
    patchLinks(data)
})