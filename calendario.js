function adicionarCompromisso() {
    const nome = document.getElementById("Nome").value.trim();
    const produto = document.getElementById("Produto").value.trim();
    const quantidade = document.getElementById("Quantidade").value;
    const data = document.getElementById("Data").value;
    const telefone = document.getElementById("Telefone").value.replace(/\D/g, '');

    if (!nome || !produto || !quantidade || !data || telefone.length < 10) {
        alert(" Preencha todos os campos corretamente!");
        return;
    }

    if (quantidade <= 0) {
        alert(" Quantidade deve ser maior que 0!");
        return;
    }

    const reserva = {
        nome, produto, 
        quantidade: parseInt(quantidade),
        data, 
        telefone: `(${telefone.slice(0,2)}) ${telefone.slice(2,7)}-${telefone.slice(7)}`,
        id: Date.now()
    };

    let reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    document.querySelectorAll('input').forEach(input => input.value = "");
    alert("✅ Reserva salva com sucesso!");
}

function recarregarCalendario() {
    if (window.location.href.includes('agenda.html')) {
        window.location.reload();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tel = document.getElementById('Telefone');
    tel.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{2})(\d)/, '($1) $2');
        v = v.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = v;
    });

    document.getElementById('Data').min = new Date().toISOString().split('T')[0];
});