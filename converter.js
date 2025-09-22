document.addEventListener('DOMContentLoaded', () => {
    const AGENTS = {
        kakobuy: { name: 'Kakobuy', logo: 'https://imgur.com/gJd4wvQ.png', format: (id) => `https://kakobuy.com/item/details?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D${id}` },
        cnfans: { name: 'CNFans', logo: 'https://imgur.com/6Xjx6fC.png', format: (id) => `https://cnfans.com/product?id=${id}&platform=WEIDIAN` },
        acbuy: { name: 'ACBuy', logo: 'https://imgur.com/2n38uvs.png', format: (id) => `https://www.acbuy.com/product?id=${id}&source=WD` },
        lovegobuy: { name: 'Lovegobuy', logo: 'https://imgur.com/rM1gCZN.png', format: (id) => `https://lovegobuy.com/product?id=${id}&shop_type=weidian` },
        mulebuy: { name: 'Mulebuy', logo: 'https://imgur.com/u4n44B4.png', format: (id) => `https://mulebuy.com/product?id=${id}&platform=WEIDIAN` },
        hoobuy: { name: 'Hoobuy', logo: 'https://imgur.com/jxc2e7x.png', format: (id) => `https://hoobuy.com/product/2/${id}` }
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
        if (!url) return;

        const itemId = getItemId(url);
        if (!itemId) {
            alert("Nieprawidłowy link. Nie udało się wyciągnąć ID produktu.");
            return;
        }

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
