const gif = new GIF({
    workers: 2,
    quality: 10,
    width: 341,
    height: 204
});

document.getElementById('generateBtn').addEventListener('click', () => {
    const textInput = document.getElementById('textInput').value;
    const preview = document.getElementById('animationPreview');
    const gifPreview = document.getElementById('generatedGif');
    preview.innerHTML = '';
    gifPreview.src = '';

    let index = 0;
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    preview.appendChild(cursor);

    let lineHeight = 20; // Altura de cada línea de texto
    let maxLines = Math.floor(preview.clientHeight / lineHeight);

    const typeWriter = () => {
        if (index < textInput.length) {
            if (preview.scrollHeight > preview.clientHeight) {
                preview.scrollTop += lineHeight;
            }
            const span = document.createElement('span');
            span.textContent = textInput[index];
            preview.insertBefore(span, cursor);
            gif.addFrame(preview, {delay: 100}); // Añadir el frame al gif
            index++;
            setTimeout(typeWriter, 100); // Ajustar la velocidad según sea necesario
        } else {
            gif.render();
        }
    };
    typeWriter();
});

gif.on('finished', function(blob) {
    const gifUrl = URL.createObjectURL(blob);
    document.getElementById('generatedGif').src = gifUrl;
});
