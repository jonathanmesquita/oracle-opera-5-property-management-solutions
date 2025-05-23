:root {
    /* Cores Inspiradas na Oracle (neutras, escuras) */
    --oracle-dark: #2C2C2C;
    --oracle-medium: #4A4A4A;
    --oracle-light: #F0F0F0;
    --oracle-text: #E0E0E0;

    /* Cores Inspiradas na Rockstar (contrastes, tons escuros, dourado/laranja para destaque) */
    --rockstar-bg-dark: #1A1A1A;
    --rockstar-accent-gold: #FFD700; /* Dourado */
    --rockstar-accent-orange: #FF8C00; /* Laranja mais intenso */
    --rockstar-text-light: #F5F5F5;
    --rockstar-border-light: #555;
}

/* Base Body & Layout */
body {
    font-family: 'Oswald', sans-serif; /* Fonte para o corpo, similar à Rockstar */
    margin: 0;
    padding: 0;
    background-color: var(--rockstar-bg-dark);
    color: var(--rockstar-text-light);
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Garante que o body ocupe a altura total da viewport */
    overflow-x: hidden; /* Evita scroll horizontal indesejado */
}

/* Header */
header {
    background-color: var(--oracle-dark);
    color: var(--oracle-text);
    padding: 1.5em 2em;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    position: relative; /* Para efeitos de fundo */
    overflow: hidden; /* Esconde o pseudo-elemento que transborda */
}

.header-content {
    position: relative;
    z-index: 1; /* Garante que o texto esteja acima do efeito */
}

header::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0) 70%); /* Efeito sutil Rockstar */
    opacity: 0.8;
    transform: rotate(45deg);
    animation: headerGlow 15s infinite linear; /* Animação de brilho sutil */
    pointer-events: none; /* Garante que não interfira com cliques */
}

@keyframes headerGlow {
    from { transform: rotate(0deg) scale(1); opacity: 0.05; }
    50% { transform: rotate(180deg) scale(1.1); opacity: 0.1; }
    to { transform: rotate(360deg) scale(1); opacity: 0.05; }
}

.system-title {
    font-family: 'Roboto Mono', monospace; /* Fonte mais "código" */
    font-size: 2.5em;
    margin: 0;
    letter-spacing: 0.1em;
    color: var(--rockstar-accent-gold); /* Destaque Rockstar */
    text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}

.doc-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.2em;
    margin-top: 0.5em;
    color: var(--oracle-light);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* Main Layout (Flexbox) */
main {
    display: flex;
    flex: 1; /* Permite que o main ocupe o espaço restante */
    padding: 20px;
    gap: 20px; /* Espaçamento entre sidebar e conteúdo */
}

/* Sidebar (Oracle-like organization) */
.sidebar {
    background-color: var(--oracle-dark);
    width: 280px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    overflow-y: auto; /* Scroll para a lista de erros se for longa */
    max-height: calc(100vh - 120px); /* Ajuste conforme a altura do header/footer */
}

#searchInput {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid var(--rockstar-border-light);
    background-color: var(--rockstar-bg-dark);
    color: var(--rockstar-text-light);
    border-radius: 4px;
    font-size: 0.9em;
    outline: none;
    transition: border-color 0.3s ease;
}

#searchInput::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

#searchInput:focus {
    border-color: var(--rockstar-accent-gold);
}

#errorList {
    list-style: none;
    padding: 0;
    margin: 0;
}

#errorList li {
    margin-bottom: 8px;
}

#errorList li a {
    display: block;
    padding: 10px 15px;
    color: var(--oracle-light);
    text-decoration: none;
    background-color: var(--oracle-medium);
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
    font-family: 'Roboto Mono', monospace; /* Fonte monoespaçada para códigos de erro */
    font-size: 0.95em;
    border-left: 5px solid transparent; /* Para destaque de item ativo */
}

#errorList li a:hover {
    background-color: var(--oracle-medium); /* Sem muita mudança para manter o estilo Oracle */
    color: var(--rockstar-accent-gold); /* Destaque no hover */
    border-left-color: var(--rockstar-accent-gold);
}

#errorList li a.active {
    background-color: var(--rockstar-accent-orange); /* Item ativo com cor Rockstar */
    color: var(--rockstar-text-light);
    font-weight: bold;
    border-left-color: var(--rockstar-accent-gold);
}

/* Error Detail Section (Rockstar-like presentation) */
.error-detail-section {
    flex: 1; /* Ocupa o restante do espaço */
    background-color: var(--oracle-dark); /* Fundo escuro */
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centraliza o conteúdo inicial */
    align-items: center; /* Centraliza o conteúdo inicial */
    text-align: center;
    position: relative; /* Para o efeito de borda animada */
    overflow: hidden; /* Esconde o pseudo-elemento de borda */
}

.error-detail-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid transparent; /* Borda transparente inicial */
    border-radius: 8px;
    background: linear-gradient(45deg, var(--rockstar-accent-gold), var(--rockstar-accent-orange), var(--rockstar-accent-gold)) border-box;
    -webkit-mask: /* Define a máscara para a borda */
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: borderPulse 4s infinite ease-in-out; /* Animação de pulso da borda */
    z-index: 0;
}

@keyframes borderPulse {
    0% { opacity: 0.3; transform: scale(0.99); }
    50% { opacity: 0.8; transform: scale(1); }
    100% { opacity: 0.3; transform: scale(0.99); }
}


.error-content-wrapper {
    background-color: rgba(0, 0, 0, 0.6); /* Fundo semi-transparente para o conteúdo */
    padding: 30px;
    border-radius: 6px;
    max-width: 800px;
    width: 100%;
    text-align: left; /* Alinhamento normal para o conteúdo interno */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
    position: relative; /* Para z-index */
    z-index: 1; /* Garante que esteja acima do efeito de borda */
    opacity: 0; /* Começa invisível e fade-in com JS */
    transform: translateY(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.error-content-wrapper.active {
    opacity: 1;
    transform: translateY(0);
}

.placeholder-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.8em;
    color: var(--rockstar-accent-gold);
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
    text-align: center;
    position: relative; /* Para o z-index */
    z-index: 1; /* Garante que o placeholder esteja acima do efeito de borda */
}

#errorDetailContent h2 { /* Título do erro */
    font-family: 'Roboto Mono', monospace;
    font-size: 2.2em;
    color: var(--rockstar-accent-gold);
    margin-bottom: 0.5em;
    border-bottom: 2px solid var(--rockstar-accent-orange);
    padding-bottom: 0.3em;
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.4);
}

#errorDetailContent h4 { /* Títulos de seção dentro do detalhe (Ex: "Descrição") */
    font-family: 'Oswald', sans-serif;
    font-size: 1.3em;
    color: var(--oracle-light);
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

#errorDetailContent p,
#errorDetailContent ul,
#errorDetailContent ol {
    font-family: Arial, sans-serif; /* Fonte mais legível para o corpo do texto */
    font-size: 1em;
    line-height: 1.6;
    color: var(--rockstar-text-light);
    margin-bottom: 1em;
}

#errorDetailContent code {
    background-color: var(--oracle-medium);
    color: var(--rockstar-accent-gold);
    padding: 3px 6px;
    border-radius: 4px;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.9em;
}

#errorDetailContent pre {
    background-color: var(--oracle-medium);
    color: var(--oracle-light);
    padding: 1em;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.9em;
    border: 1px solid var(--rockstar-border-light);
}

/* Footer */
footer {
    background-color: var(--oracle-dark);
    color: var(--oracle-text);
    text-align: center;
    padding: 1em;
    margin-top: auto; /* Empurra o rodapé para baixo */
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.4);
    font-family: Arial, sans-serif;
    font-size: 0.9em;
}

/* Responsividade */
