function agregarAlergia() {
    const alergia = document.getElementById('alergia');
    const alergiasSeleccionadas = document.getElementById('alergias-seleccionadas');
    const option = document.createElement('input');
    // option.value = alergia.value;
    option.value = alergia.options[alergia.selectedIndex].text;
    option.setAttribute("id_alergia", alergia.value);
    option.setAttribute("disabled", "true");
    console.log(option)
    alergiasSeleccionadas.append(option);
}
document.getElementById('agregar_alergia').addEventListener('click', agregarAlergia);