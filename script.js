// Simple mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const navIcon = document.querySelector('.nav-icon');
    const navLinks = document.querySelector('.nav-links');
    const navExtras = document.querySelector('.nav-extras');
    const navbar = document.querySelector('.navbar');
    const newsletterToggle = document.getElementById('newsletterToggle');
    const newsletterWidget = document.getElementById('newsletterWidget');
    if (navIcon && navLinks) {
        navIcon.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            // On small screens, toggle visibility of the social icons.  When
            // the menu is closed, they remain hidden; when the menu is open,
            // they reappear alongside the navigation links.
            if (navExtras) {
                navExtras.classList.toggle('open-icons');
            }
            // Toggle a class on the navbar itself so we can control visibility of the
            // logo and background via CSS when the menu is open or closed.
            if (navbar) {
                navbar.classList.toggle('menu-open');
            }
        });
    }

    // Toggle the newsletter subscription form when the envelope icon is clicked
    if (newsletterToggle && newsletterWidget) {
        newsletterToggle.addEventListener('click', () => {
            newsletterWidget.classList.toggle('open');
        });
    }

    // Share functionality
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const shareData = {
                title: document.title || 'MC Artista',
                text: 'Confira o site do MC Artista!',
                url: window.location.href
            };
            if (navigator.share) {
                navigator.share(shareData).catch((err) => {
                    console.error('Erro ao compartilhar:', err);
                });
            } else if (navigator.clipboard) {
                navigator.clipboard.writeText(shareData.url).then(() => {
                    alert('Link copiado para a área de transferência!');
                }).catch(() => {
                    alert('Copie o link: ' + shareData.url);
                });
            } else {
                alert('Copie o link: ' + shareData.url);
            }
        });
    }

    // Newsletter form submission via AJAX.  Intercept the form submission
    // to prevent a page reload and send the subscriber's email via
    // FormSubmit's AJAX endpoint.  After a successful request, show a
    // confirmation message inside the widget; on failure, show an
    // error message.  The widget stays on the current page and
    // continues to play music uninterrupted.
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Retrieve the email address entered by the user
            const emailInput = newsletterForm.querySelector('input[name="email"]');
            const emailValue = emailInput ? emailInput.value : '';
            // Build the payload for FormSubmit.  Include a subject and
            // message so that the artist receives contextual information.
            const payload = {
                email: emailValue,
                subject: 'Nova inscrição na newsletter',
                message: 'Este(a) fã deseja receber novidades do MC Regis.'
            };
            // Send the data to FormSubmit's AJAX endpoint
            fetch('https://formsubmit.co/ajax/mcregis.artist@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Replace the form content with a success message
                newsletterForm.innerHTML = '<p class="newsletter-success">Inscrição realizada! Em breve você receberá novidades.</p>';
            })
            .catch((error) => {
                // Replace the form content with an error message
                newsletterForm.innerHTML = '<p class="newsletter-error">Ocorreu um erro ao enviar. Tente novamente mais tarde.</p>';
                console.error('Erro ao enviar newsletter:', error);
            });
        });
    }

    // Contact form submission via AJAX.  We gather the form data,
    // post it to FormSubmit's AJAX endpoint, and upon success
    // redirect the user to the local thank-you page (obrigado.html).
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Collect values from the contact form fields
            const nome = contactForm.querySelector('#nome')?.value || '';
            const email = contactForm.querySelector('#email')?.value || '';
            const servico = contactForm.querySelector('#servico')?.value || '';
            const mensagem = contactForm.querySelector('#mensagem')?.value || '';
            const payload = {
                nome: nome,
                email: email,
                servico: servico,
                mensagem: mensagem,
                subject: 'Novo contato do site'
            };
            fetch('https://formsubmit.co/ajax/mcregis.artist@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Redirect to the thank-you page after successful submission
                window.location.href = 'obrigado.html';
            })
            .catch((error) => {
                alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
                console.error('Erro ao enviar contato:', error);
            });
        });
    }

    // Visitor counter widget
    // The visitor counter uses an external service (MegaContador) embedded
    // via an image in the HTML.  The widget slides in and out of view
    // when the eye icon is clicked.  There is no need to fetch data
    // because the external image automatically tracks visits.
    const visitorWidget = document.getElementById('visitorWidget');
    const visitorToggle = document.getElementById('visitorToggle');
    if (visitorWidget && visitorToggle) {
        visitorToggle.addEventListener('click', () => {
            visitorWidget.classList.toggle('open');
        });
    }
});