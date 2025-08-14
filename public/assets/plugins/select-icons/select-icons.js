function selectIcons(el, options = {}) {
    const container = typeof el === 'string' ? document.querySelector(el) : el;
    if (!container) return;

    const settings = Object.assign(
        {
            urlJson: '/assets/plugins/select-icons/select-icons.json',
            displayShow: 'd-flex',
            inputSelector: '[data-selectInputIcon="input_icon"]',
        },
        options,
    );

    const button = container.querySelector('[data-selectIcons="button"]');
    const content = container.querySelector('[data-selectIcons="content"]');
    let eventsConfigured = false;

    async function init() {
        try {
            const response = await fetch(settings.urlJson);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            renderIcons(data);

            if (!eventsConfigured) {
                bindEvents();
                eventsConfigured = true;
            }
        } catch (error) {
            console.error('Error fetching the icons:', error);
        }
    }

    function renderIcons(data) {
        const iconsHtml = data
            .map(
                ({ icon }) => `
            <div class="item" data-content="icon" data-value="${icon}" data-icon="${icon}">
                <i class="${icon}"></i>
            </div>
        `,
            )
            .join('');
        content.innerHTML = iconsHtml;
    }

    function bindEvents() {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            content.classList.toggle(settings.displayShow);
        });

        content.addEventListener('click', (e) => {
            const item = e.target.closest('[data-content="icon"]');
            if (item) {
                const iconClass = item.getAttribute('data-icon');
                const selectedValue = item.getAttribute('data-value');

                button.innerHTML = `<i class="${iconClass}"></i>`;
                content.classList.remove(settings.displayShow);

                const input = container.querySelector(settings.inputSelector);
                if (input) input.value = iconClass;

                console.log(iconClass, selectedValue);
            }
        });

        document.addEventListener('click', (e) => {
            if (!button.contains(e.target) && !content.contains(e.target)) {
                content.classList.remove(settings.displayShow);
            }
        });
    }

    init();
}
