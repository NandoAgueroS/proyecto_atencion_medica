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

document.getElementById('nuevo_antecedente').addEventListener('click', function() {
    const antecedente = document.getElementById('antecedentes-container');
    const nuevoAntecedenteDiv = document.createElement('div');
    nuevoAntecedenteDiv.className = 'antecedente-info d-flex flex-row mb-3';
    // nuevoAntecedente.className = 'd-flex flex-row';
    // const nuevoTextArea = document.createElement('textarea');
    // nuevoTextArea.className = 'form-control w-50 mb-3';
    const nuevoAntecedente = `
        <textarea class="form-control w-50"></textarea>
        <input type="date" class="fecha-desde form-control h-50 w-auto m-3">
        <input type="date" class="fecha-hasta form-control h-50 w-auto m-3">
        <button id="remover_antecedente" onclick="removerItem(this)" class="btn btn-danger h-25 m-3" type="button">-</button>
        `
    nuevoAntecedenteDiv.innerHTML = nuevoAntecedente;
    antecedente.append(nuevoAntecedenteDiv);
})   
document.getElementById('nuevo_habito').addEventListener('click', function() {
    const habitos = document.getElementById('habitos-container');
    const nuevoHabitoDiv = document.createElement('div');
    // nuevoAntecedente.className = 'd-flex flex-row';
    // const nuevoTextArea = document.createElement('textarea');
    // nuevoTextArea.className = 'form-control w-50 mb-3';
    nuevoHabitoDiv.className = 'habito-info d-flex flex-row mb-3';
    const nuevoHabito = `
    <textarea class="form-control w-50"></textarea>
    <input type="date" class="fecha-desde form-control h-50 w-auto m-3">
    <input type="date" class="fecha-hasta form-control h-50 w-auto m-3">
    <button id="remover_habito" onclick="removerItem(this)" class="btn btn-danger h-25 m-3" type="button">-</button>
    `
    nuevoHabitoDiv.innerHTML = nuevoHabito;
    habitos.append(nuevoHabitoDiv);
})   
document.getElementById('nuevo_medicamento').addEventListener('click', function() {
    const medicamentos = document.getElementById('medicamentos-container');
    const nuevoMedicamentoDiv = document.createElement('div');
    // nuevoAntecedente.className = 'd-flex flex-row';
    // const nuevoTextArea = document.createElement('textarea');
    // nuevoTextArea.className = 'form-control w-50 mb-3';
    nuevoMedicamentoDiv.className = 'medicamento-info d-flex flex-row mb-3';
    const nuevoMedicamento = `
            <textarea class="form-control w-50"></textarea>
            <input type="date" class="fecha-desde form-control h-50 w-auto m-3">
            <input type="date" class="fecha-hasta form-control h-50 w-auto m-3">
            <button id="remover_antecedente" onclick="removerItem(this)" class="btn btn-danger h-25 m-3" type="button">-</button>
    `
    nuevoMedicamentoDiv.innerHTML = nuevoMedicamento;
    medicamentos.append(nuevoMedicamentoDiv);
})   
function removerItem(element) {
    element.parentElement.remove();
}

function finalizarConsulta(){
    const evolucion = document.getElementById('evolucion');
    const diagnosticos = document.getElementById('diagnosticos');
    //obtener ids de las alergias
    const alergiasContainer = document.getElementById('alergias-seleccionadas');
    const alergias = Array.from(alergiasContainer.querySelectorAll('input'));
    const ids_alergias = alergias.map(alergia => alergia.getAttribute('id_alergia'));
    // console.log(ids_alergias);

    //obtener antecedentes
    const antecedentesContainer = document.getElementById('antecedentes-container');
    const antecedenteHTML = antecedentesContainer.querySelectorAll('.antecedente-info');
    const antecedentes = recuperarTextAreaFechas(antecedenteHTML);
    
    //obtener habitos
    const habitosContainer = document.getElementById('habitos-container');
    const habitoHTML = habitosContainer.querySelectorAll('.habito-info');
    const habitos = recuperarTextAreaFechas(habitoHTML);
    
    //obtener medicamentos
    const medicamentosContainer = document.getElementById('medicamentos-container');
    const medicamentoHTML = medicamentosContainer.querySelectorAll('.medicamento-info');
    const medicamentos = recuperarTextAreaFechas(medicamentoHTML);

    console.log(antecedentes);
    console.log(habitos);
    console.log(medicamentos);
}
function recuperarTextAreaFechas(itemHTML) {
    const items = [];
    itemHTML.forEach(element => {
        items.push(
            {
                descripcion: element.querySelector('textarea').value || '',
                fecha_desde: element.querySelector('input.fecha-desde').value || '',
                fecha_hasta: element.querySelector('input.fecha-hasta').value || ''
            }
        )
    });
    return items;
}