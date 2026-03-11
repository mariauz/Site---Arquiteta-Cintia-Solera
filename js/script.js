document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const heroBanner = document.querySelector('.hero-banner');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    // Função para animação do header ao scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Animação do banner hero (diminuir no scroll)
        if (heroBanner) { // Verifica se o heroBanner existe na página
            const scrollPosition = window.scrollY;
            const heroHeight = heroBanner.offsetHeight;
            const shrinkThreshold = heroHeight * 0.3; // Começa a encolher após 30% do banner

            if (scrollPosition > shrinkThreshold) {
                heroBanner.classList.add('shrink');
            } else {
                heroBanner.classList.remove('shrink');
            }
        }
    });

    // Animação de link ativo na navegação (opcional, se não estiver usando framework)
    // Para um site multipágina simples, é melhor definir a classe 'active' manualmente no HTML
    // navLinks.forEach(link => {
    //     if (link.href === window.location.href) {
    //         link.classList.add('active');
    //     }
    // });

    // Animação de revelação de conteúdo ao scroll (fade-in/slide-up)
    const revealElements = document.querySelectorAll('.reveal');
    const areaItems = document.querySelectorAll('.areas-grid .area-item');

    const observerOptions = {
        root: null, // Observa o viewport
        rootMargin: '0px',
        threshold: 0.2 // A callback será executada quando 20% do elemento estiver visível
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Opcional: para parar de observar depois de animar
            } else {
                // entry.target.classList.remove('active'); // Opcional: para reverter a animação ao sair da tela
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    revealElements.forEach(el => sectionObserver.observe(el));

    // Animação separada para os itens da grade de áreas de atuação com delay
    const areaItemsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                Array.from(areaItems).forEach((item, index) => {
                    item.style.setProperty('--delay', `${index * 0.1}s`); // Atraso incremental
                    item.classList.add('active');
                });
                observer.unobserve(entry.target); // Para de observar a seção inteira depois de animar todos os itens
            }
        });
    }, observerOptions);

    const areasSection = document.querySelector('.areas-atuacao-section');
    if (areasSection) {
        areaItemsObserver.observe(areasSection);
    }


    // Lógica para filtro de projetos (na página projetos.html)
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const projectItems = document.querySelectorAll('.projetos-page-grid .projeto-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões e adiciona ao clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.dataset.filter; // ex: 'casas', 'interiores', 'todos'

            projectItems.forEach(item => {
                if (filterValue === 'todos' || item.dataset.category === filterValue) {
                    item.style.display = 'block'; // Mostra o item
                    setTimeout(() => { // Adiciona um pequeno atraso para a transição
                        item.classList.add('show');
                    }, 50);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => { // Esconde o item após a transição
                        item.style.display = 'none';
                    }, 300); // Deve ser igual ou maior que a duração da transição do CSS
                }
            });
        });
    });

    // Garante que todos os projetos sejam visíveis ao carregar a página de projetos
    if (window.location.pathname.includes('projetos.html') && projectItems.length > 0) {
        projectItems.forEach(item => {
            item.style.display = 'block';
            item.classList.add('show');
        });
        const todosButton = document.querySelector('.filter-buttons button[data-filter="todos"]');
        if (todosButton) {
            todosButton.classList.add('active');
        }
    }


    // Implementar um botão de chat flutuante (como o do WhatsApp)
    const chatButton = document.createElement('a');
    chatButton.href = 'https://wa.me/SEUNUMERODOWHATSAPP?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os%20de%20arquitetura.'; // Substitua pelo seu número
    chatButton.target = '_blank';
    chatButton.classList.add('whatsapp-button');
    chatButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(chatButton);
});
