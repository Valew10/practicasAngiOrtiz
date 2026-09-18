function cambiar() {
document.getElementById("tarjeta").classList.toggle("oculto");
}
function claro() {
document.getElementById("tarjeta").classList.remove("oscuro");
document.getElementById("tarjeta").classList.add("claro");
}
function oscuro() {
document.getElementById("tarjeta").classList.remove("claro");
document.getElementById("tarjeta").classList.add("oscuro");
}
