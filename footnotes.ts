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
    let href: string;

    let fnContainer = document.getElementById(fnContainerName);
    if (fnContainer && window.getComputedStyle(fnContainer, null).display === 'block') {
        sidenote = true;
        href = "#sidenote";
    } else {
        href = "#footnote";
    }

    let footnotes = document.querySelectorAll(window.fnSelector);
    for (fn of footnotes) {
        counter += 1;

        fn.style.display = 'none';
        fn.classList.add('rounded', 'bg-gray-900', 'px-2', 'py-1', 'my-1', 'shadow-well');

        // remove the footnote number if it already exists so that we can update it after the resize
        let expired_fn = document.getElementById('reference' + String(counter));
        if (expired_fn) {
            expired_fn.remove();
        }

        let reference = document.createElement('sup');
        reference.id = "reference" + String(counter);
        let link = document.createElement('a');
        link.innerHTML = String(counter);
        link.classList.add('link');
        link.setAttribute('href', href + String(counter));
        reference.appendChild(link);
        fn.insertAdjacentHTML('beforebegin', reference.outerHTML);

        if (sidenote) {
            // add fn.innerHTML to fnContainer
            let _fn = fn;
            let _ref = document.getElementById("reference" + String(counter));

            _ref.addEventListener("click", function() {
                if (_fn.style.display === "none") {
                    _fn.style.display = "block";
                } else {
                    _fn.style.display = "none";
                }
            }, false);
        } else {
            let _fn = fn;
            let _ref = document.getElementById("reference" + String(counter));
            _ref.addEventListener("click", function() {
                if (_fn.style.display === "none") {
                    _fn.style.display = "block";
                } else {
                    _fn.style.display = "none";
                }
            }, false);
        }
    }
}
