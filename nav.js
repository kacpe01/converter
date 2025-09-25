document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('main-nav');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainHeader = document.getElementById('main-header');

    if (!navContainer || !mobileNavToggle) return;

    // --- Definicje ikon SVG ---
    const iconHome = `<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"/></svg>`;
    const iconTools = `<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4, 6.9, 1.5l9.1, 9.1c.4.4, 1,.4, 1.4, 0l2.4-2.4c.4-.4.4-1, 0-1.4z"/></svg>`;
    
    // --- PIERWSZA, ULEPSZONA IKONA WÓZKA ---
    const iconCart = `
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>`;
        
    // --- IKONA LINKU ---
    const iconLink = `
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
           <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8v-2z"></path>
        </svg>`;
        
    // Generujemy obie nawigacje
    const desktopNavHTML = `
        <div class="desktop-nav">
            <a href="https://kolekreps.pages.dev/">${iconHome} Strona Główna</a>
            <div class="nav-dropdown-container">
                <button class="nav-dropdown-toggle">
                    ${iconTools}
                    <span>Narzędzia</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5,0,0,1,.708,0L8,10.293l5.646-5.647a.5.5,0,0,1,.708,.708l-6,6a.5.5,0,0,1-.708,0l-6-6a.5.5,0,0,1,0-.708z"/></svg>
                </button>
                <div class="nav-dropdown-menu">
                    <a href="https://kacpe01.github.io/converter/">${iconLink} Konwerter Linków</a>
                </div>
            </div>
            <a href="https://kolekspreadsheet.pages.dev/">${iconCart} Spreadsheet</a>
        </div>
    `;

    const mobileNavHTML = `
        <div class="mobile-nav">
            <a href="https://kolekreps.pages.dev/">${iconHome} Strona Główna</a>
            <a href="https://kacpe01.github.io/converter/">${iconLink} Konwerter Linków</a>
            <a href="https://kolekspreadsheet.pages.dev/">${iconCart} Spreadsheet</a>
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
