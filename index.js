let imagens = [
    'img/download.jfif',
    'img/download (1).jfif',
    'img/download (2).jfif',

]
let indiceAtual = 0;

function trocarImagem(){
    let img = document.getElementById('img-carrosel');
    img.src = imagens[indiceAtual];
}

setInterval(function(){
trocarImagem();
indiceAtual++;
if(indiceAtual >= imagens.length){
    indiceAtual = 0;
}
}, 5000);
    

trocarImagem();
indiceAtual++;