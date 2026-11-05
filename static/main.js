document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // MENU DE NAVIGATION
    // ==========================================

    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');


    if (toggle && nav) {

        // Ouverture et fermeture du menu
        toggle.addEventListener('click', () => {

            const open = nav.classList.toggle('open');

            toggle.setAttribute(
                'aria-expanded',
                open ? 'true' : 'false'
            );

            toggle.textContent = open ? '×' : '☰';

        });


        // Fermeture du menu après un clic sur un lien
        nav.querySelectorAll('a').forEach(a => {

            a.addEventListener('click', () => {

                nav.classList.remove('open');

                toggle.setAttribute('aria-expanded', 'false');

                toggle.textContent = '☰';

            });

        });

    }



    // ==========================================
    // ANIMATIONS AU DÉFILEMENT
    // ==========================================

    const observer = new IntersectionObserver(

        entries => entries.forEach(e => {

            if (e.isIntersecting) {

                e.target.classList.add('visible');

                observer.unobserve(e.target);

            }

        }),

        {
            threshold: .12
        }

    );


    document.querySelectorAll('.reveal').forEach(el => {

        observer.observe(el);

    });



    // ==========================================
    // FILTRES DES PROJETS
    // ==========================================

    document.querySelectorAll('[data-filter]').forEach(btn => {

        btn.addEventListener('click', () => {


            // Retirer la classe active des autres boutons
            document.querySelectorAll('[data-filter]').forEach(b => {

                b.classList.remove('active');

            });


            // Activer le filtre sélectionné
            btn.classList.add('active');

            const f = btn.dataset.filter;


            // Afficher ou masquer les projets
            document.querySelectorAll('[data-category]').forEach(card => {

                card.hidden = !(
                    f === 'all' ||
                    card.dataset.category.split(' ').includes(f)
                );

            });

        });

    });



    // ==========================================
    // MODALE POUR AGRANDIR LES IMAGES
    // ==========================================

    const modal = document.querySelector('.modal');

    const modalImg = modal?.querySelector('img');


    // Ouverture de l'image
    document.querySelectorAll('.zoomable').forEach(img => {

        img.addEventListener('click', () => {

            if (modal && modalImg) {

                modalImg.src = img.src;

                modal.classList.add('open');

                document.body.classList.add('no-scroll');

            }

        });

    });



    // Fermeture de la modale
    const close = () => {

        if (modal) {

            modal.classList.remove('open');

            document.body.classList.remove('no-scroll');

        }

    };


    // Fermeture avec le bouton
    modal?.querySelector('.modal-close')?.addEventListener('click', close);


    // Fermeture en cliquant en dehors de l'image
    modal?.addEventListener('click', e => {

        if (e.target === modal) {

            close();

        }

    });


    // Fermeture avec la touche Échap
    document.addEventListener('keydown', e => {

        if (e.key === 'Escape') {

            close();

        }

    });



    // ==========================================
    // CARNET D'ARTS PLASTIQUES
    // NAVIGATION ENTRE LES DOUBLES-PAGES
    // ==========================================


    // Récupérer toutes les images du carnet
    const spreads = [

        ...document.querySelectorAll('.book-pages img')

    ];


    // Vérifier qu'il existe des images
    if (spreads.length) {


        // Numéro de la double-page actuelle
        let page = 0;


        // Tableau contenant les groupes de deux images
        const groups = [];


        // Regrouper les images deux par deux
        for (let i = 0; i < spreads.length; i += 2) {

            groups.push(spreads.slice(i, i + 2));

        }



        // ======================================
        // RÉCUPÉRATION DES ÉLÉMENTS HTML
        // ======================================

        const a = document.querySelector('#book-left');

        const b = document.querySelector('#book-right');

        const label = document.querySelector('#book-page');



        // ======================================
        // AFFICHAGE DE LA DOUBLE-PAGE
        // ======================================

        const render = () => {


            // Image de gauche
            a.src = groups[page][0]?.src || '';


            // Image de droite
            // Si le nombre d'images est impair,
            // on laisse la dernière page seule à droite
            b.src = groups[page][1]?.src || '';


            // Numéro de la double-page
            label.textContent =
                `Double-page ${page + 1} / ${groups.length}`;

        };



        // ======================================
        // BOUTON : PAGE PRÉCÉDENTE
        // ======================================

        document.querySelector('#book-prev')?.addEventListener('click', () => {


            // Revenir à la dernière double-page
            // si on est sur la première
            page = (page - 1 + groups.length) % groups.length;


            render();

        });



        // ======================================
        // BOUTON : PAGE SUIVANTE
        // ======================================

        document.querySelector('#book-next')?.addEventListener('click', () => {


            // Revenir à la première double-page
            // si on est sur la dernière
            page = (page + 1) % groups.length;


            render();

        });



        // ======================================
        // AFFICHER LA PREMIÈRE DOUBLE-PAGE
        // ======================================

        render();


    }


});
