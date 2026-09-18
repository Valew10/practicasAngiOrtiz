const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const mensaje = document.getElementById("mensaje");
const puntosTexto = document.getElementById("puntos");
const reiniciar = document.getElementById("reiniciar");

canvas.width = 700;
canvas.height = 450;

let dibujando = false;
let puntos = 0;
let figuraActual = 0;

let ladoActual = 0;
let puntoInicio = null;
let ladosCompletados = 0;


let anguloAnterior = null;
let anguloRecorrido = 0;
let direccionCirculo = 0;

const nombresFiguras = [
    "triángulo",
    "círculo",
    "cuadrado",
    "rectángulo"
];

const triangulo = [
    { x: 350, y: 70 },
    { x: 170, y: 350 },
    { x: 530, y: 350 }
];

const cuadrado = [
    { x: 190, y: 110 },
    { x: 510, y: 110 },
    { x: 510, y: 350 },
    { x: 190, y: 350 }
];

const rectangulo = [
    { x: 140, y: 120 },
    { x: 560, y: 120 },
    { x: 560, y: 340 },
    { x: 140, y: 340 }
];

const circulo = {
    x: 350,
    y: 225,
    radio: 145
};



function obtenerPosicion(evento) {

    const rect = canvas.getBoundingClientRect();

    let x;
    let y;

    if (evento.touches && evento.touches.length > 0) {

        x = evento.touches[0].clientX;
        y = evento.touches[0].clientY;

    } else if (
        evento.changedTouches &&
        evento.changedTouches.length > 0
    ) {

        x = evento.changedTouches[0].clientX;
        y = evento.changedTouches[0].clientY;

    } else {

        x = evento.clientX;
        y = evento.clientY;
    }

    return {
        x: (x - rect.left) *
            (canvas.width / rect.width),

        y: (y - rect.top) *
            (canvas.height / rect.height)
    };
}




function distanciaEntrePuntos(
    x1,
    y1,
    x2,
    y2
) {

    return Math.sqrt(
        Math.pow(x1 - x2, 2) +
        Math.pow(y1 - y2, 2)
    );
}



function dibujarPunto(
    x,
    y,
    color,
    radio = 8
) {

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        radio,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = color;
    ctx.fill();
}




function dibujarTexto(texto) {

    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#555";
    ctx.textAlign = "center";

    ctx.fillText(
        texto,
        350,
        40
    );
}



function dibujarTriangulo() {

    ctx.beginPath();

    ctx.setLineDash([7, 8]);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#333";

    ctx.moveTo(
        triangulo[0].x,
        triangulo[0].y
    );

    ctx.lineTo(
        triangulo[1].x,
        triangulo[1].y
    );

    ctx.lineTo(
        triangulo[2].x,
        triangulo[2].y
    );

    ctx.lineTo(
        triangulo[0].x,
        triangulo[0].y
    );

    ctx.stroke();

    ctx.setLineDash([]);

  
    dibujarPunto(
        triangulo[0].x,
        triangulo[0].y,
        "#8BCF32"
    );

    dibujarPunto(
        triangulo[1].x,
        triangulo[1].y,
        "#8BCF32"
    );

    
    dibujarPunto(
        triangulo[2].x,
        triangulo[2].y,
        "#FFCF1B"
    );

    dibujarTexto(
        "Triángulo - empieza en un punto verde"
    );
}




function dibujarCuadrado() {

    ctx.beginPath();

    ctx.setLineDash([7, 8]);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#333";

    ctx.moveTo(
        cuadrado[0].x,
        cuadrado[0].y
    );

    ctx.lineTo(
        cuadrado[1].x,
        cuadrado[1].y
    );

    ctx.lineTo(
        cuadrado[2].x,
        cuadrado[2].y
    );

    ctx.lineTo(
        cuadrado[3].x,
        cuadrado[3].y
    );

    ctx.lineTo(
        cuadrado[0].x,
        cuadrado[0].y
    );

    ctx.stroke();

    ctx.setLineDash([]);

    dibujarPunto(
        cuadrado[0].x,
        cuadrado[0].y,
        "#8BCF32"
    );

    dibujarPunto(
        cuadrado[3].x,
        cuadrado[3].y,
        "#8BCF32"
    );

    dibujarPunto(
        cuadrado[1].x,
        cuadrado[1].y,
        "#FFCF1B"
    );

    dibujarTexto(
        "Cuadrado - empieza en un punto verde"
    );
}




function dibujarRectangulo() {

    ctx.beginPath();

    ctx.setLineDash([7, 8]);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#333";

    ctx.moveTo(
        rectangulo[0].x,
        rectangulo[0].y
    );

    ctx.lineTo(
        rectangulo[1].x,
        rectangulo[1].y
    );

    ctx.lineTo(
        rectangulo[2].x,
        rectangulo[2].y
    );

    ctx.lineTo(
        rectangulo[3].x,
        rectangulo[3].y
    );

    ctx.lineTo(
        rectangulo[0].x,
        rectangulo[0].y
    );

    ctx.stroke();

    ctx.setLineDash([]);

    dibujarPunto(
        rectangulo[0].x,
        rectangulo[0].y,
        "#8BCF32"
    );

    dibujarPunto(
        rectangulo[3].x,
        rectangulo[3].y,
        "#8BCF32"
    );

    dibujarPunto(
        rectangulo[1].x,
        rectangulo[1].y,
        "#FFCF1B"
    );

    dibujarTexto(
        "Rectángulo - empieza en un punto verde"
    );
}




function dibujarCirculo() {

    ctx.beginPath();

    ctx.setLineDash([7, 8]);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#333";

    ctx.arc(
        circulo.x,
        circulo.y,
        circulo.radio,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.setLineDash([]);

    
    dibujarPunto(
        circulo.x,
        circulo.y - circulo.radio,
        "#8BCF32"
    );

   
    dibujarPunto(
        circulo.x,
        circulo.y + circulo.radio,
        "#8BCF32"
    );

    dibujarPunto(
        circulo.x + circulo.radio,
        circulo.y,
        "#FFCF1B"
    );

    dibujarTexto(
        "Círculo - empieza en un punto verde"
    );
}





function dibujarFigura() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    if (figuraActual === 0) {

        dibujarTriangulo();

    } else if (figuraActual === 1) {

        dibujarCirculo();

    } else if (figuraActual === 2) {

        dibujarCuadrado();

    } else if (figuraActual === 3) {

        dibujarRectangulo();
    }
}




function obtenerVertices() {

    if (figuraActual === 0) {
        return triangulo;
    }

    if (figuraActual === 2) {
        return cuadrado;
    }

    if (figuraActual === 3) {
        return rectangulo;
    }

    return null;
}




function encontrarPuntoVerde(x, y) {

   
    if (figuraActual === 1) {

        const arriba =
            distanciaEntrePuntos(
                x,
                y,
                circulo.x,
                circulo.y - circulo.radio
            );

        const abajo =
            distanciaEntrePuntos(
                x,
                y,
                circulo.x,
                circulo.y + circulo.radio
            );

        if (arriba <= 30) {
            return 0;
        }

        if (abajo <= 30) {
            return 1;
        }

        return null;
    }


  
    const vertices = obtenerVertices();

    let puntosVerdes;

   
    if (figuraActual === 0) {

        puntosVerdes = [0, 1];

    } else {

       
        puntosVerdes = [0, 3];
    }


    for (let i of puntosVerdes) {

        const distancia =
            distanciaEntrePuntos(
                x,
                y,
                vertices[i].x,
                vertices[i].y
            );

        if (distancia <= 30) {
            return i;
        }
    }

    return null;
}



function comenzar(evento) {

    evento.preventDefault();

    const posicion =
        obtenerPosicion(evento);

    const inicio =
        encontrarPuntoVerde(
            posicion.x,
            posicion.y
        );


    if (inicio === null) {

        mensaje.textContent =
            " ¡Empieza en uno de los puntos verdes!";

        mensaje.style.color =
            "#F39C12";

        return;
    }


    dibujando = true;

    puntoInicio = inicio;

    ladoActual = inicio;

    ladosCompletados = 0;


    
    if (figuraActual === 1) {

        const dx =
            posicion.x - circulo.x;

        const dy =
            posicion.y - circulo.y;

        anguloAnterior =
            Math.atan2(dy, dx);

        anguloRecorrido = 0;

        direccionCirculo = 0;
    }


    ctx.beginPath();

    ctx.moveTo(
        posicion.x,
        posicion.y
    );

    ctx.strokeStyle = "#1596E6";

    ctx.lineWidth = 10;

    ctx.lineCap = "round";

    ctx.lineJoin = "round";


    mensaje.textContent =
        "¡Muy bien! Sigue toda la figura";

    mensaje.style.color =
        "#1596E6";
}



function dibujarPoligono(evento) {

    const posicion =
        obtenerPosicion(evento);

    const vertices =
        obtenerVertices();

    const cantidad =
        vertices.length;


    const inicio =
        vertices[ladoActual];

    const siguiente =
        vertices[
            (ladoActual + 1) % cantidad
        ];


    const distancia =
        distanciaPuntoLinea(
            posicion.x,
            posicion.y,
            inicio.x,
            inicio.y,
            siguiente.x,
            siguiente.y
        );


   
    if (distancia > 45) {

        dibujando = false;

        mensaje.textContent =
            " ¡Casi! Sigue la línea punteada";

        mensaje.style.color =
            "#F39C12";

        return;
    }


    ctx.lineTo(
        posicion.x,
        posicion.y
    );

    ctx.stroke();


    const distanciaFinal =
        distanciaEntrePuntos(
            posicion.x,
            posicion.y,
            siguiente.x,
            siguiente.y
        );



    if (distanciaFinal <= 35) {

        ladoActual =
            (ladoActual + 1) % cantidad;

        ladosCompletados++;


    
        if (
            ladosCompletados >= cantidad
        ) {

            terminar();

            return;
        }
    }


    mensaje.textContent =
        " ¡Sigue toda la figura!";

    mensaje.style.color =
        "#1596E6";
}



function dibujarCirculoTrazo(evento) {

    const posicion =
        obtenerPosicion(evento);


    const dx =
        posicion.x - circulo.x;

    const dy =
        posicion.y - circulo.y;


    const distanciaCentro =
        Math.sqrt(
            dx * dx +
            dy * dy
        );



    if (
        Math.abs(
            distanciaCentro -
            circulo.radio
        ) > 45
    ) {

        dibujando = false;

        mensaje.textContent =
            " ¡Casi! Sigue la línea del círculo";

        mensaje.style.color =
            "#F39C12";

        return;
    }


    const anguloActual =
        Math.atan2(dy, dx);


    if (anguloAnterior === null) {

        anguloAnterior =
            anguloActual;
    }


    let diferencia =
        anguloActual -
        anguloAnterior;


    
    while (diferencia > Math.PI) {
        diferencia -= Math.PI * 2;
    }

    while (diferencia < -Math.PI) {
        diferencia += Math.PI * 2;
    }


    
    if (
        direccionCirculo === 0 &&
        Math.abs(diferencia) > 0.02
    ) {

        direccionCirculo =
            diferencia > 0 ? 1 : -1;
    }


    
    const avance =
        diferencia * direccionCirculo;


    if (avance > 0) {

        anguloRecorrido += avance;
    }


    anguloAnterior =
        anguloActual;


    
    ctx.lineTo(
        posicion.x,
        posicion.y
    );

    ctx.stroke();


    
    let puntoFinal;

    if (puntoInicio === 0) {

        puntoFinal = {
            x: circulo.x,
            y: circulo.y - circulo.radio
        };

    } else {

        puntoFinal = {
            x: circulo.x,
            y: circulo.y + circulo.radio
        };
    }


    const distanciaFinal =
        distanciaEntrePuntos(
            posicion.x,
            posicion.y,
            puntoFinal.x,
            puntoFinal.y
        );


   
    if (
        anguloRecorrido >=
        Math.PI * 2 * 0.90 &&
        distanciaFinal <= 45
    ) {

        terminar();

        return;
    }


    mensaje.textContent =
        " ¡Sigue alrededor del círculo!";

    mensaje.style.color =
        "#1596E6";
}



function dibujar(evento) {

    if (!dibujando) {
        return;
    }

    evento.preventDefault();


    if (figuraActual === 1) {

       
        dibujarCirculoTrazo(evento);

    } else {

        
        dibujarPoligono(evento);
    }
}




function distanciaPuntoLinea(
    px,
    py,
    x1,
    y1,
    x2,
    y2
) {

    const A = px - x1;
    const B = py - y1;

    const C = x2 - x1;
    const D = y2 - y1;

    const dot =
        A * C +
        B * D;

    const lenSq =
        C * C +
        D * D;

    let param = -1;

    if (lenSq !== 0) {

        param =
            dot / lenSq;
    }


    let xx;
    let yy;


    if (param < 0) {

        xx = x1;
        yy = y1;

    } else if (param > 1) {

        xx = x2;
        yy = y2;

    } else {

        xx =
            x1 + param * C;

        yy =
            y1 + param * D;
    }


    const dx =
        px - xx;

    const dy =
        py - yy;


    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}




function terminar() {

    dibujando = false;

    puntos += 10;

    puntosTexto.textContent =
        puntos;


    mensaje.textContent =
        " ¡MUY BIEN! ¡Completaste el " +
        nombresFiguras[figuraActual] +
        "!";

    mensaje.style.color =
        "#35A853";


    canvas.classList.add("exito");


    setTimeout(() => {

        canvas.classList.remove("exito");

        figuraActual++;


        if (
            figuraActual >=
            nombresFiguras.length
        ) {

            mensaje.textContent =
                " ¡EXCELENTE! ¡Completaste todas las figuras!";

            mensaje.style.color =
                "#35A853";

            return;
        }


    
        ladoActual = 0;

        puntoInicio = null;

        ladosCompletados = 0;

        anguloAnterior = null;

        anguloRecorrido = 0;

        direccionCirculo = 0;


        dibujarFigura();


        mensaje.textContent =
            "Ahora sigue el " +
            nombresFiguras[figuraActual];

        mensaje.style.color =
            "#1596E6";

    }, 1200);
}




canvas.addEventListener(
    "mousedown",
    comenzar
);

canvas.addEventListener(
    "mousemove",
    dibujar
);

canvas.addEventListener(
    "mouseup",
    () => {
        dibujando = false;
    }
);

canvas.addEventListener(
    "mouseleave",
    () => {
        dibujando = false;
    }
);




canvas.addEventListener(
    "touchstart",
    comenzar,
    { passive: false }
);

canvas.addEventListener(
    "touchmove",
    dibujar,
    { passive: false }
);

canvas.addEventListener(
    "touchend",
    () => {
        dibujando = false;
    }
);




reiniciar.addEventListener(
    "click",
    () => {

       

        dibujando = false;

        ladoActual = 0;

        puntoInicio = null;

        ladosCompletados = 0;

        anguloAnterior = null;

        anguloRecorrido = 0;

        direccionCirculo = 0;

        mensaje.textContent = "";

        dibujarFigura();
    }
);




dibujarFigura();