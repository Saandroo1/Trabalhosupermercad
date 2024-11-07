// Função para validar o formato do CEP brasileiro
function isValidBrazilianCep(cep) {
    const cepPattern = /^[0-9]{5}-?[0-9]{3}$/; // Formato 12345-678 ou 12345678
    return cepPattern.test(cep);
}

// Função para obter e estruturar o carrinho do Local Storage
function getCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productMap = {};

    // Contabilizar a quantidade de cada produto
    cart.forEach(item => {
        if (productMap[item.id]) {
            productMap[item.id].quantityChoose += 1;
        } else {
            productMap[item.id] = {
                id: item.id, // ID do produto
                name: item.name,
                value: item.price,
                quantityChoose: 1
            };
        }
    });

    // Converter para um array de objetos
    return Object.values(productMap);
}

// Função para calcular o total da compra
function calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.value * item.quantityChoose, 0);
}

// Função para calcular o total da compra com delivery
function calculateTotalWithDelivery(cartItems, deliveryRate) {
    const totalPurchase = calculateTotal(cartItems);
    const deliveryCost = deliveryRate * totalPurchase / 100; // Exemplo de taxa de entrega: 5%
    return { totalPurchase, deliveryCost, totalWithDelivery: totalPurchase + deliveryCost };
}

// Função para enviar os dados de pagamento
function openPaymentSummary(totalPurchase, deliveryCost, totalWithDelivery) {
    document.getElementById("sale-amount").textContent = `Valor da Compra: R$ ${totalPurchase.toFixed(2)}`;
    document.getElementById("delivery-amount").textContent = `Valor de Entrega: R$ ${deliveryCost.toFixed(2)}`;
    document.getElementById("total-amount").textContent = `Total: R$ ${totalWithDelivery.toFixed(2)}`;
    
    const popup = document.getElementById("payment-summary-popup");
    popup.style.display = "flex"; // Exibe o popup
}

document.getElementById("close-popup").addEventListener("click", function() {
    document.getElementById("payment-summary-popup").style.display = "none"; // Fecha o popup
});

// Atualize a função enviarPagamento para usar o novo método
function enviarPagamento() {
    const cep = document.getElementById('cep').value.trim();
    const cartItems = getCartItems();
    const deliveryRate = 5; // 5% do valor total

    if (isValidBrazilianCep(cep)) {
        // Calcula os valores
        const { totalPurchase, deliveryCost, totalWithDelivery } = calculateTotalWithDelivery(cartItems, deliveryRate);

        openPaymentSummary(totalPurchase, deliveryCost, totalWithDelivery);
        
        localStorage.removeItem('cart');
    } else {
        alert("Por favor, insira um CEP válido no formato brasileiro (XXXXX-XXX).");
    }
}


// Manipula o envio do formulário
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        enviarPagamento();
    });
});
