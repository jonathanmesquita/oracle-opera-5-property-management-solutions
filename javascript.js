document.addEventListener('DOMContentLoaded', () => {
    // Dados de exemplo para os erros
    const errors = [
        {
            id: 'ORA-00942',
            title: 'ORA-00942: table or view does not exist',
            description: `Este erro ocorre quando a tabela ou view que você está tentando acessar não existe no esquema atual do usuário ou você não tem as permissões necessárias para acessá-la.`,
            solution: `
                <p><strong>Verifique o nome:</strong> Certifique-se de que o nome da tabela ou view na sua consulta SQL esteja correto e sem erros de digitação.</p>
                <p><strong>Verifique o esquema:</strong> Se a tabela/view pertence a outro esquema, você precisará prefixar o nome com o nome do esquema (ex: <code>OUTROS_ESQUEMA.MINHA_TABELA</code>).</p>
                <p><strong>Verifique as permissões:</strong> O usuário que executa a consulta precisa ter privilégios <code>SELECT</code> (ou <code>UPDATE</code>, <code>INSERT</code>, <code>DELETE</code>, conforme a operação) na tabela ou view.</p>
                <pre><code>-- Exemplo de como conceder permissão (executar como DBA ou proprietário da tabela):
GRANT SELECT ON MINHA_TABELA TO MEU_USUARIO;
FLUSH PRIVILEGES; -- Pode ser necessário em alguns sistemas de DB para aplicar as alterações imediatamente</code></pre>
                <p><strong>Sinônimo Público/Privado:</strong> Em alguns casos, um sinônimo pode ser necessário para objetos de banco de dados.</p>
            `
        },
        {
            id: 'ORA-01017',
            title: 'ORA-01017: invalid username/password; logon denied',
            description: `Este erro indica que você está tentando se conectar ao banco de dados Oracle com um nome de usuário ou senha incorretos.`,
            solution: `
                <p><strong>Verifique as credenciais:</strong> Confirme se o nome de usuário e a senha estão digitados corretamente, respeitando maiúsculas e minúsculas.</p>
                <p><strong>Status da conta:</strong> A conta pode estar bloqueada ou expirada. Contate o administrador do banco de dados para verificar o status da sua conta.</p>
                <p><strong>Serviço/SID incorreto:</strong> Certifique-se de que o nome do serviço ou SID (System Identifier) do banco de dados está correto na sua string de conexão.</p>
                <pre><code>-- Exemplo de desbloqueio de conta (executar como SYSDBA):
ALTER USER SEU_USUARIO ACCOUNT UNLOCK;
ALTER USER SEU_USUARIO IDENTIFIED BY sua_nova_senha;</code></pre>
            `
        },
        {
            id: 'ERR-001-API',
            title: 'ERR-001-API: Falha na Comunicação com API Externa',
            description: `O sistema não conseguiu estabelecer comunicação ou receber uma resposta válida de uma API externa crucial para a operação.`,
            solution: `
                <p><strong>Verifique a Conectividade:</strong> Certifique-se de que o servidor do sistema tem acesso à internet e que não há bloqueios de firewall para o endpoint da API.</p>
                <p><strong>Status da API Externa:</strong> Consulte a página de status da API externa ou entre em contato com o suporte da API para verificar se há interrupções no serviço.</p>
                <p><strong>Logs do Sistema:</strong> Verifique os logs do sistema para mensagens de erro mais detalhadas sobre a falha de conexão (URL da API, status HTTP, etc.).</p>
                <p><strong>Configuração da API:</strong> Confirme se as chaves de API, tokens ou credenciais de autenticação estão corretas e atualizadas nas configurações do sistema.</p>
                <pre><code>// Exemplo de log de erro (node.js)
console.error("API Error: Failed to connect to external service.", error.message);
// Exemplo de erro (Python)
logging.error(f"Failed to fetch data from API: {e}")</code></pre>
            `
        },
        {
            id: 'ERR-002-DB',
            title: 'ERR-002-DB: Falha na Conexão com o Banco de Dados',
            description: `O sistema não conseguiu estabelecer uma conexão com o banco de dados. Isso pode impedir qualquer operação que exija acesso a dados.`,
            solution: `
                <p><strong>Servidor de Banco de Dados:</strong> Verifique se o servidor do banco de dados está online e acessível.</p>
                <p><strong>Credenciais:</strong> Confirme as credenciais de conexão (usuário, senha, host, porta) configuradas no sistema. Podem ter sido alteradas ou expiradas.</p>
                <p><strong>Firewall/Rede:</strong> Verifique se há regras de firewall ou configurações de rede que estejam bloqueando a conexão do sistema ao banco de dados.</p>
                <p><strong>Limite de Conexões:</strong> O banco de dados pode ter atingido seu limite máximo de conexões ativas. Contate o DBA para verificar e ajustar, se necessário.</p>
            `
        },
        {
            id: 'ERR-003-PERM',
            title: 'ERR-003-PERM: Permissão Negada',
            description: `Um usuário ou o próprio sistema tentou realizar uma ação para a qual não possui as permissões necessárias.`,
            solution: `
                <p><strong>Permissões do Usuário:</strong> Se um usuário específico está recebendo este erro, verifique suas permissões de acesso dentro do sistema e/ou no banco de dados.</p>
                <p><strong>Permissões de Arquivo/Diretório:</strong> Se o erro envolve acesso a arquivos (ex: upload, leitura de configurações), verifique as permissões do sistema de arquivos (chmod/chown em Linux/Unix).</p>
                <p><strong>Credenciais do Serviço:</strong> Se um serviço ou processo do sistema está gerando o erro, verifique as credenciais com as quais ele está sendo executado e suas permissões associadas.</p>
                <pre><code># Exemplo de comando Linux para verificar permissões
ls -l /caminho/do/arquivo
# Exemplo de comando para mudar permissões (ATENÇÃO: use com cuidado)
chmod 755 /caminho/do/arquivo</code></pre>
            `
        }
    ];

    const errorList = document.getElementById('errorList');
    const searchInput = document.getElementById('searchInput');
    const errorDetailContent = document.getElementById('errorDetailContent');
    let activeErrorId = null;

    // Função para renderizar a lista de erros
    function renderErrorList(filter = '') {
        errorList.innerHTML = ''; // Limpa a lista existente
        const filteredErrors = errors.filter(error =>
            error.id.toLowerCase().includes(filter.toLowerCase()) ||
            error.title.toLowerCase().includes(filter.toLowerCase())
        );

        filteredErrors.forEach(error => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${error.id}`;
            link.textContent = error.id;
            link.setAttribute('data-error-id', error.id);
            link.classList.add('error-link');

            // Adiciona a classe 'active' se for o erro atualmente selecionado
            if (error.id === activeErrorId) {
                link.classList.add('active');
            }

            link.addEventListener('click', (e) => {
                e.preventDefault();
                displayErrorDetail(error.id);
                // Remove a classe 'active' de todos os links
                document.querySelectorAll('.error-link').forEach(l => l.classList.remove('active'));
                // Adiciona a classe 'active' ao link clicado
                link.classList.add('active');
            });
            listItem.appendChild(link);
            errorList.appendChild(listItem);
        });
    }

    // Função para exibir os detalhes do erro
    function displayErrorDetail(errorId) {
        const error = errors.find(e => e.id === errorId);
        if (error) {
            errorDetailContent.innerHTML = `
                <h2>${error.title}</h2>
                <h4>Descrição:</h4>
                <p>${error.description}</p>
                <h4>Solução(ões):</h4>
                ${error.solution}
            `;
            // Adiciona classe para ativar animação de fade-in
            errorDetailContent.classList.add('active');
            activeErrorId = errorId; // Atualiza o erro ativo
        } else {
            errorDetailContent.innerHTML = `<h3 class="placeholder-title">Erro não encontrado para o ID: ${errorId}</h3>`;
            errorDetailContent.classList.remove('active'); // Remove a classe se não encontrar
            activeErrorId = null; // Reinicia o erro ativo
        }
    }

    // Event Listener para a barra de pesquisa
    searchInput.addEventListener('input', (e) => {
        renderErrorList(e.target.value);
    });

    // Inicializa a lista de erros ao carregar a página
    renderErrorList();

    // Lidar com o carregamento direto via hash na URL
    if (window.location.hash) {
        const initialErrorId = window.location.hash.substring(1); // Remove o '#'
        displayErrorDetail(initialErrorId);
        // Ativa o link correspondente na sidebar
        document.querySelectorAll('.error-link').forEach(link => {
            if (link.getAttribute('data-error-id') === initialErrorId) {
                link.classList.add('active');
            }
        });
    }
});
