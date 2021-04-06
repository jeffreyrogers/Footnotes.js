const fnContainerName = "footnote-container";

// Haters will say you shouldn't use globals, but this is the clearest way to handle this in my opinion.
declare global {
    var resizeTimeout; // prevent triggering resize handler until resize is completed.
    var fnSelector;    // the CSS selector that grabs the footnotes from the document
}

export default {
    init: function (selector: string = "span.footnote") {
        window.fnSelector = selector;
        window.onresize = function(event) {
            clearTimeout(window.resizeTimeout);
            window.resizeTimeout = setTimeout(updateFootnotes, 200);
        }
        window.onload = function(event) {
            updateFootnotes();
        }
    }
};

function updateFootnotes() {
    let counter: number = 0;
    let fn: any;
    let sidenote: boolean = false;

    console.log(fnContainerName);
    let fnContainer = document.getElementById(fnContainerName);
    if (fnContainer && window.getComputedStyle(fnContainer, null).display === 'block') {
        sidenote = true;
    }

    let footnotes = document.querySelectorAll(window.fnSelector);
    for (fn of footnotes) {
        counter += 1;

        fn.style.display = 'block';
        fn.classList.add('block', 'rounded', 'bg-gray-900', 'px-2', 'py-1', 'my-1', 'shadow-well');

        // remove the footnote number if it already exists so that we can update it after the resize
        let expired_fn = document.getElementById('footnote' + String(counter));
        if (expired_fn) {
            expired_fn.remove();
        }

        let reference = document.createElement('sup');
        let link = document.createElement('a');
        link.id = "footnote" + String(counter);
        link.innerHTML = String(counter);
        link.classList.add('link');
        link.setAttribute('href', '#ref' + String(counter));
        reference.appendChild(link);
        fn.insertAdjacentHTML('beforebegin', reference.outerHTML);
    }
}
