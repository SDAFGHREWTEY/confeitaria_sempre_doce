const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = usernameInput.value.trim();
    const senha = passwordInput.value;

    // Recupera os usuários do localStorage
    try {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Verifica se existe um usuário com o email e senha fornecidos
        const usuario = usuarios.find(u => u.email === email && u.senha === senha);

        if (usuario) {
            alert(`Bem-vindo, ${usuario.nome}! Login realizado com sucesso.`);
            form.reset(); // Limpa o formulário
            window.location.href = 'index.html'; // Redireciona para index.html
        } else {
            alert('Email ou senha incorretos. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao acessar o localStorage:', error);
        alert('Ocorreu um erro ao realizar o login. Tente novamente.');
    }
});