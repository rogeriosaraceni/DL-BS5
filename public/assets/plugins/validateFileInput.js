function validateFileInput(inputFile) {
    const input = inputFile;
    const bite = parseInt(input.dataset.fileBite, 10);
    const extensionsText = input.dataset.fileExtensions || '';
    const extensions = extensionsText ? new RegExp(`(${extensionsText.split(', ').join('|')})$`, 'i') : null;

    if (input.files && input.files.length > 0) {
        for (const file of input.files) {
            const fileName = file.name;

            if (extensions && !extensions.test(fileName)) {
                alert(`Fora das extensões permitidas: ${extensionsText}`);
                input.value = '';
                return false;
            }

            if (bite && file.size > bite) {
                const maxMB = (bite / (1024 * 1024)).toFixed(0).replace('.', ',');
                alert(`Excede o tamanho máximo de ${maxMB} MB`);
                input.value = '';
                return false;
            }
        }
    }
}
