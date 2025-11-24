'use strict';

/** ////////////////////////////////////////////////////////////////////
 * Main JS
 *
 * - enable tooltips Bootstrap
 * - navbarSideCollapse Bootstrap
 * - mainAppMarginTop
 * - navigationActive
 * - fancybox
 *
 * - init functions
--------------------------------------------------------------------- */

/** --------------------------------------------------------------------
 * enable tooltips Bootstrap
--------------------------------------------------------------------- */
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

    tooltipList.forEach((tooltip, index) => {
        tooltipTriggerList[index].addEventListener('click', () => {
            tooltip.hide();
        });
    });
}

/** --------------------------------------------------------------------
 * navbarSideCollapse Bootstrap
--------------------------------------------------------------------- */
function initNavbarSideCollapse() {
    const btnNavbarSideCollapse = document.querySelector('#btnNavbarSideCollapse');
    const offcanvasCollapse = document.querySelector('.offcanvas-collapse');

    if (!btnNavbarSideCollapse || !offcanvasCollapse) {
        console.log('btnNavbarSideCollapse e offcanvasCollapse não encontrados');
        return;
    }
    btnNavbarSideCollapse.addEventListener('click', () => {
        offcanvasCollapse.classList.toggle('open');
    });
}

/** --------------------------------------------------------------------
 * mainAppMarginTop
--------------------------------------------------------------------- */
function initMainAppMarginTop() {
    const headerFixed = document.querySelector('[data-el="fixedTop"]');
    const mainApp = document.querySelector('[data-el="mainApp"]');

    if (!headerFixed || !mainApp) {
        //console.log('headerFixed e mainApp não encontrados');
        return;
    }
    const headerHeight = headerFixed.clientHeight + 'px';
    mainApp.style.marginTop = headerHeight;
}

/** --------------------------------------------------------------------
 * initNavigationsActive
--------------------------------------------------------------------- */
function initNavigationsActive() {
    const currentPath = window.location.pathname;
    const navbarApp = document.querySelector('.navbarApp');

    if (!navbarApp) {
        //console.log('.navbarApp não encontrada');
        return;
    }

    const links = navbarApp.querySelectorAll(`a[href$="${currentPath}"]`);

    links.forEach((link) => {
        const li = link.closest('li');
        const dropdown = link.closest('.dropdown');

        if (li) li.classList.add('active');
        if (dropdown) dropdown.classList.add('active');
    });
}

/** --------------------------------------------------------------------
 * fancybox
 * https://fancyapps.com/fancybox/plugins/html/#iframes
--------------------------------------------------------------------- */
function initFancybox() {
    const fancyboxElement = document.querySelector('[data-fancybox]');

    if (!fancyboxElement) {
        //console.log('[data-fancybox] não encontrado');
        return;
    }
    Fancybox.bind('[data-fancybox]', {});
}

/** --------------------------------------------------------------------
 * init functions
--------------------------------------------------------------------- */
initTooltips();
initNavbarSideCollapse();
initMainAppMarginTop();
initNavigationsActive();
initFancybox();
