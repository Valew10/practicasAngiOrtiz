const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const mensaje = document.getElementById("mensaje");
const puntosTexto = document.getElementById("puntos");
const reiniciar = document.getElementById("reiniciar");



canvas.width = 700;
canvas.height = 450;



let dibujando = false;

let puntos = 0;

let progreso = 0;




const triangulo = [

    { x: 350, y: 70 },   
    { x: 170, y: 350 },  
    { x: 530, y: 350 },  
    { x: 350, y: 70 }    
];




function dibujarFigura() {

   

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    
    ctx.beginPath();

    ctx.setLineDash([6, 8]);

    ctx.lineWidth = 5;

    ctx.strokeStyle = "#333333";

    ctx.lineCap = "round";


    ctx.moveTo(
        triangulo[0].x,
        triangulo[0].y
    );


    for (
        let i = 1;
        i < triangulo.length;
        i++
    ) {

        ctx.lineTo(
            triangulo[i].x,
            triangulo[i].y
        );

    }


    ctx.stroke();

    ctx.setLineDash([]);


    

    ctx.beginPath();

    ctx.arc(
        triangulo[0].x,
        triangulo[0].y,
        13,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#8BCF32";

    ctx.fill();


    
    ctx.beginPath();

    ctx.arc(
        triangulo[1].x,
        triangulo[1].y,
        13,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#8BCF32";

    ctx.fill();


    
    ctx.beginPath();

    ctx.arc(
        triangulo[2].x,
        triangulo[2].y,
        10,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#ffcf1b";

    ctx.fill();


    
    ctx.font = "bold 20px Arial";

    ctx.fillStyle = "#555";

    ctx.textAlign = "center";


    ctx.fillText(
        "Empieza aquí 👆",
        350,
        40
    );

}




function obtenerPosicion(evento) {

    const rect =
        canvas.getBoundingClientRect();

    let x;
    let y;


   
    if (evento.touches) {

        x =
            evento.touches[0].clientX;

        y =
            evento.touches[0].clientY;

    }

    
    else {

        x = evento.clientX;

        y = evento.clientY;

    }


    return {

        x:
            (x - rect.left) *
            (canvas.width / rect.width),

        y:
            (y - rect.top) *
            (canvas.height / rect.height)

    };

}




function comenzar(evento) {

    evento.preventDefault();


    const posicion =
        obtenerPosicion(evento);


    

    const distancia =
        Math.sqrt(

            Math.pow(
                posicion.x -
                triangulo[0].x,
                2
            )

            +

            Math.pow(
                posicion.y -
                triangulo[0].y,
                2
            )

        );


    

    if (distancia > 50) {

        mensaje.textContent =
            " ¡Empieza en el punto verde!";

        mensaje.style.color =
            "#f39c12";

        return;

    }


    

    dibujando = true;

    progreso = 0;


    
    ctx.beginPath();

    ctx.moveTo(
        posicion.x,
        posicion.y
    );


    
    ctx.strokeStyle =
        "#1596E6";

    ctx.lineWidth = 10;

    ctx.lineCap =
        "round";

    ctx.lineJoin =
        "round";


    mensaje.textContent =
        " ¡Muy bien! Sigue la línea";

    mensaje.style.color =
        "#1596E6";

}



function dibujar(evento) {

    if (!dibujando) {

        return;

    }


    evento.preventDefault();


    const posicion =
        obtenerPosicion(evento);


    
    const cerca =
        estaCercaDelTrazo(
            posicion.x,
            posicion.y
        );


    
    if (!cerca) {

        dibujando = false;


        mensaje.textContent =
            " ¡Casi! Sigue la línea punteada";

        mensaje.style.color =
            "#f39c12";


        return;

    }


    
    ctx.lineTo(
        posicion.x,
        posicion.y
    );

    ctx.stroke();


    
    progreso++;


    

    if (progreso > 20) {

        mensaje.textContent =
            " ¡Sigue así!";

        mensaje.style.color =
            "#1596E6";

    }


    
    if (progreso >= 300) {

        terminar();

    }

}




function estaCercaDelTrazo(x, y) {

    const tolerancia = 45;


    for (
        let i = 0;
        i < triangulo.length - 1;
        i++
    ) {

        const p1 =
            triangulo[i];

        const p2 =
            triangulo[i + 1];


        const distancia =
            distanciaPuntoLinea(

                x,
                y,

                p1.x,
                p1.y,

                p2.x,
                p2.y

            );


        if (distancia <= tolerancia) {

            return true;

        }

    }


    return false;

}


function distanciaPuntoLinea(
    px,
    py,
    x1,
    y1,
    x2,
    y2
) {

    const A =
        px - x1;

    const B =
        py - y1;

    const C =
        x2 - x1;

    const D =
        y2 - y1;


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

    }

    else if (param > 1) {

        xx = x2;

        yy = y2;

    }

    else {

        xx =
            x1 +
            param * C;

        yy =
            y1 +
            param * D;

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
        " ¡MUY BIEN! ¡Completaste el triángulo!";


    mensaje.style.color =
        "#35A853";


    

    canvas.classList.add("exito");


    setTimeout(() => {

        canvas.classList.remove("exito");

    }, 600);

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

        progreso = 0;

        dibujando = false;

        mensaje.textContent = "";

        dibujarFigura();

    }
);




dibujarFigura();