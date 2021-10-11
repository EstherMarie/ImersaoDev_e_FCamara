let botaoAgendamento = document.querySelector("#botao-agendamento");
let modal = new bootstrap.Modal(document.getElementById("modal-agendamento"), {
  keyboard: false,
  backdrop: "static",
});

function confirmarAgendamento() {
  // armazenando os dados inseridos em uma estrutura de dados
  const dadosInseridos = {
    nome: document.querySelector("#nome").value,
    email: document.querySelector("#email").value,
    data: document.querySelector("#data").value,
    escritorio:
      document.querySelector("#escritorio-sao-paulo").checked == true
        ? "São Paulo"
        : "Santos",
    estacao: document.querySelector("#estacao").value,
  };

  validacao(dadosInseridos);
}

function validacao(dados) {
  let usuarioAutenticado = false;
  let dadosPreenchidos = false;

  // Usuários cadastrados
  const usuarios = [
    { nome: "Jasmim", email: "jasmim@email.com" },
    { nome: "João", email: "joao@email.com" },
  ];

  // verificando se o usuário está na lista de cadastrados
  usuarios.forEach((user) => {
    if (dados.nome == user.nome && dados.email == user.email) {
      usuarioAutenticado = true;
    }
  });

  // Verificando se os campos foram preenchidos
  for (let key in dados) {
    if (dados[key] == "") {
      dadosPreenchidos = false;
      break;
    } else {
      dadosPreenchidos = true;
    }
  }

  if (usuarioAutenticado && dadosPreenchidos) {
    modal.show();
    document.querySelector(".alert").classList.add("d-none");
    agendamentoConcluido(dados);
  } else {
    document.querySelector(".alert").classList.remove("d-none");
    modal.hide();
  }
}

function agendamentoConcluido(dados) {
  let h4 = document.createElement("h4");
  h4.textContent = `Olá, ${dados.nome}!`;

  let p = document.createElement("p");
  p.textContent = `Você está agendado(a) para o dia ${
    document.querySelector("#data").valueAsDate.getDate() + 1
  } / ${
    document.querySelector("#data").valueAsDate.getMonth() + 1
  } , no escritório em ${
    dados.escritorio
  } e a sua estação de trabalho é a número ${
    dados.estacao
  }. O comprovante de agendamento foi enviado para o seu email.`;

  let modalContent = document.querySelector(".modal-body");
  modalContent.appendChild(h4);
  modalContent.append(p);

  // desabilitando o botão submit
  botaoAgendamento.disabled = true;

  // desabilitando os campos input
  document.querySelector("select").value = "";
  let listaInput = document.querySelectorAll("input");

  for (let i = 0; i < listaInput.length; i++) {
    listaInput[i].value = "";
    listaInput[i].disabled = true;
    listaInput[i].checked = false;
  }
}

botaoAgendamento.addEventListener("click", (event) => {
  confirmarAgendamento();
  event.preventDefault();
});
