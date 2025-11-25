/*! --------------------------------------------------------------------
 * btnToggleSidebar
 * --------------------------------------------------------------------*/
const wrapperApp = document.querySelector('#wrapperApp');
const sidebar = document.querySelector('.sidebarApp');
const btnToggleSidebar = document.querySelector('[data-btn="toggleSidebar"]');

// console.log(wrapperApp);
// console.log(sidebar);
// console.log(btnToggleSidebar);

btnToggleSidebar?.addEventListener('click', (e) => {
    e.preventDefault();
    wrapperApp.classList.toggle('sidebarMin');
});

/*! --------------------------------------------------------------------
 * changeSidebarClass
 * --------------------------------------------------------------------*/
const changeSidebarClass = () => {
    let bodyWidth = document.body.clientWidth;
    let maxWidth = '991';

    if (bodyWidth > maxWidth) {
        wrapperApp?.classList.remove('sidebarMin');
    } else if (bodyWidth <= maxWidth + 1) {
        wrapperApp?.classList.add('sidebarMin');
    }
};

window.addEventListener('resize', function () {
    changeSidebarClass();
});

changeSidebarClass();

/*! --------------------------------------------------------------------
 * navigation-active / Jquery
 * --------------------------------------------------------------------*/
const currentUrl = window.location.pathname;
const urlAudios = '/adm/pages/mediacenter/audios/';
const urlVideos = '/adm/pages/mediacenter/videos/';
const urlPreletor = '/adm/pages/mediacenter/preletor/';
const urlAdm = '/adm/pages/setup/administracao/';

if (currentUrl.includes(urlAudios)) {
    $(`.navSidebarApp a[href$="${urlAudios}listagem/index.asp"]`).parent('li').addClass('active');
} else if (currentUrl.includes(urlVideos)) {
    $(`.navSidebarApp a[href$="${urlVideos}listagem/index.asp"]`).parent('li').addClass('active');
} else if (currentUrl.includes(urlPreletor)) {
    $(`.navSidebarApp a[href$="${urlPreletor}listagem/index.asp"]`).parent('li').addClass('active');
} else if (currentUrl.includes(urlAdm)) {
    $(`.navSidebarApp a[href$="${urlAdm}listagem/index.asp"]`).parent('li').addClass('active');
} else {
    //link da pagina atual recebe active
    $('.navSidebarApp a[href$="' + currentUrl + '"]')
        .parent('li')
        .addClass('active');
}

//Add class active na a.nav-item filho da ul.sub-menu li.active
$('.navSidebarApp .sub-menu li.active').parents('.nav-item').addClass('active');

//Mantem submenu da li.active aberto(indo na .collapse mais proximo e add .show )
//Encontra a proxima .dropdow e atribui true na aria-expanded para a seta ficar para baixo V
$('.navSidebarApp .sub-menu li.active').parents('.collapse').addClass('show');
$('.navSidebarApp .sub-menu li.active').parents('.collapse').next('.dropdown').attr('aria-expanded', 'true');

/*! --------------------------------------------------------------------
 * PerfectScrollbar
 * --------------------------------------------------------------------*/
const contentSidebarApp = document.querySelector('.contentSidebarApp');

if (contentSidebarApp) {
    const psSidebar = new PerfectScrollbar('.contentSidebarApp');

    // Adiciona listener de 'touchstart' como passive
    contentSidebarApp.addEventListener('touchstart', function (event) {}, {
        passive: true,
    });

    // Adiciona listener de 'wheel' e 'touchmove' como passive para evitar bloqueio de scroll
    contentSidebarApp.addEventListener('wheel', function (event) {}, {
        passive: true,
    });
    contentSidebarApp.addEventListener('touchmove', function (event) {}, {
        passive: true,
    });

    // Atualiza o PerfectScrollbar se houver mudanÃ§as no conteÃºdo
    //psSidebar.update();
}
