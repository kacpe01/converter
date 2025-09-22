document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('main-nav');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainHeader = document.getElementById('main-header');

    if (!navContainer || !mobileNavToggle) return;

    // Generujemy JEDNĄ, kompletną nawigację. CSS decyduje, co pokazać.
    const navHTML = `
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

        <!-- Ten link jest tylko dla uproszczenia menu mobilnego -->
        <a href="https://kacpe01.github.io/converter/" class="mobile-only-link" style="display: none;">Konwerter Linków</a>

        <a href="https://kacpe01.github.io/kolekspreadsheet/">Spreadsheet</a>
    `;
    navContainer.innerHTML = navHTML;

    // --- OBSŁUGA MENU ---
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
        const desktopDropdown = navContainer.querySelector('.nav-dropdown-container');
        if (desktopDropdown && desktopDropdown.classList.contains('open')) {
            desktopDropdown.classList.remove('open');
        }
        if (navContainer.classList.contains('is-open')) {
            navContainer.classList.remove('is-open');
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
});```

---

#### **5. Plik `converter.js` (bez zmian)**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const AGENTS = {
        kakobuy: { name: 'Kakobuy', logo: 'https://raw.githubusercontent.com/kacpe01/assets/refs/heads/main/1200x1200bb.png', format: (id) => `https://kakobuy.com/item/details?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D${id}` },
        cnfans: { name: 'CNFans', logo: 'https://raw.githubusercontent.com/kacpe01/assets/refs/heads/main/0x0.png', format: (id) => `https://cnfans.com/product?id=${id}&platform=WEIDIAN` },
        acbuy: { name: 'ACBuy', logo: 'https://raw.githubusercontent.com/kacpe01/assets/refs/heads/main/3333acbuy.png', format: (id) => `https://www.acbuy.com/product?id=${id}&source=WD` },
        lovegobuy: { name: 'Lovegobuy', logo: 'https://raw.githubusercontent.com/kacpe01/assets/refs/heads/main/communityIcon_7puh8sbad05e1.png', format: (id) => `https://lovegobuy.com/product?id=${id}&shop_type=weidian` },
        mulebuy: { name: 'Mulebuy', logo: 'https://raw.githubusercontent.com/kacpe01/assets/refs/heads/main/mulebuy.png', format: (id) => `https://mulebuy.com/product?id=${id}&platform=WEIDIAN` },
        hoobuy: { name: 'Hoobuy', logo: 'https://raw.githubusercontent.com/kacpe01/assets/refs/heads/main/images.png', format: (id) => `https://hoobuy.com/product/2/${id}` }
    };
    
    const getItemId = (url) => {
        try {
            const urlObject = new URL(url);
            if (urlObject.searchParams.has('url')) {
                const innerUrl = new URL(urlObject.searchParams.get('url'));
                if (innerUrl.searchParams.has('itemID')) return innerUrl.searchParams.get('itemID');
            }
            if (urlObject.searchParams.has('itemID')) return urlObject.searchParams.get('itemID');
            if (urlObject.searchParams.has('id')) return urlObject.searchParams.get('id');
            const pathParts = urlObject.pathname.split('/');
            if (pathParts.length > 2 && !isNaN(pathParts[pathParts.length - 1])) return pathParts[pathParts.length - 1];
        } catch (e) { return null; }
        return null;
    };

    const convertButton = document.getElementById('convert-button');
    const linkInput = document.getElementById('link-input');
    const resultsContainer = document.getElementById('results-container');

    const handleConvert = () => {
        const url = linkInput.value.trim();
        if (!url) { alert("Proszę wkleić link."); return; }

        const itemId = getItemId(url);
        if (!itemId) { alert("Nieprawidłowy link. Nie udało się wyciągnąć ID produktu."); return; }

        resultsContainer.innerHTML = '';
        let delay = 0;
        for (const key in AGENTS) {
            const agent = AGENTS[key];
            const convertedLink = agent.format(itemId);
            
            const button = document.createElement('a');
            button.href = convertedLink;
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
            button.className = 'result-button';
            button.style.setProperty('--delay', `${delay}ms`);
            button.innerHTML = `<img src="${agent.logo}" alt="${agent.name} logo"><span>${agent.name}</span>`;
            
            resultsContainer.appendChild(button);
            delay += 60;
        }
    };

    convertButton.addEventListener('click', handleConvert);
    linkInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleConvert(); });
});
