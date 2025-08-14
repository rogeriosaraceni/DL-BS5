(function ($) {
    $.fn.selectIcons = function (options) {
        const settings = $.extend(
            {
                urlJson: '/assets/plugins/select-icons/select-icons.json', // valor fixo
                displayShow: 'd-flex',
                inputSelector: '[data-selectInputIcon="input_icon"]',
            },
            options,
        );

        return this.each(function () {
            const $container = $(this);
            const $button = $container.find('[data-selectIcons="button"]');
            const $content = $container.find('[data-selectIcons="content"]');
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
                $content.html(iconsHtml);
            }

            function bindEvents() {
                // Abrir select
                $button.on('click', function (e) {
                    e.stopPropagation();
                    $content.toggleClass(settings.displayShow);
                });

                // Selecionar ícone
                $content.on('click', '[data-content="icon"]', function () {
                    const iconClass = $(this).data('icon');
                    const selectedValue = $(this).data('value');
                    $button.html(`<i class="${iconClass}"></i>`);
                    $content.removeClass(settings.displayShow);

                    $(settings.inputSelector).val(iconClass);
                    console.log(iconClass, selectedValue);
                });

                // Fechar ao clicar fora
                $(document).on('click', function (e) {
                    if (!$button.is(e.target) && !$content.is(e.target) && $content.has(e.target).length === 0) {
                        $content.removeClass(settings.displayShow);
                    }
                });
            }

            init();
        });
    };
})(jQuery);
