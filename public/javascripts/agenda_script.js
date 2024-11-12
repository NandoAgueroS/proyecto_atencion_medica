function consultarAgenda(){
    const matricula = document.getElementById('select-especialidad').value;
    const dia_agenda = document.getElementById('dia_agenda').value;
    console.log(matricula);
    localStorage.setItem('matricula', matricula);
    window.location.href = `/turnos?matricula=${matricula}&dia_agenda=${dia_agenda}`
}