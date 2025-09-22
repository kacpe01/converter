document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('main-nav');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainHeader = document.getElementById('main-header');

    if (!navContainer || !mobileNavToggle) return;

    // Generujemy obie nawigacje
    const desktopNavHTML = `
        <div class="desktop-nav">
            <a href="https://kolekreps.pages.dev/">Strona Główna</a>
            <div class="nav-dropdown-container">
                <button class="nav-dropdown-toggle">
                    <span>Narzędzia</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
                </button>
                <div class="nav-dropdown-menu">
                    <a href="https://kacpe01.github.io/converter/">Konwerter Linków</a>
                </div>
            </div>
            <a href="https://kolekspreadsheet.pages.dev/">Spreadsheet</a>
        </div>
    `;

    const mobileNavHTML = `
        <div class="mobile-nav">
            <a href="https://kolekreps.pages.dev/">Strona Główna</a>
            <a href="https://kacpe01.github.io/converter/">Konwerter Linków</a>
            <a href="https://kolekspreadsheet.pages.dev/">Spreadsheet</a>
        </div>
    `;

    navContainer.innerHTML = desktopNavHTML + mobileNavHTML;

    // --- OBSŁUGA MENU ---
    const desktopToggle = navContainer.querySelector('.nav-dropdown-toggle');
    const mobileNavMenu = navContainer.querySelector('.mobile-nav');
    
    desktopToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        desktopToggle.parentElement.classList.toggle('open');
    });

    mobileNavToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileNavMenu.classList.toggle('is-open');
    });

    document.addEventListener('click', () => {
        if (desktopToggle.parentElement.classList.contains('open')) {
            desktopToggle.parentElement.classList.remove('open');
        }
        if (mobileNavMenu.classList.contains('is-open')) {
            mobileNavMenu.classList.remove('is-open');
        }
    });

    // --- LOGIKA PRZEWIJANIA NAGŁÓWKA ---
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
