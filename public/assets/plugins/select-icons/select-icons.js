async function selectIcons() {
    try {
        const response = await fetch('/assets/plugins/select-icons/select-icons.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const selectIconContent = document.querySelector('[data-selectIcons="content"]');
        const selectIconButton = document.querySelector('[data-selectIcons="button"]');
        const displayShow = 'd-flex';

        selectIconContent.innerHTML = '';

        // monta select
        const iconsHtml = data
            .map(
                ({ icon }) => `
                    <div class="item" data-content="icon" data-value="${icon}" data-icon="${icon}">
                        <i class="${icon}"></i>
                    </div>
                `,
            )
            .join('');

        selectIconContent.innerHTML = iconsHtml;

        // Configurar eventos

        configureOpenSelect(selectIconButton, selectIconContent, displayShow);
        configureIconSelection(selectIconContent, selectIconButton, displayShow);
        configureCloseSelect(selectIconButton, selectIconContent, displayShow);
    } catch (error) {
        console.error('Error fetching the icons:', error);
    }

    // abre select
    function configureOpenSelect(selectIconButton, selectIconContent, displayShow) {
        selectIconButton.addEventListener('click', (event) => {
            event.stopPropagation();
            selectIconContent.classList.toggle(displayShow);
        });
    }

    // mostra o ícone selecionado
    function configureIconSelection(selectIconContent, selectIconButton, displayShow) {
        selectIconContent.addEventListener('click', (event) => {
            const item = event.target.closest('[data-content="icon"]');
            if (item) {
                const iconClass = item.getAttribute('data-icon');
                const selectedValue = item.getAttribute('data-value');
                selectIconButton.innerHTML = `<i class="${iconClass}"></i>`;
                selectIconContent.classList.remove(displayShow);

                const selectInput = document.querySelector('[data-selectInputIcon="input_icon"]');
                selectInput.value = iconClass;
                console.log(iconClass);
                console.log(selectedValue);
            }
        });
    }

    // fecha select clicando fora dele
    function configureCloseSelect(selectIconButton, selectIconContent, displayShow) {
        document.addEventListener('click', (event) => {
            if (!selectIconButton.contains(event.target) && !selectIconContent.contains(event.target)) {
                selectIconContent.classList.remove(displayShow);
            }
        });
    }
}

selectIcons();
