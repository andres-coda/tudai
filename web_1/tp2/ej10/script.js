const img = document.querySelector("#img");
const submitBtn = document.querySelector("#submit");
const form = document.querySelector(".formulario");
const premio = document.querySelector("#premio");
const div = document.querySelector(".div-img");
const btn = document.querySelector("#btn")

const srcImgs = [
    { src: 'asset/descarga0.jfif', nombre: "perro" },
    { src: 'asset/descarga1.jfif', nombre: "cerdo" },
    { src: 'asset/descarga2.jfif', nombre: "puerco" },
    { src: 'asset/descarga3.jfif', nombre: "vaca" },
    { src: 'asset/descarga4.jfif', nombre: "vaca" },
    { src: 'asset/descarga5.jfif', nombre: "potro" },
    { src: 'asset/descarga6.jfif', nombre: "caballo" },
    { src: 'asset/descarga7.jfif', nombre: "gato" },
    { src: 'asset/descarga8.jfif', nombre: "batman" },
    { src: 'asset/descarga9.jfif', nombre: "perro" },
    { src: 'asset/descarga10.jfif', nombre: "pichicho" },
    { src: 'asset/descarga11.jfif', nombre: "perro" },
    { src: 'asset/descarga12.jfif', nombre: "firulais" },
]

const premioDefault = "Elije, estoy seguro que perderas";
premio.textContent = premioDefault;

let indexRandom = Math.floor(Math.random() * 13)

img.src = srcImgs[indexRandom].src;


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const gano = verificar(e);
    premio.textContent = darPremio(gano)
})

btn.addEventListener('click', function (e) {
    div.classList.remove("gano")
    div.classList.remove("perdio")
    premio.textContent = premioDefault;
    indexRandom = Math.floor(Math.random() * 13);
    img.src = srcImgs[indexRandom].src;
})

const verificar = (e) => {
    const nombre = document.querySelector("#nombre");
    return (nombre.value.toLowerCase() === srcImgs[indexRandom].nombre)
}

const darPremio = (gano) => {
    if (gano) {
        div.classList.remove("perdio")
        div.classList.add("gano")
        return "Felicitaciones, sabe de animales"
    } else {
        div.classList.remove("gano")
        div.classList.add("perdio")
        return "Error, vuelva a la escuela"
    }
}