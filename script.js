document.getElementById('generateBtn').addEventListener('click', () => {
    const textInput = document.getElementById('textInput').value;
    const preview = document.getElementById('animationPreview');
    preview.innerHTML = '';
    
    let index = 0;
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    preview.appendChild(cursor);

    const typeWriter = () => {
        if (index < textInput.length) {
            const span = document.createElement('span');
            span.textContent = textInput[index];
            preview.insertBefore(span, cursor);
            index++;
            setTimeout(typeWriter, 100); // Ajustar la velocidad según sea necesario
        }
    };
    typeWriter();
});
