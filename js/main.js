/* ============================================================
   ARCHIVO: main.js
   PROYECTO: Celutec — Boutique Apple & Accesorios en Pereira
   Incluye: Cargador inteligente de múltiples nombres/extensiones en img/,
            Traductor (ES / EN / FR), Carrito y WhatsApp
============================================================ */

const WHATSAPP_NUMERO = '573148094050';
let carrito = JSON.parse(localStorage.getItem('celutec_carrito')) || [];
let idiomaActual = 'es';

// ========================
// 0. CARGADOR AUTOMÁTICO DE IMÁGENES DE LA CARPETA "img/"
// ========================
function resolverImagenesLocales() {
    const extensiones = ['png', 'jpg', 'jpeg', 'webp', 'jfif', 'PNG', 'JPG', 'JPEG'];
    const imagenesLocales = document.querySelectorAll('img[data-local-img]');

    imagenesLocales.forEach(function (img) {
        const nombres = img.getAttribute('data-local-img').split(',');
        const fallbackUrl = img.getAttribute('data-fallback');
        const candidatos = [];

        nombres.forEach(function (nombre) {
            const limpio = nombre.trim();
            if (limpio) {
                extensiones.forEach(function (ext) {
                    candidatos.push('img/' + limpio + '.' + ext);
                });
            }
        });

        let indice = 0;

        function probarSiguiente() {
            if (indice < candidatos.length) {
                const ruta = candidatos[indice];
                indice++;
                img.src = ruta;
            } else if (fallbackUrl) {
                img.onerror = null;
                img.src = fallbackUrl;
            }
        }

        img.onerror = probarSiguiente;
        probarSiguiente();
    });
}

resolverImagenesLocales();

// ========================
// DICCIONARIO MULTI-IDIOMA (ES / EN / FR)
// ========================
const traducciones = {
    es: {
        nav_home: 'Inicio',
        nav_about: 'Nosotros',
        nav_products: 'Catálogo',
        nav_contact: 'Contacto',
        nav_location: 'Ubicación',
        hero_title_1: 'Lo Último de Apple',
        hero_title_2: 'al Mejor Precio',
        hero_subtitle: 'Bienvenido/a a <span class="text-highlight">CELUTEC</span> donde encontrarás los últimos lanzamientos de Apple incluyendo los últimos iPhones además de <span class="text-highlight">AirPods y Apple Watch</span> hasta con un <span class="text-accent">20% de descuento</span> garantizado sobre el precio comercial.',
        hero_btn_catalog: 'Explorar Catálogo',
        hero_btn_contact: 'Atención en WhatsApp',
        trust_warranty: 'Garantía oficial incluida',
        trust_shipping: 'Envíos inmediatos en Pereira',
        trust_discount: '20% menos que el mercado',
        about_label: '01 / IDENTIDAD',
        about_title: 'Quiénes Somos',
        about_tag: 'Tienda Especializada en Pereira',
        about_heading: 'Diseño, tecnología y respaldo real',
        about_p1: '<span class="text-dark-highlight">CELUTEC</span> es un espacio dedicado a acercar los últimos lanzamientos de iPhone, Apple Watch y AirPods originales con valores verdaderamente justos, porque en Celutec creemos que la innovación de alto nivel debe de estar al alcance de todos.',
        about_p2: 'Te recibimos en nuestra sede física de la <span class="text-dark-highlight">Cra. 7 #17-60, centro de Pereira</span>, con asesoría transparente, acompañamiento técnico y entrega inmediata.',
        pill_1: 'Equipos 100% Originales',
        pill_2: 'Sede Física en Pereira',
        pill_3: 'Respaldo y Garantía',
        feat_1_title: '20% de Beneficio',
        feat_1_desc: 'Cada referencia de nuestra colección mantiene un 20% de descuento real frente al precio comercial tradicional.',
        feat_2_title: 'Sello Original',
        feat_2_desc: 'Dispositivos Apple nuevos, verificados y con garantía directa para tu total tranquilidad.',
        feat_3_title: 'Curaduría Experta',
        feat_3_desc: 'Te orientamos en cada detalle técnico para que elijas exactamente el modelo que se adapta a tu ritmo.',
        feat_4_title: 'Experiencia Física',
        feat_4_desc: 'Visítanos, interactúa con los equipos y retira el tuyo el mismo día en la Cra. 7 #17-60.',
        prod_label: '02 / COLECCIÓN',
        prod_title: 'Catálogo Seleccionado',
        prod_desc: 'Todos los valores exhibidos ya integran el <span class="text-dark-highlight">20% de descuento</span> sobre el precio comercial en Colombia. Selecciona tus dispositivos y tramita tu pedido directo por WhatsApp.',
        filter_all: 'Colección Completa',
        filter_ip18: 'Serie iPhone 18',
        filter_ip17: 'Serie iPhone 17',
        filter_audio: 'Audio AirPods',
        filter_watch: 'Apple Watch',
        cat_ip18: 'Serie iPhone 18',
        cat_ip17: 'Serie iPhone 17',
        cat_audio: 'Audífonos',
        spec_ip18pm: '256GB · Chip A20 Pro · Pantalla 6.9"',
        spec_ip18p: '256GB · Chip A20 Pro · Pantalla 6.3" 120Hz',
        spec_ip17pm: '256GB · Chip A19 Pro · Triple Cámara 48MP',
        spec_ip17p: '256GB · Chip A19 Pro · Pantalla 6.3"',
        spec_ip17: '128GB · Chip A19 · Pantalla OLED 120Hz',
        spec_app2: 'Cancelación Activa de Ruido 2x · Audio Espacial',
        spec_ap4: 'Chip H2 · Cancelación Activa de Ruido · Estuche USB-C',
        spec_apm: 'Audio de Alta Fidelidad · Cancelación Pro',
        spec_aws10: '42mm / 46mm · GPS · Pantalla OLED Gran Angular',
        spec_awu2: '49mm · GPS + Cellular · Caja de Titanio',
        spec_awse: '40mm / 44mm · GPS · Caja Aluminio Blanco Estelar',
        btn_add_cart: 'Añadir a la bolsa',
        contact_label: '03 / ATENCIÓN DIRECTA',
        contact_title: 'Canales de Contacto',
        contact_desc: '¿Deseas confirmar disponibilidad de algún acabado o referencia? Escríbenos directamente a través de nuestras líneas oficiales.',
        contact_wa_link: 'Iniciar conversación ↗',
        contact_email_title: 'Correo Electrónico',
        contact_email_link: 'Redactar mensaje ↗',
        contact_hours_title: 'Horario de Atención',
        contact_hours_desc: 'Lunes a Sábado<br>9:00 AM — 7:00 PM',
        contact_store_title: 'Sede Física',
        contact_store_link: 'Ubicar en el mapa ↗',
        loc_label: '04 / SEDE PEREIRA',
        loc_title: 'Nuestra Ubicación',
        loc_desc: 'Visítanos en el corazón de Pereira y conoce de cerca cada equipo de nuestra colección.',
        loc_addr_title: 'Dirección',
        loc_ref_title: 'Punto de Referencia',
        loc_ref_desc: 'Centro de Pereira, a pocos pasos de la Plaza de Bolívar',
        loc_how_title: 'Acceso',
        loc_how_desc: 'Fácil acceso en transporte público y parqueaderos cercanos',
        loc_btn_maps: 'Abrir en Google Maps',
        footer_desc: 'Boutique de celulares y accesorios en Pereira. Especialistas en iPhone Serie 17, Serie 18 Pro, AirPods y Apple Watch.',
        footer_nav: 'Explorar',
        footer_cat: 'Colecciones',
        footer_copy: '&copy; 2026 Celutec — Celulares y Accesorios | Pereira, Colombia.',
        wa_tooltip: 'Atención en línea',
        cart_title: 'Mi Bolsa',
        cart_empty_title: 'Tu bolsa está vacía',
        cart_empty_sub: 'Explora el catálogo y añade tus equipos favoritos',
        cart_total: 'Total estimado',
        cart_send_wa: 'Solicitar Pedido por WhatsApp',
        cart_clear: 'Limpiar bolsa',
        toast_added: 'añadido a la bolsa',
        wa_order_title: '🛒 Nuevo Pedido — Celutec',
        wa_price: 'Valor',
        wa_qty: 'Cantidad',
        wa_subtotal: 'Subtotal',
        wa_greeting: 'Hola, me gustaría solicitar este pedido.'
    },
    en: {
        nav_home: 'Home',
        nav_about: 'Studio',
        nav_products: 'Catalog',
        nav_contact: 'Contact',
        nav_location: 'Location',
        hero_title_1: 'The Latest from Apple',
        hero_title_2: 'at the Best Value',
        hero_subtitle: 'Welcome to <span class="text-highlight">CELUTEC</span> where you will find the latest Apple releases including the newest iPhones plus <span class="text-highlight">AirPods and Apple Watch</span> with up to a guaranteed <span class="text-accent">20% discount</span> off retail prices.',
        hero_btn_catalog: 'Explore Catalog',
        hero_btn_contact: 'WhatsApp Concierge',
        trust_warranty: 'Official warranty included',
        trust_shipping: 'Express delivery in Pereira',
        trust_discount: '20% below market retail',
        about_label: '01 / IDENTITY',
        about_title: 'About Us',
        about_tag: 'Specialized Store in Pereira',
        about_heading: 'Design, technology and genuine support',
        about_p1: '<span class="text-dark-highlight">CELUTEC</span> is a space dedicated to bringing the latest genuine iPhone, Apple Watch, and AirPods releases at truly fair values, because at Celutec we believe high-level innovation should be within everyone’s reach.',
        about_p2: 'We welcome you at our physical showroom at <span class="text-dark-highlight">Cra. 7 #17-60, downtown Pereira</span>, with transparent guidance, technical support, and immediate delivery.',
        pill_1: '100% Genuine Devices',
        pill_2: 'Showroom in Pereira',
        pill_3: 'Full Warranty & Support',
        feat_1_title: '20% Price Advantage',
        feat_1_desc: 'Every model in our collection maintains a real 20% discount compared to traditional retail prices.',
        feat_2_title: 'Genuine Seal',
        feat_2_desc: 'Brand-new, verified Apple devices with direct warranty for your complete peace of mind.',
        feat_3_title: 'Expert Curation',
        feat_3_desc: 'We guide you through every technical detail so you can select the exact model that fits your lifestyle.',
        feat_4_title: 'Physical Experience',
        feat_4_desc: 'Visit us, interact with the devices, and take yours home the same day at Cra. 7 #17-60.',
        prod_label: '02 / COLLECTION',
        prod_title: 'Curated Catalog',
        prod_desc: 'All displayed prices already include the <span class="text-dark-highlight">20% discount</span> off retail value in Colombia. Select your devices and send your order directly via WhatsApp.',
        filter_all: 'Full Collection',
        filter_ip18: 'iPhone 18 Series',
        filter_ip17: 'iPhone 17 Series',
        filter_audio: 'AirPods Audio',
        filter_watch: 'Apple Watch',
        cat_ip18: 'iPhone 18 Series',
        cat_ip17: 'iPhone 17 Series',
        cat_audio: 'Headphones',
        spec_ip18pm: '256GB · A20 Pro Chip · 6.9" Display',
        spec_ip18p: '256GB · A20 Pro Chip · 6.3" 120Hz Display',
        spec_ip17pm: '256GB · A19 Pro Chip · 48MP Triple Camera',
        spec_ip17p: '256GB · A19 Pro Chip · 6.3" Display',
        spec_ip17: '128GB · A19 Chip · 120Hz OLED Display',
        spec_app2: '2x Active Noise Cancellation · Spatial Audio',
        spec_ap4: 'H2 Chip · Active Noise Cancellation · USB-C Case',
        spec_apm: 'High-Fidelity Audio · Pro Noise Cancellation',
        spec_aws10: '42mm / 46mm · GPS · Wide-Angle OLED Display',
        spec_awu2: '49mm · GPS + Cellular · Titanium Case',
        spec_awse: '40mm / 44mm · GPS · Starlight Aluminum Case',
        btn_add_cart: 'Add to bag',
        contact_label: '03 / DIRECT CARE',
        contact_title: 'Contact Channels',
        contact_desc: 'Would you like to confirm finish availability or specific models? Reach out directly through our official lines.',
        contact_wa_link: 'Start conversation ↗',
        contact_email_title: 'Email Address',
        contact_email_link: 'Compose message ↗',
        contact_hours_title: 'Opening Hours',
        contact_hours_desc: 'Monday to Saturday<br>9:00 AM — 7:00 PM',
        contact_store_title: 'Physical Showroom',
        contact_store_link: 'Locate on map ↗',
        loc_label: '04 / PEREIRA SHOWROOM',
        loc_title: 'Our Location',
        loc_desc: 'Visit us in the heart of Pereira and experience every device in our collection up close.',
        loc_addr_title: 'Address',
        loc_ref_title: 'Reference Point',
        loc_ref_desc: 'Downtown Pereira, steps away from Plaza de Bolívar',
        loc_how_title: 'Access',
        loc_how_desc: 'Easy access via public transit and nearby parking lots',
        loc_btn_maps: 'Open in Google Maps',
        footer_desc: 'Phones and accessories boutique in Pereira. Specialists in iPhone 17 Series, 18 Pro Series, AirPods, and Apple Watch.',
        footer_nav: 'Explore',
        footer_cat: 'Collections',
        footer_copy: '&copy; 2026 Celutec — Phones & Accessories | Pereira, Colombia.',
        wa_tooltip: 'Online concierge',
        cart_title: 'My Bag',
        cart_empty_title: 'Your bag is empty',
        cart_empty_sub: 'Explore the catalog and add your favorite devices',
        cart_total: 'Estimated total',
        cart_send_wa: 'Request Order via WhatsApp',
        cart_clear: 'Clear bag',
        toast_added: 'added to bag',
        wa_order_title: '🛒 New Order — Celutec',
        wa_price: 'Value',
        wa_qty: 'Quantity',
        wa_subtotal: 'Subtotal',
        wa_greeting: 'Hello, I would like to request this order.'
    },
    fr: {
        nav_home: 'Accueil',
        nav_about: 'L’Atelier',
        nav_products: 'Catalogue',
        nav_contact: 'Contact',
        nav_location: 'Localisation',
        hero_title_1: 'Le Dernier Cri d’Apple',
        hero_title_2: 'au Meilleur Prix',
        hero_subtitle: 'Bienvenue chez <span class="text-highlight">CELUTEC</span> où vous trouverez les dernières nouveautés d’Apple, y compris les derniers iPhones ainsi que les <span class="text-highlight">AirPods et Apple Watch</span>, avec jusqu’à <span class="text-accent">20% de réduction</span> garantie sur le prix commercial.',
        hero_btn_catalog: 'Explorer le Catalogue',
        hero_btn_contact: 'Conciergerie WhatsApp',
        trust_warranty: 'Garantie officielle incluse',
        trust_shipping: 'Livraison immédiate à Pereira',
        trust_discount: '20% moins cher que le marché',
        about_label: '01 / IDENTITÉ',
        about_title: 'Qui Sommes-Nous',
        about_tag: 'Boutique Spécialisée à Pereira',
        about_heading: 'Design, technologie et garantie réelle',
        about_p1: '<span class="text-dark-highlight">CELUTEC</span> est un espace dédié à rendre accessibles les derniers lancements d’iPhone, Apple Watch et AirPods originaux à des prix vraiment justes, car chez Celutec nous croyons que l’innovation de haut niveau doit être à la portée de tous.',
        about_p2: 'Nous vous accueillons dans notre boutique physique située <span class="text-dark-highlight">Cra. 7 #17-60, centre de Pereira</span>, avec un accompagnement personnalisé et une remise immédiate.',
        pill_1: 'Appareils 100% Originaux',
        pill_2: 'Boutique à Pereira',
        pill_3: 'Support et Garantie',
        feat_1_title: '20% d’Avantage',
        feat_1_desc: 'Chaque référence de notre collection bénéficie d’une réduction réelle de 20% par rapport au prix commercial.',
        feat_2_title: 'Sceau Original',
        feat_2_desc: 'Appareils Apple neufs, vérifiés et avec garantie directe pour votre tranquillité.',
        feat_3_title: 'Conseil d’Expert',
        feat_3_desc: 'Nous vous guidons dans chaque détail technique pour choisir le modèle adapté à votre rythme.',
        feat_4_title: 'Expérience Physique',
        feat_4_desc: 'Visitez-nous, découvrez les appareils et repartez avec le vôtre le jour même à Cra. 7 #17-60.',
        prod_label: '02 / COLLECTION',
        prod_title: 'Catalogue Sélectionné',
        prod_desc: 'Tous les prix affichés intègrent déjà <span class="text-dark-highlight">20% de réduction</span> sur la valeur commerciale en Colombie. Sélectionnez vos appareils et commandez via WhatsApp.',
        filter_all: 'Collection Complète',
        filter_ip18: 'Série iPhone 18',
        filter_ip17: 'Série iPhone 17',
        filter_audio: 'Audio AirPods',
        filter_watch: 'Apple Watch',
        cat_ip18: 'Série iPhone 18',
        cat_ip17: 'Série iPhone 17',
        cat_audio: 'Écouteurs',
        spec_ip18pm: '256Go · Puce A20 Pro · Écran 6.9"',
        spec_ip18p: '256Go · Puce A20 Pro · Écran 6.3" 120Hz',
        spec_ip17pm: '256Go · Puce A19 Pro · Triple Caméra 48MP',
        spec_ip17p: '256Go · Puce A19 Pro · Écran 6.3"',
        spec_ip17: '128Go · Puce A19 · Écran OLED 120Hz',
        spec_app2: 'Réduction Active du Bruit 2x · Audio Spatial',
        spec_ap4: 'Puce H2 · Réduction Active du Bruit · Boîtier USB-C',
        spec_apm: 'Audio Haute Fidélité · Réduction Pro',
        spec_aws10: '42mm / 46mm · GPS · Écran OLED Grand Angle',
        spec_awu2: '49mm · GPS + Cellular · Boîtier en Titane',
        spec_awse: '40mm / 44mm · GPS · Boîtier Aluminium Lumière Stellaire',
        btn_add_cart: 'Ajouter au sac',
        contact_label: '03 / ATTENTION DIRECTE',
        contact_title: 'Canaux de Contact',
        contact_desc: 'Vous souhaitez confirmer la disponibilité d’une finition ou d’un modèle ? Écrivez-nous directement.',
        contact_wa_link: 'Démarrer la discussion ↗',
        contact_email_title: 'Courrier Électronique',
        contact_email_link: 'Rédiger un message ↗',
        contact_hours_title: 'Heures d’Ouverture',
        contact_hours_desc: 'Lundi au Samedi<br>9h00 — 19h00',
        contact_store_title: 'Boutique Physique',
        contact_store_link: 'Localiser sur la carte ↗',
        loc_label: '04 / BOUTIQUE PEREIRA',
        loc_title: 'Notre Localisation',
        loc_desc: 'Visitez-nous au cœur de Pereira et découvrez de près chaque appareil de notre collection.',
        loc_addr_title: 'Adresse',
        loc_ref_title: 'Point de Repère',
        loc_ref_desc: 'Centre de Pereira, à quelques pas de la Plaza de Bolívar',
        loc_how_title: 'Accès',
        loc_how_desc: 'Accès facile en transports en commun et parkings à proximité',
        loc_btn_maps: 'Ouvrir dans Google Maps',
        footer_desc: 'Boutique de téléphones et accessoires à Pereira. Spécialistes des séries iPhone 17, 18 Pro, AirPods et Apple Watch.',
        footer_nav: 'Explorer',
        footer_cat: 'Collections',
        footer_copy: '&copy; 2026 Celutec — Téléphones et Accessoires | Pereira, Colombie.',
        wa_tooltip: 'Conciergerie en ligne',
        cart_title: 'Mon Sac',
        cart_empty_title: 'Votre sac est vide',
        cart_empty_sub: 'Explorez le catalogue et ajoutez vos appareils favoris',
        cart_total: 'Total estimé',
        cart_send_wa: 'Demander la Commande via WhatsApp',
        cart_clear: 'Vider le sac',
        toast_added: 'ajouté au sac',
        wa_order_title: '🛒 Nouvelle Commande — Celutec',
        wa_price: 'Valeur',
        wa_qty: 'Quantité',
        wa_subtotal: 'Sous-total',
        wa_greeting: 'Bonjour, je souhaiterais passer cette commande.'
    }
};

function cambiarIdioma(lang) {
    if (!traducciones[lang]) return;
    idiomaActual = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    const diccionario = traducciones[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        const clave = el.getAttribute('data-i18n');
        if (diccionario[clave]) {
            el.innerHTML = diccionario[clave];
        }
    });

    actualizarCarrito();
}

// ========================
// 1. MENÚ HAMBURGUESA (Optimizado para móvil)
// ========================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========================
// 2. NAVBAR CON EFECTO AL SCROLL
// ========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================
// 3. NAVEGACIÓN ACTIVA
// ========================
const secciones = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
    let scrollActual = window.scrollY + 150;

    secciones.forEach(function (seccion) {
        let arriba = seccion.offsetTop;
        let altura = seccion.offsetHeight;
        let id = seccion.getAttribute('id');

        if (scrollActual >= arriba && scrollActual < arriba + altura) {
            navLinksAll.forEach(function (link) {
                link.classList.remove('active');
            });
            let linkActivo = document.querySelector('.nav-link[href="#' + id + '"]');
            if (linkActivo) {
                linkActivo.classList.add('active');
            }
        }
    });
});

// ========================
// 4. FILTRO DE PRODUCTOS
// ========================
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        let filtro = btn.getAttribute('data-filter');

        productCards.forEach(function (card) {
            let categoriaProducto = card.getAttribute('data-category');

            if (filtro === 'todos' || categoriaProducto === filtro) {
                card.classList.remove('hidden');
                card.style.display = '';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    });
});

// ========================
// 5. CARRITO DE COMPRAS
// ========================
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');

cartBtn.addEventListener('click', function () {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function cerrarCarrito() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

cartClose.addEventListener('click', cerrarCarrito);
cartOverlay.addEventListener('click', cerrarCarrito);

function agregarAlCarrito(nombre, precio) {
    let productoExistente = carrito.find(function (item) {
        return item.nombre === nombre;
    });

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarCarrito();

    const textoAgregado = traducciones[idiomaActual].toast_added;
    mostrarToast(nombre + ' — ' + textoAgregado);

    cartCount.classList.add('bump');
    setTimeout(function () {
        cartCount.classList.remove('bump');
    }, 400);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
}

function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    guardarCarrito();
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('celutec_carrito', JSON.stringify(carrito));
}

function formatearPrecio(numero) {
    return '$' + numero.toLocaleString('es-CO');
}

function actualizarCarrito() {
    let totalProductos = 0;
    let totalPrecio = 0;

    carrito.forEach(function (item) {
        totalProductos += item.cantidad;
        totalPrecio += item.precio * item.cantidad;
    });

    cartCount.textContent = totalProductos;

    const t = traducciones[idiomaActual];

    if (carrito.length === 0) {
        cartFooter.style.display = 'none';
        cartItems.innerHTML = 
            '<div class="cart-empty" id="cartEmpty">' +
            '  <i class="fa-solid fa-bag-shopping"></i>' +
            '  <p data-i18n="cart_empty_title">' + t.cart_empty_title + '</p>' +
            '  <span data-i18n="cart_empty_sub">' + t.cart_empty_sub + '</span>' +
            '</div>';
        return;
    }

    cartFooter.style.display = 'flex';

    let html = '';
    carrito.forEach(function (item, index) {
        html += '<div class="cart-item">';
        html += '  <div class="cart-item-info">';
        html += '    <div class="cart-item-name">' + item.nombre + '</div>';
        html += '    <div class="cart-item-price">' + formatearPrecio(item.precio) + '</div>';
        html += '  </div>';
        html += '  <div class="cart-item-controls">';
        html += '    <button class="qty-btn" onclick="cambiarCantidad(' + index + ', -1)">−</button>';
        html += '    <span class="cart-item-qty">' + item.cantidad + '</span>';
        html += '    <button class="qty-btn" onclick="cambiarCantidad(' + index + ', 1)">+</button>';
        html += '  </div>';
        html += '  <button class="cart-item-remove" onclick="eliminarDelCarrito(' + index + ')" title="Eliminar">';
        html += '    <i class="fa-solid fa-trash-can"></i>';
        html += '  </button>';
        html += '</div>';
    });

    cartItems.innerHTML = html;
    cartTotal.textContent = formatearPrecio(totalPrecio);
}

// ========================
// 6. ENVIAR PEDIDO POR WHATSAPP
// ========================
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) return;

    const t = traducciones[idiomaActual];
    let mensaje = t.wa_order_title + '\n';
    mensaje += '──────────────────\n\n';

    let total = 0;

    carrito.forEach(function (item) {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += '• ' + item.nombre + '\n';
        mensaje += '  ' + t.wa_price + ': ' + formatearPrecio(item.precio) + '\n';
        mensaje += '  ' + t.wa_qty + ': ' + item.cantidad + '\n';
        mensaje += '  ' + t.wa_subtotal + ': ' + formatearPrecio(subtotal) + '\n\n';
    });

    mensaje += '──────────────────\n';
    mensaje += 'TOTAL: ' + formatearPrecio(total) + '\n\n';
    mensaje += t.wa_greeting;

    let mensajeCodificado = encodeURIComponent(mensaje);
    window.open('https://wa.me/' + WHATSAPP_NUMERO + '?text=' + mensajeCodificado, '_blank');
}

// ========================
// 7. ANIMACIONES AL SCROLL
// ========================
function iniciarAnimaciones() {
    let observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(function (el) {
        observador.observe(el);
    });
}

iniciarAnimaciones();

// ========================
// 8. NOTIFICACIONES (Toast)
// ========================
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
let toastTimeout;

function mostrarToast(mensaje) {
    toastMessage.textContent = mensaje;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
        toast.classList.remove('show');
    }, 3000);
}

// ========================
// INICIALIZACIÓN
// ========================
cambiarIdioma('es');