const gif = new GIF({
    workers: 2,
    quality: 10,
    width: 341,
    height: 204,
    workerScript: 'gif.worker.js' // Usar el script local
});

document.getElementById('generateBtn').addEventListener('click', () => {
    const textInput = document.getElementById('textInput').value; // Tomar el texto del campo de texto
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
            
            // Convert preview to canvas with proper configuration
            html2canvas(preview, {
                logging: true,
                useCORS: true,
                backgroundColor: null,
                // willReadFrequently attribute should be set directly on the canvas context
            }).then(canvas => {
                try {
                    if (canvas && canvas.getContext) {
                        console.log('Canvas captured:', canvas);
                        gif.addFrame(canvas, {delay: 100}); // Añadir el frame al gif
                    } else {
                        console.error('Invalid canvas:', canvas);
                    }
                } catch (error) {
                    console.error('Error adding frame:', error);
                }
                if (index < textInput.length) {
                    setTimeout(typeWriter, 100); // Ajustar la velocidad según sea necesario
                } else {
                    gif.render();
                }
                index++;
            }).catch(error => {
                console.error('Error converting preview to canvas:', error);
            });
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

gif.on('error', function(error) {
    console.error('GIF generation error:', error);
});
