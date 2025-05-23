document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const errorCategories = document.querySelector('.error-categories');
    const errorResultsDiv = document.getElementById('error-results');
    const errorListSection = document.querySelector('.error-list-section');
    const errorDetailSection = document.getElementById('error-detail-section');
    const backToListBtn = document.getElementById('back-to-list-btn');

    // Elementos de detalhes do erro
    const detailErrorCode = document.getElementById('detail-error-code');
    const detailErrorMessage = document.getElementById('detail-error-message');
    const detailDescription = document.getElementById('detail-description');
    const detailCauses = document.getElementById('detail-causes');
    const detailSolutions = document.getElementById('detail-solutions');
    const detailRelatedLinks = document.getElementById('detail-related-links');

    // Mock de dados de erros (substitua por uma API real ou arquivo JSON)
    const errorsData = [
        {
            id: 'err-conn-001',
            code: 'ERR-CONN-001',
            message: 'Falha na conexão com o servidor de aplicação.',
            category: 'conectividade',
            description: 'Este erro indica que o cliente não conseguiu estabelecer uma conexão de rede com o servidor principal da aplicação. Pode ser devido a problemas de rede, firewall ou o servidor estar offline.',
            causes: [
                'Servidor da aplicação offline ou inacessível.',
                'Problemas de rede local ou corporativa.',
                'Configurações de firewall bloqueando a porta da aplicação.',
                'Nome do host ou IP do servidor incorreto.',
                'VPN ou proxy configurado incorretamente.'
            ],
            solutions: [
                'Verifique se o servidor da aplicação está online e acessível.',
                'Confira as configurações de rede e conectividade do seu dispositivo.',
                'Verifique as regras do firewall (pessoal e corporativo) para a porta da aplicação.',
                'Confirme o endereço do servidor (hostname/IP) e a porta utilizada.',
                'Reinicie o aplicativo e o sistema operacional.'
            ],
            relatedLinks: [
                { text: 'Guia de Configuração de Rede', url: '#' },
                { text: 'Status do Servidor', url: '#' }
            ]
        },
        {
            id: 'err-auth-002',
            code: 'ERR-AUTH-002',
            message: 'Credenciais de usuário inválidas ou expiradas.',
            category: 'autenticacao',
            description: 'O nome de usuário ou senha fornecidos estão incorretos, ou a sua sessão de autenticação expirou. Este erro impede o acesso à aplicação.',
            causes: [
                'Nome de usuário ou senha digitados incorretamente.',
                'Conta de usuário bloqueada ou desativada.',
                'Senha expirada (requer redefinição).',
                'Problemas de sincronização de diretório (LDAP/AD).',
                'Tentativas de login excessivas.'
            ],
            solutions: [
                'Verifique o nome de usuário e a senha e tente novamente.',
                'Redefina sua senha através da funcionalidade "Esqueci minha senha".',
                'Contate o suporte de TI para verificar o status da sua conta.',
                'Aguarde alguns minutos em caso de bloqueio temporário por tentativas excessivas.'
            ],
            relatedLinks: [
                { text: 'Redefinição de Senha', url: '#' },
                { text: 'Políticas de Senha', url: '#' }
            ]
        },
        {
            id: 'err-db-003',
            code: 'ERR-DB-003',
            message: 'Erro ao acessar o banco de dados.',
            category: 'banco-dados',
            description: 'A aplicação encontrou um problema ao tentar se conectar ou executar uma operação no banco de dados. Isso pode indicar que o banco de dados está offline, inacessível ou há problemas com as credenciais.',
            causes: [
                'Banco de dados offline ou com falha.',
                'Credenciais do banco de dados incorretas ou expiradas.',
                'Conexão de rede entre a aplicação e o banco de dados falhou.',
                'Capacidade máxima de conexões do banco de dados atingida.',
                'Problemas de permissão do usuário no banco de dados.'
            ],
            solutions: [
                'Verifique o status do servidor de banco de dados.',
                'Confirme as credenciais de acesso ao banco de dados na configuração da aplicação.',
                'Verifique a conectividade de rede entre o servidor da aplicação e o servidor de banco de dados.',
                'Consulte os logs do banco de dados para mais detalhes sobre o erro específico.',
                'Aumente o limite de conexões do banco de dados, se aplicável.'
            ],
            relatedLinks: [
                { text: 'Monitoramento de Banco de Dados', url: '#' },
                { text: 'Configuração de Conexão DB', url: '#' }
            ]
        },
        // Adicione mais erros aqui com a mesma estrutura
    ];

    // Função para renderizar os cards de erro
    function renderErrorCards(filteredErrors) {
        errorResultsDiv.innerHTML = ''; // Limpa os resultados anteriores
        if (filteredErrors.length === 0) {
            errorResultsDiv.innerHTML = '<p class="no-results">Nenhum erro encontrado com os critérios de busca.</p>';
            return;
        }
        filteredErrors.forEach(error => {
            const card = document.createElement('article');
            card.classList.add('error-card');
            card.setAttribute('data-code', error.code);
            card.setAttribute('data-category', error.category);
            card.innerHTML = `
                <h3 class="error-code">${error.code}</h3>
                <p class="error-message">${error.message}</p>
                <a href="#" class="view-details-btn" data-error-id="${error.id}">Ver Detalhes <span class="arrow">→</span></a>
            `;
            errorResultsDiv.appendChild(card);
        });
        addCardEventListeners();
    }

    // Função para adicionar listeners aos botões de detalhes
    function addCardEventListeners() {
        document.querySelectorAll('.view-details-btn').forEach(button => {
            button.removeEventListener('click', showErrorDetails); // Evita múltiplos listeners
            button.addEventListener('click', showErrorDetails);
        });
    }

    // Função para exibir os detalhes do erro
    function showErrorDetails(event) {
        event.preventDefault();
        const errorId = event.currentTarget.dataset.errorId;
        const error = errorsData.find(e => e.id === errorId);

        if (error) {
            detailErrorCode.textContent = error.code;
            detailErrorMessage.textContent = error.message;
            detailDescription.textContent = error.description;

            // Causas
            detailCauses.innerHTML = '';
            error.causes.forEach(cause => {
                const li = document.createElement('li');
                li.textContent = cause;
                detailCauses.appendChild(li);
            });

            // Soluções (pode ser uma lista ordenada ou parágrafos)
            detailSolutions.innerHTML = '';
            if (Array.isArray(error.solutions)) {
                const ol = document.createElement('ol');
                error.solutions.forEach(solution => {
                    const li = document.createElement('li');
                    li.textContent = solution;
                    ol.appendChild(li);
                });
                detailSolutions.appendChild(ol);
            } else {
                detailSolutions.innerHTML = `<p>${error.solutions}</p>`;
            }


            // Links Relacionados
            detailRelatedLinks.innerHTML = '';
            error.relatedLinks.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link.url;
                a.textContent = link.text;
                a.target = '_blank'; // Abrir em nova aba
                li.appendChild(a);
                detailRelatedLinks.appendChild(li);
            });

            errorListSection.classList.add('hidden');
            errorDetailSection.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo
        }
    }

    // Voltar para a lista de erros
    backToListBtn.addEventListener('click', () => {
        errorDetailSection.classList.add('hidden');
        errorListSection.classList.remove('hidden');
    });

    // Funcionalidade de busca
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredErrors = errorsData.filter(error =>
            error.code.toLowerCase().includes(searchTerm) ||
            error.message.toLowerCase().includes(searchTerm) ||
            error.description.toLowerCase().includes(searchTerm)
        );
        renderErrorCards(filteredErrors);
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Funcionalidade de filtro por categoria
    errorCategories.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;
        if (target.tagName === 'A') {
            // Remove active de todos e adiciona no clicado
            document.querySelectorAll('.error-categories a').forEach(link => link.classList.remove('active'));
            target.classList.add('active');

            const category = target.dataset.category;
            const filteredErrors = errorsData.filter(error =>
                category === 'all' || error.category === category
            );
            renderErrorCards(filteredErrors);
        }
    });

    // Inicialização: Renderizar todos os erros no carregamento
    renderErrorCards(errorsData);
});
