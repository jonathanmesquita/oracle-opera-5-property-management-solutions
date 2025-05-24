document.addEventListener('DOMContentLoaded', function() {
    const lightModeBtn = document.getElementById('lightModeBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const body = document.body;
    const searchInputTools = document.getElementById('searchInput');
    const toolItems = document.querySelectorAll('.tools-grid .tool-item');
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

    // Função de pesquisa na página de ferramentas
    window.searchTools = () => {
        if (searchInputTools && toolItems) {
            const searchTerm = searchInputTools.value.toLowerCase();
            let resultsFound = false;

            toolItems.forEach(tool => {
                const title = tool.querySelector('.tool-title').textContent.toLowerCase();
                const description = tool.querySelector('.tool-description').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    tool.style.display = 'block';
                    resultsFound = true;
                } else {
                    tool.style.display = 'none';
                }
            });

            if (!resultsFound) {
                alert(`Nenhuma ferramenta encontrada para: ${searchTerm}`);
            }
        }
    };

    // Adiciona evento de "Enter" na caixa de pesquisa
    if (searchInputTools) {
        searchInputTools.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchTools();
            }
        });
    }
});