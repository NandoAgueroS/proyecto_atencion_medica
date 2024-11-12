document.getElementById('guardar-plantilla').addEventListener("click", async() => {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const plantillaContainer = document.getElementById('plantilla-nueva');
    const plantillaHTML = plantillaContainer.querySelector('[class="ql-editor"]').children;
    console.log(plantillaHTML);
    let plantillaString = '';

    for (const element of plantillaHTML) {
        plantillaString += element.outerHTML;
    }
    const plantilla = {
        plantilla_nombre: nombre,
        plantilla_descripcion: descripcion,
        plantilla_disenio: plantillaString}
    const data = fetch('/plantillas/cargar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plantilla)
    })
    if (data.redirected) {
        window.location.href = data.url;
    }
})