document.addEventListener('DOMContentLoaded', function() {
    const lightModeBtn = document.getElementById('lightModeBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const body = document.body;
    const searchInputIndex = document.getElementById('searchInput');
    const helpSections = document.querySelectorAll('.help-categories-grid .category-preview');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Função para definir o tema e atualizar os botões
    const setTheme = (theme) => {
        if (theme === 'light') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            updateThemeButtons('light');
        } else if (theme === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            updateThemeButtons('dark');
        }
    };

    // Função para atualizar a aparência dos botões de tema
    const updateThemeButtons = (currentTheme) => {
        if (lightModeBtn && darkModeBtn) {
            lightModeBtn.classList.remove('active-light', 'inactive-light');
            darkModeBtn.classList.remove('active-dark', 'inactive-dark');

            if (currentTheme === 'light') {
                lightModeBtn.classList.add('active-light');
                darkModeBtn.classList.add('inactive-dark');
            } else {
                darkModeBtn.classList.add('active-dark');
                lightModeBtn.classList.add('inactive-light');
            }
        }
    };

    // Carregar tema salvo ou definir padrão
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || 'light');

    // Event listeners para os botões de tema
    if (lightModeBtn && darkModeBtn) {
        lightModeBtn.addEventListener('click', () => setTheme('light'));
        darkModeBtn.addEventListener('click', () => setTheme('dark'));
    }

    // Funcionalidade do menu responsivo
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
        });
    }

    // Função de pesquisa na documentação
    window.searchDocumentation = () => {
        if (searchInputIndex && helpSections) {
            const searchTerm = searchInputIndex.value.toLowerCase();
            let resultsFound = false;

            helpSections.forEach(section => {
                const title = section.querySelector('.category-title').textContent.toLowerCase();
                const links = section.querySelectorAll('.category-list .category-item a');
                let sectionVisible = false;

                if (title.includes(searchTerm)) {
                    section.style.display = 'block';
                    sectionVisible = true;
                    resultsFound = true;
                } else {
                    links.forEach(link => {
                        if (link.textContent.toLowerCase().includes(searchTerm)) {
                            section.style.display = 'block';
                            sectionVisible = true;
                            resultsFound = true;
                        }
                    });
                    section.style.display = sectionVisible ? 'block' : 'none';
                }
            });

            if (!resultsFound) {
                alert(`Nenhum resultado encontrado para: ${searchTerm}`);
            }
        }
    };

    // Adiciona evento de "Enter" na caixa de pesquisa
    if (searchInputIndex) {
        searchInputIndex.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchDocumentation();
            }
        });
    }
});