document.getElementById('generateBtn').addEventListener('click', () => {
    const textInput = document.getElementById('textInput').value;
    const preview = document.getElementById('animationPreview');
    preview.innerHTML = '';
    
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
            index++;
            setTimeout(typeWriter, 100); // Ajustar la velocidad según sea necesario
        }
    };
    typeWriter();
});
