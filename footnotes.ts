// These constants can be customized to whatever values are appropriate for your application
const fnContainerName = "footnote-container";
const footnoteClasses = ['rounded', 'bg-gray-900', 'px-2', 'py-1', 'my-1', 'shadow-well'];
const linkClasses = ['link'];
const sidenoteClasses = ['mb-2'];

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

    // Since the sidenote container will only be visible if the page is wide enough to display
    // sidenotes, we simply check for its visibility to determine whether to handle references as
    // footnotes or sidenotes.
    let fnContainer = document.getElementById(fnContainerName);
    if (fnContainer && window.getComputedStyle(fnContainer, null).display === 'block') {
        sidenote = true;
        fnContainer.textContent = ""; // clear content (prevents re-adding the same footnotes)
        href = "#sidenote";
    } else {
        href = "#footnote";
    }

    let footnotes = document.querySelectorAll(window.fnSelector);
    for (fn of footnotes) {
        counter += 1;

        fn.style.display = 'none';
        fn.classList.add(...footnoteClasses);

        // remove the footnote number if it already exists so that we can update it after the resize
        let expired_fn = document.getElementById('reference' + String(counter));
        if (expired_fn) {
            expired_fn.remove();
        }

        let reference = document.createElement('sup');
        reference.id = "reference" + String(counter);
        let link = document.createElement('a');
        link.innerHTML = String(counter);
        link.classList.add(...linkClasses);
        link.setAttribute('href', href + String(counter));
        reference.appendChild(link);
        fn.insertAdjacentHTML('beforebegin', reference.outerHTML);

        if (sidenote) {
            // add fn.innerHTML to fnContainer
            console.log(fn.innerHTML);

            let sn = document.createElement('div');
            sn.classList.add(...sidenoteClasses);
            sn.innerHTML = String(counter) + ". " + fn.innerHTML;
            fnContainer.appendChild(sn);
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
