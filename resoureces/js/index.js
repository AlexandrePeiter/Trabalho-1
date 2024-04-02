const mask = () =>{
    $('#CPF').mask('000.000.000-00');
    $('#cep').mask('00000-000');
    $('#telefone').mask('00000-0000');
}

window.onload = function() {
    mask();
};


const addTelefone = document.querySelector("#addTelefone");
const tagForm = document.querySelector(".form");

let vetTelefones = [];
let vetEmails = [];
let vetAlunos = [];


addTelefone.addEventListener("click", function(e){
    e.preventDefault();
    const telefones = document.querySelector("#telefones");
    const option = document.createElement("option");
    const ddd = document.querySelector("#ddd").value;
    const telefone = document.querySelector("#telefone").value;
    option.innerText = `(${ddd}) ${telefone}`;
    option.selected = true; 
    vetTelefones.push(`(${ddd}) ${telefone}`);
    telefones.appendChild(option);
});

addEmail.addEventListener("click", function(e){
    e.preventDefault();
    const telefones = document.querySelector("#emails");
    const option = document.createElement("option");
    const email = document.querySelector("#email").value;
    option.innerText = email;
    option.selected = true; 
    vetEmails.push(email);
    telefones.appendChild(option);
});

function criaAluno(nome, data, CPF, CEP, telefones, emails){
    let aluno = {
        nome: nome,
         data: data,
        CPF: CPF,
        CEP: CEP,
        telefones: telefones,
         emails: emails
    }
    return aluno;
}

addAluno.addEventListener("click", function(e){
    e.preventDefault();
    const nome = document.querySelector("#nome").value;
    const data = document.querySelector("#dataCargo").value;
    const CPF = document.querySelector("#CPF").value;
    const CEP = document.querySelector("#cep").value;
    vetAlunos.push(criaAluno(nome, data, CPF, CEP, vetTelefones, vetEmails));
    apresentaAlunos();

    const informacao = document.querySelector(".informacao");
    informacao.style.display = 'block';
});


function apresentaAlunos(){
    const table = document.querySelector("#table");
    table.innerHTML = "";
    for(n of vetAlunos){
        
        const linha = document.createElement("tr");

        const nome = document.createElement('td');
        nome.textContent = n.nome;
        linha.appendChild(nome);
        
        const data = document.createElement('td');
        data.textContent = n.data;
        linha.appendChild(data);

        const CPF = document.createElement('td');
        CPF.textContent = n.CPF;
        linha.appendChild(CPF);

        const CEP = document.createElement('td');
        CEP.textContent = n.CEP;
        linha.appendChild(CEP);

        const telefones = document.createElement('td');
        const telSelecet = document.createElement('select');
        telSelecet.className = 'form-control';
        for(i of n.telefones){
            const tel = document.createElement('option');
            tel.innerText = i;
            telSelecet.appendChild(tel);
        }
        telefones.appendChild(telSelecet);
        linha.appendChild(telefones);

        const emails = document.createElement('td');
        const emailSelecet = document.createElement('select');
        emailSelecet.className = 'form-control';
        for(i of n.emails){
            const email = document.createElement('option');
            email.innerText = i;
            emailSelecet.appendChild(email);
        }
        emails.appendChild(emailSelecet);
        linha.appendChild(emails);

        const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'Excluir';
  botaoExcluir.onclick = function(event) {
    // Remove a linha ao clicar no botão
    console.log(event);
    table.deleteRow(vetAlunos.indexOf(n));
    vetAlunos.splice(vetAlunos.indexOf(n), 1);
  };
  const botaoa = document.createElement('td');
  botaoa.appendChild(botaoExcluir);

  linha.appendChild(botaoa);
        table.appendChild(linha);
    }
}

document.addEventListener('keydown', function(event) {
    // Verifica se a tecla pressionada é 'S' e se a tecla 'Ctrl' (ou 'Command') também está pressionada
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault(); // Evita o comportamento padrão do navegador (salvar a página)
      let titulo = "Alunos Cadastrados";
      
      let conteudo_arquivo = JSON.stringify(vetAlunos,null, 2);  
      
	  let blob = new Blob([conteudo_arquivo], { type: "text/plain;charset=utf-8" });
	  saveAs(blob, titulo + ".json");
    }
});

