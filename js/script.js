let usuarioAutenticado = false;
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

	// Validação
	const usuarios = [
		{ nome: 'Jasmim', email: 'jasmim@email.com' },
		{ nome: 'João', email: 'joao@email.com' },
	];

	usuarios.forEach((user) => {
		if (nome == user.nome && email == user.email) {
			usuarioAutenticado = true;
		}
	});

	if (usuarioAutenticado) {
		console.log('autenticado');
		modal.show();
		agendamentoConcluido(dados);
		document.querySelector('.alert').classList.toggle('d-none');
	} else {
		console.log('invalido');
		document.querySelector('.alert').classList.toggle('d-none');

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
