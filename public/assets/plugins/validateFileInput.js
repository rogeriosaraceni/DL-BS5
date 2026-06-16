const fileStore = new WeakMap();

function validateFileInput(inputFile) {
    const input = inputFile;
    const isMultiple = input.multiple;
    const bite = parseInt(input.dataset.fileBite, 10);
    const extensionsText = input.dataset.fileExtensions || '';
    const extensions = extensionsText
        ? new RegExp(`(${extensionsText.split(', ').join('|')})$`, 'i')
        : null;

    // Se não é múltiplo, reseta o store a cada seleção
    const existing = isMultiple ? (fileStore.get(input) || []) : [];

    // Se não veio nenhum arquivo novo, restaura o que já estava
    if (!input.files || input.files.length === 0) {
        const dt = new DataTransfer();
        existing.forEach(f => dt.items.add(f));
        input.files = dt.files;
        return;
    }

    const existingNames = new Set(existing.map(f => f.name + f.size));
    const toAdd = [];

    for (const file of input.files) {
        if (existingNames.has(file.name + file.size)) continue;

        if (extensions && !extensions.test(file.name)) {
            alert(`Fora das extensões permitidas: ${extensionsText}\n(Ignorado: ${file.name})`);
            continue;
        }

        if (bite && file.size > bite) {
            const maxMB = (bite / (1024 * 1024)).toFixed(0);
            alert(`Excede o tamanho máximo de ${maxMB} MB\n(Ignorado: ${file.name})`);
            continue;
        }

        toAdd.push(file);
    }

    const merged = [...existing, ...toAdd];
    fileStore.set(input, merged);

    console.log('Arquivos acumulados:', merged.map(f => f.name));

    const dt = new DataTransfer();
    merged.forEach(f => dt.items.add(f));
    input.files = dt.files;
}

function resetFileInput(btn) {
    const name = btn.dataset.target;
    const input = document.querySelector(`input[name="${name}"]`);
    if (!input) return;

    fileStore.delete(input);
    input.value = '';
}