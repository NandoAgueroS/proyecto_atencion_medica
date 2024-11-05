document.getElementById('select-especialidad').addEventListener('change', cambiarEspecialidad);
function cambiarEspecialidad(){
    const matricula = document.getElementById('select-especialidad').value;
    console.log(matricula);
    localStorage.setItem('matricula', matricula);
    window.location.href = `/turnos?matricula=${matricula}`
}