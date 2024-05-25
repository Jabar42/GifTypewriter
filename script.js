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
    const textContainer = document.createElement('div');
    textContainer.style.width = '100%';
    textContainer.style.display = 'flex';
    textContainer.style.flexDirection = 'column';
    textContainer.style.alignItems = 'center';
    textContainer.style.position = 'absolute';
    preview.appendChild(textContainer);
    textContainer.appendChild(cursor);

    let lineHeight = 20; // Altura de cada línea de texto
    let maxLines = Math.floor(preview.clientHeight / lineHeight);

    // Calcular el retraso para 300 palabras por minuto
    const wordsPerMinute = 300;
    const charsPerWord = 5; // Promedio de caracteres por palabra
    const charsPerMinute = wordsPerMinute * charsPerWord;
    const delay = 60000 / charsPerMinute; // Milisegundos por carácter

    const typeWriter = () => {
        if (index < textInput.length) {
            const span = document.createElement('span');
            span.textContent = textInput[index];
            textContainer.insertBefore(span, cursor);

            if (textContainer.scrollHeight > preview.clientHeight) {
                textContainer.style.top = `-${textContainer.scrollHeight - preview.clientHeight}px`;
            }

            // Convert preview to high-resolution canvas
            html2canvas(preview, {
                logging: true,
                useCORS: true,
                backgroundColor: null,
                scale: 2 // Aumentar la escala para mayor nitidez
            }).then(canvas => {
                try {
                    const context = canvas.getContext('2d', { willReadFrequently: true });
                    if (context) {
                        console.log('Canvas context with willReadFrequently set:', context);
                        gif.addFrame(canvas, {delay: delay}); // Añadir el frame al gif
                    } else {
                        console.error('Invalid canvas context:', context);
                    }
                } catch (error) {
                    console.error('Error adding frame:', error);
                }
                if (index < textInput.length) {
                    setTimeout(typeWriter, delay); // Ajustar la velocidad según sea necesario
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
