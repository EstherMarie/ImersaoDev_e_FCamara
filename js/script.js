function confirmarAgendamento() {
	const nome = document.querySelector('#nome').value;
	const email = document.querySelector('#email').value;
	const data = document.querySelector('#data').value;
	const escritorio =
		document.querySelector('#escritorio-sao-paulo').checked == true
			? 'São Paulo'
			: 'Santos';
	const estacao = document.querySelector('#estacao').value;

	const dados = { nome, email, data, escritorio, estacao };

	document.querySelector('#botao-agendamento').disabled = true;

	agendamentoConcluido(dados);
}

function agendamentoConcluido(dados) {
	let h4 = document.createElement('h4');
	h4.textContent = `Olá, ${dados.nome}!`;

	let p = document.createElement('p');
	p.textContent = `Você está agendado(a) para o dia ${dados.data}, no escritório em ${dados.escritorio} e a sua estação de trabalho é a número ${dados.estacao}. O comprovante de agendamento foi enviado para o seu email.`;

	let modalContent = document.querySelector('.modal-body');
	modalContent.appendChild(h4);
	modalContent.append(p);
}
