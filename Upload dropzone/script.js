const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];

const inputFiles = document.querySelectorAll(".dropzone-area input[Type='file']");

const inputElement = inputFiles[0];

const dropZoneElement = inputElement.closest(".dropzone-area");
inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
        updateDropzonerFileList(dropZoneElement, inputElement.files[0]);

    }
});

dropZoneElement.addEventListener
    ("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add
            ("dropzone--over");

    });
["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("dropzone--over");

    });
});

dropZoneElement.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        
        updateDropzonerFileList(dropZoneElement, e.dataTransfer.files[0]);
        
    }
    dropZoneElement.classList.remove("dropzone--over");
});

const updateDropzonerFileList = (dropZoneElement, file) => {
    let dropzonerFileMessage = dropZoneElement.querySelector(".message");

    dropzonerFileMessage.innerHTML = `${file.name},${file.size} bytes`;
};

dropzoneBox.addEventListener("reset", (e) => {
    let dropzonerFileMessage = dropZoneElement = dropZoneElement.querySelector('.message');

    dropzonerFileMessage.innerHTML = 'No Files Selected';

});

dropzoneBox.addEventListener("submit", (e) => {
    e.preventDefault();
    const myfiled = document.getElementById("upload-file");
    console.log(myfiled.files[0]);
});