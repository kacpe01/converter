document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('main-nav');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainHeader = document.getElementById('main-header');

    if (!navContainer || !mobileNavToggle) return;

    // Generujemy JEDNĄ nawigację, a CSS decyduje, co pokazać
    const navHTML = `
        <a href="https://kolekreps.pages.dev/">Strona Główna</a>

        <!-- Ten element będzie widoczny tylko na desktopie dzięki CSS -->
        <div class="nav-dropdown-container">
            <button class="nav-dropdown-toggle">
                <span>Narzędzia</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
            </button>
            <div class="nav-dropdown-menu">
                <a href="https://kacpe01.github.io/converter/">Konwerter Linków</a>
            </div>
        </div>

        <!-- Ten link będzie widoczny tylko w mobilnym menu -->
        <a href="https://kacpe01.github.io/converter/" style="display: none;" class="mobile-only-link">Konwerter Linków</a>

        <a href="https://kolekspreadsheet.pages.dev/">Spreadsheet</a>
    `;
    navContainer.innerHTML = navHTML;

    // Logika dla menu
    const desktopToggle = navContainer.querySelector('.nav-dropdown-toggle');
    
    desktopToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        desktopToggle.parentElement.classList.toggle('open');
    });

    mobileNavToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navContainer.classList.toggle('is-open');
    });

    document.addEventListener('click', (e) => {
        if (desktopToggle.parentElement.classList.contains('open')) {
            desktopToggle.parentElement.classList.remove('open');
        }
        if (navContainer.classList.contains('is-open') && !navContainer.contains(e.target) && !mobileNavToggle.contains(e.target)) {
            navContainer.classList.remove('is-open');
        }
    });

    // Logika przewijania nagłówka
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
    }
});
