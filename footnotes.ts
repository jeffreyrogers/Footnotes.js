// These constants can be customized to whatever values are appropriate for your application
const fnContainerName = "footnote-container";
const footnoteClasses = ['rounded', 'bg-gray-900', 'px-2', 'py-1', 'my-1', 'shadow-well'];
const linkClasses = ['link'];
const sidenoteClasses = ['mb-2'];

// Haters will say you shouldn't use globals, but this is the clearest way to handle this in my opinion.
declare global {
    var resizeTimeout; // prevent triggering resize handler until resize is completed.
    var fnSelector;    // the CSS selector that grabs the footnotes from the document
    var lowestPos : number; // position of lowest sidenote (used to prevent overlapping sidenotes)
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
    window.lowestPos = 0;
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

        // Note: need to get this from the document or things below won't work properly.
        // Can't just use the created element above.
        let ref = document.getElementById("reference" + String(counter));

        // Note: if we don't do this assignment, fn gets reassigned every loop iteration
        // and only the last footnote gets styled
        let _fn = fn;

        if (sidenote) {
            // hide footnotes if any are currently being displayed
            _fn.style.display = "none";

            let sn = document.createElement('div');
            sn.id = "sidenote" + String(counter);
            sn.classList.add(...sidenoteClasses);
            sn.innerHTML = String(counter) + ". " + fn.innerHTML;
            fnContainer.appendChild(sn);

            sn.style.position = 'absolute';
            sn.style.top = String(calcOffset(sn, ref)) + "px";

            // bump up container height so that the container actually contains all the sidenotes
            fnContainer.style.height = (parseInt(sn.style.top, 10) + sn.offsetHeight) + "px";
        } else {

            ref.addEventListener("click", function() {
                if (_fn.style.display === "block") {
                    _fn.style.display = "none";
                } else {
                    _fn.style.display = "block";
                }
            }, false);
        }
    }
}

// calculate the offset for absolutely positioning the sidenote
function calcOffset(sidenote, ref) {
    let offset: number =
        ref.getBoundingClientRect().top -
        sidenote.offsetParent.getBoundingClientRect().top;

    if (offset < window.lowestPos) {
        offset = window.lowestPos;
    }

    window.lowestPos =
        offset +
        sidenote.offsetHeight +
        parseInt(window.getComputedStyle(sidenote).marginBottom) +
        parseInt(window.getComputedStyle(sidenote).marginTop);

    return offset;
}
