// ========== GALERIA (3 imagens, estilo feed Instagram) ==========
const obras = [
  {
    src: 'img/obras/obra1.jpeg',
    titulo: 'Personagem de cabelo roxo e óculos',
    descricao: ''
  },
  {
    src: 'img/obras/obra2.jpeg',
    titulo: 'Garota de cabelo branco (sheet de personagem)',
    descricao: ''
  },
  {
    src: 'img/obras/obra3.jpg',
    titulo: 'Tabela de preços com a mesma personagem',
    descricao: ''
  }
];

const galeriaGrid = document.getElementById('galeriaGrid');

function exibirGaleria() {
  galeriaGrid.innerHTML = '';
  obras.forEach(obra => {
    const card = document.createElement('div');
    card.className = 'card-obra';
    card.innerHTML = `
      <img src="${obra.src}" alt="${obra.titulo}" loading="lazy">
      <div class="card-info">
        <h3>${obra.titulo}</h3>
        <p>${obra.descricao}</p>
      </div>
    `;
    card.addEventListener('click', () => abrirModal(obra));
    galeriaGrid.appendChild(card);
  });
}

exibirGaleria();

// ========== MODAL ==========
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalDetalhes = document.getElementById('modalDetalhes');
const modalFechar = document.getElementById('modalFechar');

function abrirModal(obra) {
  modalImg.src = obra.src;
  modalImg.alt = obra.titulo;
  modalDetalhes.innerHTML = `<h3>${obra.titulo}</h3><p>${obra.descricao}</p>`;
  modal.style.display = 'flex';
}

modalFechar.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// ========== EASTER EGG NO FOOTER ==========
const easterEgg = document.getElementById('easterEgg');
const mensagemSecreta = document.getElementById('mensagemSecreta');
easterEgg.addEventListener('click', () => {
  mensagemSecreta.style.display = mensagemSecreta.style.display === 'block' ? 'none' : 'block';
  if (mensagemSecreta.style.display === 'block') {
    mensagemSecreta.style.animation = 'zoomIn 0.5s ease';
  }
});

// ========== ANIMAÇÃO DE REVELAÇÃO AO SCROLL ==========
const elementosRevel = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revelado');
    }
  });
}, { threshold: 0.2 });

elementosRevel.forEach(el => observer.observe(el));

window.addEventListener('load', () => {
  elementosRevel.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('revelado');
    }
  });
});