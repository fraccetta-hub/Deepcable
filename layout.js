// Carica il layout (header, nav, footer) da file separati
async function loadLayout() {
  try {
    // Carica header
    const headerResponse = await fetch('header.html');
    const headerContent = await headerResponse.text();
    document.querySelector('header')?.replaceWith(new DOMParser().parseFromString(headerContent, 'text/html').querySelector('header'));

    // Carica nav
    const navResponse = await fetch('nav.html');
    const navContent = await navResponse.text();
    document.querySelector('nav')?.replaceWith(new DOMParser().parseFromString(navContent, 'text/html').querySelector('nav'));

    // Carica footer
    const footerResponse = await fetch('footer.html');
    const footerContent = await footerResponse.text();
    document.querySelector('footer')?.replaceWith(new DOMParser().parseFromString(footerContent, 'text/html').querySelector('footer'));
  } catch (error) {
    console.error('Errore nel caricamento del layout:', error);
  }
}

// Carica il layout quando il DOM è pronto
document.addEventListener('DOMContentLoaded', loadLayout);
