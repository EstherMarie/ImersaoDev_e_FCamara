let usuarioAutenticado = false;
let dadosPreenchidos = false;
let botaoAgendamento = document.querySelector('#botao-agendamento');
let modal = new bootstrap.Modal(document.getElementById('modal-agendamento'), {
	keyboard: false,
	backdrop: 'static',
});

function confirmarAgendamento() {
	const nome = document.querySelector('#nome').value;
	const email = document.querySelector('#email').value;
	const data = document.querySelector('#data').value;
	const escritorio = document.querySelector('#escritorio-sao-paulo').checked == true ? 'São Paulo' : 'Santos';
	const estacao = document.querySelector('#estacao').value;

	const dados = { nome, email, data, escritorio, estacao };

	validacao(dados);
}

function validacao(dados) {
	// Usuários cadastrados
	const usuarios = [
		{ nome: 'Jasmim', email: 'jasmim@email.com' },
		{ nome: 'João', email: 'joao@email.com' },
	];

	// verificando se o usuário está na lista de cadastrados
	usuarios.forEach((user) => {
		if (dados.nome == user.nome && dados.email == user.email) {
			usuarioAutenticado = true;
		}
	});

	// Verificando se os campos foram preenchidos
	for (let key in dados) {
		if (dados[key] == '') {
			dadosPreenchidos = false;
			break;
		} else {
			dadosPreenchidos = true;
		}
	}

	if (usuarioAutenticado && dadosPreenchidos) {
		console.log('autenticado');
		modal.show();
		document.querySelector('.alert').classList.add('d-none');
		agendamentoConcluido(dados);
	} else {
		console.log('invalido');
		document.querySelector('.alert').classList.remove('d-none');

		// hide modal
		modal.hide();
	}
}

function agendamentoConcluido(dados) {
	let h4 = document.createElement('h4');
	h4.textContent = `Olá, ${dados.nome}!`;

	let p = document.createElement('p');
	p.textContent = `Você está agendado(a) para o dia ${dados.data}, no escritório em ${dados.escritorio} e a sua estação de trabalho é a número ${dados.estacao}. O comprovante de agendamento foi enviado para o seu email.`;

	let modalContent = document.querySelector('.modal-body');
	modalContent.appendChild(h4);
	modalContent.append(p);

	document.querySelector('#botao-agendamento').disabled = true;
}

botaoAgendamento.addEventListener('click', (event) => {
	confirmarAgendamento();
	event.preventDefault();
});
