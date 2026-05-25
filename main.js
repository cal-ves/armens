//Scripts de Interatividade

// Inicialização dos Ícones Lucide
lucide.createIcons();

// Gerenciamento de Modal e Seleção de Produto
let currentSelectedSize = "39"; // Default
let activeProductName = "";

function openPurchaseModal(name) {
  activeProductName = name;
  document.getElementById("modal-product-name").innerText = name;

  // Exibir Modal
  const modal = document.getElementById("purchase-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closePurchaseModal() {
  const modal = document.getElementById("purchase-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function selectSize(element) {
  // Desmarcar todos os outros tamanhos
  const buttons = document.querySelectorAll("#size-selector button");
  buttons.forEach((btn) => {
    btn.classList.remove("border-brand-orange", "text-brand-orange");
    btn.classList.add("border-white/10", "text-white");
  });

  // Marcar o atual
  element.classList.add("border-brand-orange", "text-brand-orange");
  element.classList.remove("border-white/10", "text-white");
  currentSelectedSize = element.innerText;
}

// Confirmação de Compra via WhatsApp
function confirmPurchase() {
  const laceOption = document.getElementById("modal-laces").value;
  const message = `Olá Armens! Vi a vossa Landing Page e gostaria de consultar a disponibilidade do seguinte modelo:\n\n*Modelo:* ${activeProductName}\n*Tamanho:* ${currentSelectedSize}\n*Atacador extra:* ${laceOption}\n\nPodem confirmar se está disponível para envio?`;
  const encodedMessage = encodeURIComponent(message);
  // Redireciona para o número de WhatsApp principal (5534998388008)
  window.open(`https://wa.me/5534998388008?text=${encodedMessage}`, "_blank");
  closePurchaseModal();
}

// Filtro Dinâmico de Categorias no Catálogo
function filterCategory(category) {
  const grid = document.getElementById("product-grid");
  const products = grid.querySelectorAll("[data-category]");

  products.forEach((product) => {
    if (
      category === "todos" ||
      product.getAttribute("data-category") === category
    ) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  });

  // Atualização visual dos botões de filtro
  const buttons = ["todos", "dunk", "af1"];
  buttons.forEach((btnId) => {
    const btn = document.getElementById(`btn-${btnId}`);
    if (btn) {
      if (btnId === category) {
        btn.className =
          "px-5 py-2 rounded-full text-xs font-bold bg-brand-orange text-black transition-all";
      } else {
        btn.className =
          "px-5 py-2 rounded-full text-xs font-bold bg-brand-card text-white/60 hover:text-white transition-all";
      }
    }
  });
}

// Envio de Solicitação Customizada de Encomenda
function sendCustomRequest(event) {
  event.preventDefault();
  const model = document.getElementById("req-model").value;
  const size = document.getElementById("req-size").value;
  const color = document.getElementById("req-color").value || "Não informado";
  const channel = document.getElementById("req-channel").value;

  const message = `Olá equipe Armens! Gostaria de consultar um modelo sob encomenda que não encontrei no catálogo:\n\n*Modelo:* ${model}\n*Tamanho:* ${size}\n*Cor/Detalhes:* ${color}\n*Canal preferido para retorno:* ${channel}\n\nComo funciona o processo de encomenda?`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/5534998388008?text=${encodedMessage}`, "_blank");
}
