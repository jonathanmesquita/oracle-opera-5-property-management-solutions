/* Importar ou definir fontes (ex: Oswald para títulos, Roboto para corpo) */
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@300;400;700&display=swap');

:root {
    /* Cores inspiradas em Rockstar (tons escuros, acentos vibrantes) */
    --rockstar-bg-dark: #121212;
    --rockstar-primary-text: #E0E0E0;
    --rockstar-secondary-text: #A0A0A0;
    --rockstar-accent-red: #E74C3C; /* Ou um laranja vibrante */
    --rockstar-accent-blue: #3498DB;
    --rockstar-card-bg: #1C1C1C;
    --rockstar-border-light: #333;
    --rockstar-hover-glow: rgba(231, 76, 60, 0.3); /* Efeito de brilho ao passar o mouse */

    /* Tamanhos de fonte */
    --font-size-large-title: 3.5rem;
    --font-size-section-title: 2.2rem;
    --font-size-card-title: 1.6rem;
    --font-size-body: 1.1rem;
    --font-size-small: 0.9rem;
}

/* Reset básico e tipografia */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--rockstar-bg-dark);
    color: var(--rockstar-primary-text);
    line-height: 1.6;
    overflow-x: hidden; /* Evita scroll horizontal indesejado */
    position: relative; /* Para o overlay de fundo */
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* --- Background Overlay (Rockstar Style) --- */
.background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1; /* Fica atrás de todo o conteúdo */
    opacity: 0.15; /* Transparência para não distrair */
}

#video-background {
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover; /* Garante que o vídeo cubra toda a área */
}

/* --- Header --- */
.main-header {
    background-color: rgba(0, 0, 0, 0.7); /* Fundo semi-transparente */
    padding: 20px 0;
    border-bottom: 1px solid var(--rockstar-border-light);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(5px); /* Efeito de desfoque (moderno) */
}

.main-header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-family: 'Oswald', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--rockstar-accent-red);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.search-bar {
    padding: 10px 15px;
    border: 1px solid var(--rockstar-border-light);
    border-radius: 5px;
    background-color: var(--rockstar-card-bg);
    color: var(--rockstar-primary-text);
    width: 300px;
    font-size: var(--font-size-body);
    transition: all 0.3s ease;
}

.search-bar::placeholder {
    color: var(--rockstar-secondary-text);
}

.search-bar:focus {
    outline: none;
    border-color: var(--rockstar-accent-red);
    box-shadow: 0 0 10px var(--rockstar-hover-glow);
}

.search-button {
    background-color: var(--rockstar-accent-red);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    font-size: var(--font-size-body);
    font-weight: 700;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.search-button:hover {
    background-color: #C0392B; /* Tom mais escuro de vermelho */
    transform: translateY(-2px);
}

/* --- Main Content Layout (Flexbox para sidebar e conteúdo) --- */
.main-content {
    display: flex;
    gap: 30px;
    padding: 40px 0;
}

.sidebar {
    flex: 0 0 250px; /* Largura fixa para a sidebar */
    background-color: var(--rockstar-card-bg);
    padding: 25px;
    border-radius: 8px;
    border: 1px solid var(--rockstar-border-light);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.sidebar h2 {
    font-family: 'Oswald', sans-serif;
    font-size: var(--font-size-section-title);
    color: var(--rockstar-accent-blue); /* Ou outro destaque */
    margin-bottom: 20px;
    border-bottom: 2px solid var(--rockstar-border-light);
    padding-bottom: 10px;
}

.error-categories {
    list-style: none;
}

.error-categories li {
    margin-bottom: 10px;
}

.error-categories a {
    display: block;
    color: var(--rockstar-secondary-text);
    text-decoration: none;
    padding: 8px 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.error-categories a:hover,
.error-categories a.active {
    background-color: rgba(52, 152, 219, 0.1); /* Um leve brilho azul */
    color: var(--rockstar-accent-blue);
    transform: translateX(5px);
}

/* --- Error List Section (Grid para os cards) --- */
.error-list-section {
    flex-grow: 1;
}

.error-list-section h1 {
    font-family: 'Oswald', sans-serif;
    font-size: var(--font-size-large-title);
    color: var(--rockstar-primary-text);
    margin-bottom: 30px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.1); /* Leve brilho nos títulos */
}

.error-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.error-card {
    background-color: var(--rockstar-card-bg);
    padding: 25px;
    border-radius: 8px;
    border: 1px solid var(--rockstar-border-light);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Para botão ir para o final */
    position: relative;
    overflow: hidden; /* Para o efeito de hover */
}

.error-card::before { /* Efeito de borda luminosa ao passar o mouse */
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(transparent 0%, var(--rockstar-accent-red) 50%, transparent 100%);
    transform: rotate(0deg);
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
    z-index: 0;
}

.error-card:hover::before {
    opacity: 0.1;
    transform: rotate(360deg);
}

.error-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    border-color: var(--rockstar-accent-red);
}

.error-card > * { /* Garante que o conteúdo fique acima do ::before */
    position: relative;
    z-index: 1;
}

.error-code {
    font-family: 'Oswald', sans-serif;
    font-size: var(--font-size-card-title);
    color: var(--rockstar-accent-red);
    margin-bottom: 10px;
}

.error-message {
    color: var(--rockstar-secondary-text);
    font-size: var(--font-size-body);
    flex-grow: 1; /* Faz a mensagem ocupar o espaço disponível */
    margin-bottom: 15px; /* Espaço antes do botão */
}

.view-details-btn {
    display: inline-flex; /* Para alinhar a seta */
    align-items: center;
    color: var(--rockstar-accent-blue);
    text-decoration: none;
    font-weight: 700;
    transition: color 0.3s ease, transform 0.3s ease;
}

.view-details-btn:hover {
    color: var(--rockstar-primary-text);
    transform: translateX(5px);
}

.view-details-btn .arrow {
    margin-left: 5px;
    font-size: 1.2em; /* Seta um pouco maior */
    transition: transform 0.3s ease;
}

.view-details-btn:hover .arrow {
    transform: translateX(3px);
}

/* --- Error Detail Section (Hidden por padrão, mostrado via JS) --- */
.error-detail-section {
    background-color: var(--rockstar-card-bg);
    padding: 30px;
    border-radius: 8px;
    border: 1px solid var(--rockstar-border-light);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
    position: relative;
    animation: fadeIn 0.5s ease-out; /* Animação ao aparecer */
}

.hidden {
    display: none;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.back-button {
    background: none;
    border: 1px solid var(--rockstar-accent-blue);
    color: var(--rockstar-accent-blue);
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: var(--font-size-body);
    margin-bottom: 25px;
    transition: all 0.3s ease;
}

.back-button:hover {
    background-color: var(--rockstar-accent-blue);
    color: var(--rockstar-primary-text);
}

.detail-error-code {
    font-family: 'Oswald', sans-serif;
    font-size: 3.2rem;
    color: var(--rockstar-accent-red);
    margin-bottom: 10px;
    text-shadow: 0 0 15px var(--rockstar-hover-glow);
}

.detail-error-message {
    font-size: 1.5rem;
    color: var(--rockstar-primary-text);
    margin-bottom: 30px;
    font-weight: 300;
}

.detail-content h3 {
    font-family: 'Oswald', sans-serif;
    font-size: var(--font-size-section-title);
    color: var(--rockstar-accent-blue);
    margin-top: 30px;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--rockstar-border-light);
    padding-bottom: 8px;
}

.detail-content p, .detail-content ul, .detail-content ol {
    font-size: var(--font-size-body);
    color: var(--rockstar-secondary-text);
    margin-bottom: 15px;
    padding-left: 20px; /* Para listas */
}

.detail-content ul li::marker {
    color: var(--rockstar-accent-red); /* Marcadores de lista coloridos */
}

.detail-content ol li::marker {
    color: var(--rockstar-accent-blue);
}

.detail-content a {
    color: var(--rockstar-accent-blue);
    text-decoration: none;
    transition: color 0.3s ease;
}

.detail-content a:hover {
    color: var(--rockstar-primary-text);
    text-decoration: underline;
}

.report-issue-btn {
    background-color: var(--rockstar-accent-blue);
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: var(--font-size-body);
    font-weight: 700;
    margin-top: 30px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.report-issue-btn:hover {
    background-color: #2980B9;
    transform: translateY(-2px);
}

/* --- Footer --- */
.main-footer {
    background-color: rgba(0, 0, 0, 0.7);
    color: var(--rockstar-secondary-text);
    text-align: center;
    padding: 20px 0;
    border-top: 1px solid var(--rockstar-border-light);
    font-size: var(--font-size-small);
}

/* Responsividade Básica */
@media (max-width: 768px) {
    .main-header .container {
        flex-direction: column;
        gap: 15px;
    }
    .main-content {
        flex-direction: column;
    }
    .sidebar {
        flex: none;
        width: 100%;
    }
    .search-bar {
        width: 100%;
    }
    .detail-error-code {
        font-size: 2.5rem;
    }
    .detail-error-message {
        font-size: 1.2rem;
    }
}
