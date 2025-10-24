const form = document.querySelector('form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmar_senha');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    try {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.some(u => u.email === email)) {
            alert('Este email já está cadastrado.');
            return;
        }

        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Cadastro realizado com sucesso!');
        form.reset();
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        alert('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
    }
});