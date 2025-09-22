document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;

    navContainer.innerHTML = `
        <a href="index.html">Strona Główna</a>
        <div class="nav-dropdown-container">
            <button class="nav-dropdown-toggle">
                <span>Narzędzia</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
            </button>
            <div class="nav-dropdown-menu">
                <a href="converter.html">Konwerter Linków</a>
            </div>
        </div>
        <a href="https://kolekspreadsheet.pages.dev/">Spreadsheet</a>
    `;

    const toggle = navContainer.querySelector('.nav-dropdown-toggle');
    
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle.parentElement.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        if (toggle.parentElement.classList.contains('open')) {
            toggle.parentElement.classList.remove('open');
        }
    });
});
