const bandera = document.querySelector("#bandera")
const btn = document.querySelectorAll(".btn")
const clases = [
    'francia',
    'alemania',
    'argentina',
]
btn.forEach(elemento, index => {
    elemento.addEventListener('click', function() {
        cambiarClase(index);  
    })
    
});

function cambiarClase(index){
    bandera.classList.remove(...bandera.classList)    
    bandera.classList.add(clases[index])
}