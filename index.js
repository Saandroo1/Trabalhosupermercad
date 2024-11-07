let cart = [];

// Função para abrir o popup do carrinho
function openCartPopup() {
    const cartPopup = document.getElementById("cart-popup");
    cartPopup.style.display = "block";
    displayCartItems(); // Atualiza os itens do carrinho
}

// Função para fechar o popup do carrinho
function closeCartPopup() {
    const cartPopup = document.getElementById("cart-popup");
    cartPopup.style.display = "none";
}

// Função para exibir os itens do carrinho
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `ID: ${item.id} - ${item.name} - R$ ${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(itemElement);
        });
    }
}

// Função para atualizar a contagem de itens no carrinho
function updateItemCount() {
    const itemCountElement = document.getElementById("item-count");
    itemCountElement.textContent = cart.length; // Atualiza o texto com a quantidade de itens
}

// Função para prosseguir com a venda
function proceedWithSale() {
    const totalAmount = cart.reduce((total, item) => total + item.price, 0); // Cálculo total correto
    document.getElementById("total-amount").textContent = `Total: R$ ${totalAmount.toFixed(2)}`;
    closeCartPopup();
    document.getElementById("total-popup").style.display = "block"; // Abre o popup do total
}

// Função para fechar o popup do total
function closeTotalPopup() {
    document.getElementById("total-popup").style.display = "none"; // Fecha o popup do total
}

// Função para confirmar a venda
function confirmSale() {
    // Armazena o carrinho no Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));

    cart = []; // Limpa o carrinho na página atual
    closeTotalPopup();
    closeCartPopup();

    // Redireciona para a página de pagamento
    window.location.href = "payment.html";
}

// Adicionar itens ao carrinho com `id`
document.querySelectorAll('.btn.comprar').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        const itemElement = this.parentElement;
        const itemName = itemElement.querySelector('h3').textContent;
        const itemPrice = parseFloat(itemElement.querySelector('p').textContent.replace('R$', '').replace(',', '.'));
        const itemId = itemElement.getAttribute('data-id'); // Atributo data-id do elemento HTML

        // Adiciona ao carrinho com o id
        cart.push({ id: itemId, name: itemName, price: itemPrice });
        alert(`${itemName} foi adicionado ao carrinho.`);
        
        // Atualiza a contagem de itens no carrinho
        updateItemCount();
    });
});

// Adicionar evento de clique para abrir o popup do carrinho
document.querySelector('.cart-icon').addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do link
    openCartPopup(); // Abre o popup do carrinho
});

// Adicionar evento de clique para prosseguir com a venda
document.querySelector('#total-popup button').addEventListener('click', confirmSale);
