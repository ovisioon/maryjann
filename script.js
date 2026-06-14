// ========== FUNDO DE RABISCOS ANIMADOS ==========
const bgRabiscos = document.getElementById('bgRabiscos');
const rabiscosIcones = ['✨', '✏️', '🎨', '🖌️', '💖', '⭐', '🌸', '✧'];

function criarRabisco() {
  const rabisco = document.createElement('div');
  rabisco.className = 'rabisco';
  rabisco.textContent = rabiscosIcones[Math.floor(Math.random() * rabiscosIcones.length)];
  rabisco.style.left = Math.random() * 100 + '%';
  rabisco.style.animationDuration = Math.random() * 10 + 8 + 's'; // 8-18s
  rabisco.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
  bgRabiscos.appendChild(rabisco);

  rabisco.addEventListener('animationend', () => {
    rabisco.remove();
  });
}

// Cria rabiscos periodicamente
setInterval(criarRabisco, 1200);
for (let i = 0; i < 8; i++) criarRabisco(); // iniciais

// ========== DADOS DA GALERIA (exemplo) ==========
const obras = [
  { src: 'img/obras/obraex4.jpeg', titulo: 'Jinx', descricao: 'Arcane', categoria: 'gore' },
  { src: 'img/obras/obraex4.jpeg', titulo: 'Jinx', descricao: 'Arcane', categoria: 'realista' },
  { src: 'img/obras/obraex1.jpeg', titulo: 'Mark Canibal', descricao: 'Invencivel, Mark Canibal', categoria: 'nsfw' },
  { src: 'img/obras/obraex2.jpeg', titulo: 'Espirito e Legião', descricao: 'Dead by Daylight', categoria: 'personagens' },
  { src: 'img/obras/obraex3.jpeg', titulo: 'Caine e seus "Amigos"', descricao: 'Digital Circus', categoria: 'gore' },
  { src: 'img/obras/obraex4.jpeg', titulo: 'Jinx', descricao: 'Arcane', categoria: 'personagens' },
  // Adicione mais conforme as artes dela
];

const galeriaGrid = document.getElementById('galeriaGrid');
const tabsContainer = document.getElementById('tabs');
let categoriaAtiva = 'todos';

function exibirObras(categoria) {
  galeriaGrid.innerHTML = '';
  const filtradas = categoria === 'todos' ? obras : obras.filter(o => o.categoria === categoria);
  filtradas.forEach(obra => {
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

// Inicializa com todas
exibirObras('todos');

// Eventos das abas
tabsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('tab-btn')) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const cat = e.target.dataset.categoria;
    categoriaAtiva = cat;
    exibirObras(cat);

    // Aplica classe temática ao body
    document.body.classList.remove('tema-gore', 'tema-realista', 'tema-nsfw', 'tema-personagens');
    if (cat !== 'todos') {
      document.body.classList.add('tema-' + cat);
    }
  }
});

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

// ========== BOLHA MASCOTE ==========
const bolha = document.getElementById('bolhaMascote');
const bolhaFala = document.getElementById('bolhaFala');
const falas = [
  "Oi! Que bom te ver por aqui ✨",
  "Dá uma olhada nas artes!",
  "Mary manda um oi!",
  "Cada traço tem um universo.",
  "Personagens têm alma, sabia?",
  "Hoje é dia de criar! 🎨"
];
const carinhas = ['img/bolha-face1.png', 'img/bolha-face2.png', 'img/bolha-face3.png'];
let indiceCarinha = 0;

bolha.addEventListener('click', () => {
  indiceCarinha = (indiceCarinha + 1) % carinhas.length;
  bolha.style.backgroundImage = `url('${carinhas[indiceCarinha]}')`;
  const falaAleatoria = falas[Math.floor(Math.random() * falas.length)];
  bolhaFala.textContent = falaAleatoria;
  bolhaFala.style.display = 'block';
  clearTimeout(bolha.timeout);
  bolha.timeout = setTimeout(() => { bolhaFala.style.display = 'none'; }, 3000);
});

bolha.addEventListener('mouseenter', () => {
  bolhaFala.textContent = "Clique em mim! 😊";
  bolhaFala.style.display = 'block';
});
bolha.addEventListener('mouseleave', () => {
  if (!bolha.timeout) bolhaFala.style.display = 'none';
});

// ========== CORAÇÃO SECRETO ==========
const coracaoSecreto = document.getElementById('coracaoSecreto');
const mensagemSecreta = document.getElementById('mensagemSecreta');
coracaoSecreto.addEventListener('click', () => {
  mensagemSecreta.style.display = mensagemSecreta.style.display === 'block' ? 'none' : 'block';
  if (mensagemSecreta.style.display === 'block') {
    mensagemSecreta.style.animation = 'fadeInUp 0.5s ease';
  }
});

// ========== ANIMAÇÃO DE REVELAÇÃO AO SCROLL ==========
const elementosRevel = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revelado');
      // Ativa sublinhado desenhado nos títulos
      const under = entry.target.querySelector('.draw-underline');
      if (under) under.classList.add('revelado');
    }
  });
}, { threshold: 0.2 });

elementosRevel.forEach(el => observer.observe(el));

// Ativa imediatamente elementos já visíveis
window.addEventListener('load', () => {
  elementosRevel.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('revelado');
      const under = el.querySelector('.draw-underline');
      if (under) under.classList.add('revelado');
    }
  });
});