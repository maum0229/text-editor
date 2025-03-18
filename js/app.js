// Get references to all the buttons and inputs
const boldBtn = document.querySelector('#boldBtn');
const italicBtn = document.querySelector('#italicBtn');
const underlineBtn = document.querySelector('#underlineBtn');
const strikeBtn = document.querySelector('#strikeBtn');
const superscriptBtn = document.querySelector('#superscriptBtn');
const subscriptBtn = document.querySelector('#subscriptBtn');

const orderedListBtn = document.querySelector('#orderedListBtn');
const unorderedListBtn = document.querySelector('#unorderedListBtn');
const indentBtn = document.querySelector('#indentBtn');
const outdentBtn = document.querySelector('#outdentBtn');

const alignLeftBtn = document.querySelector('#alignLeftBtn');
const alignCenterBtn = document.querySelector('#alignCenterBtn');
const alignRightBtn = document.querySelector('#alignRightBtn');

const linkBtn = document.querySelector('#linkBtn');
const fontSizeSelect = document.querySelector('#fontSizeSelect');
const textColor = document.querySelector('#textColor');
const bgColor = document.querySelector('#bgColor');
const clearFormattingBtn = document.querySelector('#clearFormattingBtn');

// Get references to heading buttons
const h1Btn = document.querySelector('#h1Btn');
const h2Btn = document.querySelector('#h2Btn');
const h3Btn = document.querySelector('#h3Btn');
const h4Btn = document.querySelector('#h4Btn');
const h5Btn = document.querySelector('#h5Btn');
const h6Btn = document.querySelector('#h6Btn');

// Function to execute a command
function execCommand(command, value = null) {
    document.execCommand(command, false, value);
}

// Add event listeners for all buttons
boldBtn.addEventListener('click', () => execCommand('bold'));
italicBtn.addEventListener('click', () => execCommand('italic'));
underlineBtn.addEventListener('click', () => execCommand('underline'));
strikeBtn.addEventListener('click', () => execCommand('strikeThrough'));
superscriptBtn.addEventListener('click', () => execCommand('superscript'));
subscriptBtn.addEventListener('click', () => execCommand('subscript'));

// List buttons (ordered and unordered)
orderedListBtn.addEventListener('click', () => execCommand('insertOrderedList'));
unorderedListBtn.addEventListener('click', () => execCommand('insertUnorderedList'));

// Indentation buttons
indentBtn.addEventListener('click', () => execCommand('indent'));
outdentBtn.addEventListener('click', () => execCommand('outdent'));

// Alignment buttons
alignLeftBtn.addEventListener('click', () => execCommand('justifyLeft'));
alignCenterBtn.addEventListener('click', () => execCommand('justifyCenter'));
alignRightBtn.addEventListener('click', () => execCommand('justifyRight'));

// Add/Remove Link Button
linkBtn.addEventListener('click', () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        const url = prompt('Enter the URL for the link:', 'https://');
        if (url == 'https://') {
            execCommand('unlink');
            // console.log('no url');
        }else {
            execCommand('createLink', url);
            // console.log(url);
        }
    } 
});

// Get references to Undo and Redo buttons
const undoBtn = document.querySelector('#undoBtn');
const redoBtn = document.querySelector('#redoBtn');

// Add event listeners for Undo and Redo functionality
undoBtn.addEventListener('click', () => {
    execCommand('undo');
});

redoBtn.addEventListener('click', () => {
    execCommand('redo');
});


// Text Color and Background Color
textColor.addEventListener('input', () => {
    const color = textColor.value;
    execCommand('foreColor', color);
});

bgColor.addEventListener('input', () => {
    const color = bgColor.value;
    execCommand('backColor', color);
});

// Clear Formatting
clearFormattingBtn.addEventListener('click', () => execCommand('removeFormat'));

// Event listeners to change the selected text to headings
h1Btn.addEventListener('click', () => {
    execCommand('formatBlock', false, 'h1');
});

h2Btn.addEventListener('click', () => {
    execCommand('formatBlock', false, 'h2');
});

h3Btn.addEventListener('click', () => {
    execCommand('formatBlock', false, 'h3');
});

h4Btn.addEventListener('click', () => {
    execCommand('formatBlock', false, 'h4');
});

h5Btn.addEventListener('click', () => {
    execCommand('formatBlock', false, 'h5');
});

h6Btn.addEventListener('click', () => {
    execCommand('formatBlock', false, 'h6');
});


// Get references to the buttons and input elements
const insertImageBtn = document.querySelector('#insertImageBtn');
const imageUploadInput = document.querySelector('#imageUploadInput');
const imageDropdownBtn = document.querySelector('.dropdownBtn .fa-caret-down');
const imageDropdownContent = document.querySelector('.dropdownContent');

// Open the dropdown menu when the insert image button is clicked
imageDropdownBtn.addEventListener('click',()=>{
    imageDropdownContent.classList.toggle('show');
})

// Open the file input dialog when the insert image button is clicked
insertImageBtn.addEventListener('click', () => {
    imageUploadInput.click();
});

// Handle image upload
imageUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];  // Get the uploaded file
    if (file && file.type.startsWith('image')) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageUrl = e.target.result;  // Image data URL

            // Create an <img> element
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Inserted Image';
            img.classList.add('resizable'); // Add a class for resizing
            img.style.width = '200px'; // Set default width to 200px (without stretching)
            img.style.height = 'auto'; // Maintain aspect ratio
            img.style.position = 'absolute'; // To allow free movement
            img.style.top = '0px'; // Default position at the top
            img.style.left = '0px'; // Default position at the left

            // Make image draggable by adding event listeners
            img.addEventListener('mousedown', (e) => {
                let offsetX = e.clientX - img.offsetLeft;
                let offsetY = e.clientY - img.offsetTop;

                // Dragging the image
                const onMouseMove = (e) => {
                    img.style.left = `${e.clientX - offsetX}px`;
                    img.style.top = `${e.clientY - offsetY}px`;
                };

                const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });

            // Check if there's a valid selection range
            const selection = window.getSelection();
            const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

            if (range) {
                range.deleteContents(); // Delete selected content if any
                range.insertNode(img); // Insert the image node at the cursor position
            } else {
                const editor = document.querySelector('.textarea');
                editor.appendChild(img); // Insert the image at the end of the contenteditable area
            }

            // Ensure the cursor is after the inserted image (optional)
            const br = document.createElement('br');
            editor.appendChild(br);
        };

        // Read the uploaded image as a data URL
        reader.readAsDataURL(file);
    }
});



