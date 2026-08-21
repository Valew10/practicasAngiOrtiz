const figuras = document.querySelectorAll(".figura");
const categorias = document.querySelectorAll(".categoria");

const puntosTexto = document.getElementById("puntos");
const mensaje = document.getElementById("mensaje");

const pista = document.getElementById("pista");
const textoPista = document.getElementById("textoPista");
const cerrarPista = document.getElementById("cerrarPista");

let puntos = 0;
let figurasCorrectas = 0;

let figuraActual = null;

let intentos = {};


figuras.forEach(figura => {

    figura.addEventListener("dragstart", function () {

        figuraActual = this;

        this.classList.add("arrastrando");

        const forma = this.dataset.forma;

        if (!intentos[forma]) {
            intentos[forma] = 0;
        }

    });


    figura.addEventListener("dragend", function () {

        this.classList.remove("arrastrando");

    });

});



categorias.forEach(categoria => {

    const zona = categoria.querySelector(".zona");


   

    zona.addEventListener("dragover", function (evento) {

        evento.preventDefault();

        this.classList.add("activa");

    });


    
    zona.addEventListener("dragleave", function () {

        this.classList.remove("activa");

    });


    
    zona.addEventListener("drop", function (evento) {

        evento.preventDefault();

        this.classList.remove("activa");


        
        if (!figuraActual) {
            return;
        }


        const formaFigura = figuraActual.dataset.forma;

        const formaCategoria = categoria.dataset.forma;


        

        if (formaFigura === formaCategoria) {

            this.appendChild(figuraActual);

            figuraActual.draggable = false;

            figuraActual.style.cursor = "default";

            figuraActual.classList.remove("arrastrando");


            puntos += 10;

            figurasCorrectas++;

            puntosTexto.textContent = puntos;


            mensaje.textContent = "🎉 ¡Muy bien!";

            mensaje.style.color = "#35a853";


            
            this.classList.add("correcto");

            setTimeout(() => {

                this.classList.remove("correcto");

            }, 600);


            

            if (figurasCorrectas === figuras.length) {

                mensaje.textContent = " ¡Excelente! Completaste el juego 🎉";

            }

        }


        
        else {

            const forma = figuraActual.dataset.forma;


           

            if (!intentos[forma]) {
                intentos[forma] = 0;
            }

            intentos[forma]++;


const pistas = {

    circulo: [
        " Mira con atención. El círculo no tiene esquinas.",
        " Observa su borde. Es completamente redondo.",
        " Busca la figura que parece una pelota."
    ],

    cuadrado: [
        " Mira sus lados. Tiene 4 lados.",
        " Sus 4 lados tienen el mismo tamaño.",
        " Busca la figura que tiene 4 lados iguales."
    ],

    triangulo: [
        " Mira sus esquinas. Tiene 3.",
        " Cuenta sus lados. Tiene 3.",
        " Busca la figura que tiene forma de montaña."
    ],

    rectangulo: [
        " Mira sus lados. Tiene 4.",
        "Tiene 2 lados largos y 2 lados cortos.",
        " Busca la figura que parece una puerta."
    ]

};

            let numeroPista = intentos[forma] - 1;


            if (numeroPista >= pistas[forma].length) {

                numeroPista = pistas[forma].length - 1;

            }


            
            if (textoPista) {

                textoPista.textContent = pistas[forma][numeroPista];

            }


            if (pista) {

                pista.classList.add("visible");

            }


            

            mensaje.textContent = "😊 ¡Casi!";

            mensaje.style.color = "#f39c12";


            
          zona.classList.remove("error");

           void zona.offsetWidth;

          zona.classList.add("error");

setTimeout(() => {
    zona.classList.remove("error");
}, 2000); 

        }


        

        figuraActual = null;

    });

});



if (cerrarPista) {

    cerrarPista.addEventListener("click", function () {

        pista.classList.remove("visible");

        mensaje.textContent = " ¡Inténtalo de nuevo!";

        mensaje.style.color = "#1596e6";

    });

}