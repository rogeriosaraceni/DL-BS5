$(document).ready(function() {
    updateActiveIcons();

    $('[data-wrapper="checkboxToggleIcon"] input[type="checkbox"]').on('change', function() {
        const wrapper = $(this).closest('[data-wrapper="checkboxToggleIcon"]'); 
        const isChecked = $(this).is(':checked'); 

        if (isChecked) {
            wrapper.find('input[type="checkbox"]').not(this).prop('checked', false);
        }
        updateActiveIcons();
    });
});

function updateActiveIcons() {
    $('[data-btn="points"]').removeClass('active');

    $('[data-wrapper="checkboxToggleIcon"] input[type="checkbox"]:checked').each(function() {
        $(this).closest('label').find('[data-btn="points"]').addClass('active');
    });
}