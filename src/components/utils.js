const server = "http://localhost:8080";

export default {
    server: server,
    alunos: `${server}/alunos`,
    cursos: `${server}/cursos`,
    chamadas: `${server}/chamadas`,
    datas: `${server}/datas`,
    disciplinas: `${server}/disciplinas`,
    grades: `${server}/grades`,
    matriculas: `${server}/matriculas`,
    professores: `${server}/professores`,
    turmas: `${server}/turmas`
}

export function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') {
        alert("CPF inválido!");
        return false;
    }
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999") {
        alert("CPF inválido!");
        return false;
    }

    let soma = 0;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
        alert("CPF inválido!");
        return false;
    }
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
        alert("CPF inválido!");
        return false;
    }
    alert("CPF válido!");
    return true;
}

export function validarDataNascimento(dataNascimento) {
    const partes = dataNascimento.split('/');
    const dia = parseInt(partes[0]);
    const mes = parseInt(partes[1]) - 1; // Mês é base 0 (janeiro é 0)
    const ano = parseInt(partes[2]);
    const data = new Date(ano, mes, dia);
    
    // Verifica se a data é uma data válida
    if (data.getDate() !== dia || data.getMonth() !== mes || data.getFullYear() !== ano) {
        alert("Data de nascimento inválida!");
        return false;
    }
    
    // Verifica se a pessoa já nasceu
    const dataAtual = new Date();
    if (data > dataAtual) {
        alert("Data de nascimento inválida! A data de nascimento não pode ser maior que a data atual.");
        return false;
    }
    
    // Se passou por todas as verificações, a data de nascimento é válida
    alert("Data de nascimento válida!");
    return true;
}
