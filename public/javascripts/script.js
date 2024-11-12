const quill = new Quill('#evolucion-text', {
    theme: 'snow'
    });
function cargarPlantilla(elemento){
    const plantilla = elemento.parentElement.querySelector('input[type="hidden"]').value;
    quill.root.innerHTML = plantilla;
}

function agregarAlergia() {
    const alergia = document.getElementById('alergia');
    const alergiasSeleccionadas = document.getElementById('alergias-seleccionadas');
    const fechaDesde = document.getElementById('alergia-inicio');
    const fechaHasta = document.getElementById('alergia-fin');
    const importancia = document.getElementById('importancia');
    // const option = document.createElement('input');
    // option.value = alergia.value;
    // option.value = alergia.options[alergia.selectedIndex].text;
    // option.setAttribute("id_alergia", alergia.value);
    // option.setAttribute("disabled", "true");
    // console.log(option)
    // const alergiaActual = document.getElementById('carga_alergias').cloneNode(true);
    const registrada = document.createElement('div');
    registrada.className = 'alergia-guardada d-flex flex-column';
    registrada.innerHTML = ` 
    <div class="d-flex flex-row justify-content-center">
    <input disabled class="valor-alergia" id_alergia=${alergia.value} value="${alergia.options[alergia.selectedIndex].text}">
    <input disabled class="valor-importancia" id_importancia=${importancia.value} value="${importancia.options[importancia.selectedIndex].text}">
    </div>
    <div class="d-flex flex-row justify-content-center">
    <input disabled type="date" class="fecha-desde" value=${fechaDesde.value}>
    <input disabled type="date" class="fecha-hasta" value=${fechaHasta.value}>
    <button onclick="removerItem(this)" class="btn btn-danger w-5 m-1" type="button">-</button>
    </div>
    <hr>
    `

    alergiasSeleccionadas.append(registrada);
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
let numeroDiagnostico = 0;
document.getElementById('agregar-diagnostico').addEventListener('click', agregarDiagnostico);
    async function agregarDiagnostico() {
    const diagnosticos = document.getElementById('diagnosticos-container');
    const nuevoDiagnosticoDiv = document.createElement('div')
    nuevoDiagnosticoDiv.className = 'diagnostico-info d-flex flex-row mb-3';
    const textArea = document.createElement('textarea')
    textArea.className = 'form-control';
    const estadosDiv = document.createElement('div')
    estadosDiv.className = 'form-check';
    numeroDiagnostico++;
    estadosDiagnosticos = await fetchEstadosDiagnosticos();
    console.log(estadosDiagnosticos);
    estadosDiagnosticos.forEach(element => {
        const input = document.createElement('input');
        if(element.id_estado === 1) input.checked = true;
        input.setAttribute('type', 'radio');
        input.setAttribute('id', element.id_estado+""+numeroDiagnostico)
        input.setAttribute('value', element.id_estado)
        input.setAttribute('name', "estado-diagnostico-radio"+numeroDiagnostico)
        input.className = 'form-check-input';
        const label = document.createElement('label')
        label.innerHTML = element.descripcion;
        label.setAttribute("for", element.id_estado+""+numeroDiagnostico)
        label.className = 'form-check-label';
        estadosDiv.append(label, input);
    });
    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.setAttribute('onclick', 'removerItem(this)')
    button.className = 'btn btn-danger h-25 m-3'
    button.innerHTML = '-';

    nuevoDiagnosticoDiv.append(textArea, estadosDiv, button);
    // console.log(estados_diagnosticos);
    // nuevoDiagnosticoDiv.innerHTML = nuevoDiagnostico;
    diagnosticos.append(nuevoDiagnosticoDiv);
    
};
async function fetchEstadosDiagnosticos(){
    const data = await fetch('/consultas/estados_de_diagnosticos')
    const estados_diagnosticos = await data.json();
    return estados_diagnosticos;
}
const alertas = document.getElementById('alertas');
function finalizarConsulta(idConsulta) {
    let hayDiagnosticosEnBlanco = false;
    const consulta = datosDeConsulta();
    let errores = ""
    consulta.diagnosticos.forEach(element => {
        if(element.descripcion ===''){
            hayDiagnosticosEnBlanco = true;
    }});
    if(consulta.diagnosticos.length == 0){ 
        errores += `
        <div class="alert alert-danger" role="alert">
        Debe ingresar al menos un diagnostico!
        </div>`
    }else if (hayDiagnosticosEnBlanco){
        errores += `
        <div class="alert alert-danger" role="alert">
        No debe dejar diagnosticos en blanco!
        </div>`
    }
    else if(consulta.evolucion.descripcion == '<p><br></p>'){
        errores += `
        <div class="alert alert-danger" role="alert">
        Debe ingresar una evolucion!
        </div>`
    }else{
        postConsulta(consulta);
    }
    alertas.innerHTML = errores;
}
function guardarConsulta(idConsulta) {
    const consulta = datosDeConsulta();
    console.log(consulta);
    // updateConsulta(consulta);
}
function datosDeConsulta(){

    const diagnosticosContainer = document.getElementById('diagnosticos-container');
    const diagnosticosHTML = diagnosticosContainer.querySelectorAll('.diagnostico-info');
    const diagnosticos = recuperarDiagnosticos(diagnosticosHTML);

    //obtener ids de las alergias
    const alergiasContainer = document.getElementById('alergias-seleccionadas');
    const alergiasHTML = alergiasContainer.querySelectorAll('.alergia-guardada');
    const alergias = recuperarAlergias(alergiasHTML);
    
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
    //CORREGIR, losmedicamentos no tienen fechas
    const medicamentosContainer = document.getElementById('medicamentos-container');
    const medicamentoHTML = medicamentosContainer.querySelectorAll('.medicamento-info');
    const medicamentos = recuperarTextArea(medicamentoHTML);
    
    const evolucionContainer = document.getElementById('evolucion-text');
    // const evolucionHTML = evolucionContainer.querySelector('[class="ql-editor"]').children;
    const evolucionQuill = quill.root.innerHTML
    console.log("-------------------",evolucionQuill,"--------------------");
    const evolucion = {descripcion: evolucionQuill }
    const idConsulta = document.getElementById('id-consulta').value;
    console.log(evolucion);
    console.log(diagnosticos);
    console.log(alergias)
    console.log(antecedentes);
    console.log(habitos);
    console.log(medicamentos);
    return {idConsulta, evolucion, diagnosticos, alergias, antecedentes, habitos, medicamentos};
}
function recuperarDiagnosticos(itemHTML) {
    const items = [];
    itemHTML.forEach(element => {
        items.push(
            {
                descripcion: element.querySelector('textarea').value,
                id_estado: element.querySelector('input[type="radio"]:checked').value
            }
)});
    return items;
}
function recuperarAlergias (itemHTML) {
    const items = [];
    itemHTML.forEach(element => {
        items.push(
            {
                id_alergia: element.querySelector('.valor-alergia').getAttribute('id_alergia'),
                id_importancia: element.querySelector('.valor-importancia').getAttribute('id_importancia'),
                fecha_desde: element.querySelector('.fecha-desde').value || '',
                fecha_hasta: element.querySelector('.fecha-hasta').value || ''
            }
        )});
    return items;
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
function recuperarTextArea(itemHTML) {
    const items = [];
    itemHTML.forEach(element => {
        items.push(
            {
                descripcion: element.querySelector('textarea').value || ''
            }
        )
    });
    return items;
}

async function postConsulta(consulta){
    const datos = {
        id_consulta: consulta.idConsulta,
        evolucion: consulta.evolucion,
        diagnosticos: consulta.diagnosticos,
        alergias: consulta.alergias,
        antecedentes: consulta.antecedentes,
        habitos: consulta.habitos,
        medicamentos: consulta.medicamentos
    }
    const data = await fetch('/consultas/cargar',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    const matricula = localStorage.getItem('matricula');
    if (data.redirected){
        window.location.href = data.url+'?matricula='+matricula;
    }
}
async function updateConsulta(consulta){
    const datos = {
        id_consulta: consulta.idConsulta,
        evolucion: consulta.evolucion,
        diagnosticos: consulta.diagnosticos,
        alergias: consulta.alergias,
        antecedentes: consulta.antecedentes,
        habitos: consulta.habitos,
        medicamentos: consulta.medicamentos
    }
    const data = await fetch('/consultas/editar',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    const matricula = localStorage.getItem('matricula');
    if (data.redirected){
        window.location.href = data.url+'?matricula='+matricula;
    }
}