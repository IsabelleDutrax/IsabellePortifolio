// pega a página como um todo ao ser carregada e começa a lógica
document.addEventListener('DOMContentLoaded', () => {
    // Função para carregar um componente HTML, nav e footer
    function loadComponent(id, path, selector = null) {
        // Pega o conteúdo do arquivo HTML
        fetch(path)
            .then(res => {
                // Verifica se deu certo
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status} for ${path}`);
                }
                return res.text(); // Transforma a resposta em texto HTML
            })
            .then(html => {
                // Insere o HTML carregado no elemento da página
                document.getElementById(id).innerHTML = html;

                // Se um seletor for fornecido, ativa o link da página atual no navbar
                if (selector) {
                    const currentPage = window.location.pathname.split('/').pop(); // Pega o nome do arquivo da URL atual
                    const links = document.querySelectorAll(selector); // Pega todos os links do navbar

                    links.forEach(link => {
                        const linkPage = link.getAttribute('href').split('/').pop(); // Pega o nome do arquivo do link

                        // Verifica se o link corresponde à página atual (incluindo a página inicial 'sobre.html')
                        const isActive = (linkPage === currentPage) ||
                            (currentPage === '' && linkPage === 'sobre.html') ||
                            (window.location.pathname.endsWith('/') && linkPage === 'sobre.html');

                        // Adiciona ou remove a classe 'nav-link--active' para destacar o link ativo
                        if (isActive) {
                            link.classList.add('nav-link--active');
                        } else {
                            link.classList.remove('nav-link--active');
                        }
                    });
                }
            })
            .catch(e => console.error(`Error loading component ${path}:`, e)); // Mostra erro no console se der errado
    }

    // Carrega o navbar e o footer ao carregar a página que estiver
    loadComponent('navbar-placeholder', '/componentes/navbar.html', '.nav-link');
    loadComponent('footer-placeholder', '/componentes/footer.html');
});




// lógica mostrar alerta 

// Pega o elemento do formulário no HTML
const contactForm = document.getElementById('contact-form');

// se  form xistir continua 
if (contactForm) {
    // Escutador que verifica se botão foi clicado para prossegrui
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('input-name').value;
        const email = document.getElementById('input-email').value;
        const message = document.getElementById('input-message').value;
        console.log('Dados do formulário:', { name, email, message });
        alert('E-mail enviado com sucesso!');
        contactForm.reset();
    });
}