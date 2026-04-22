import React, { useState } from 'react';




function Cadastro() {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [mensagem, setMensagem] = useState('');

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:5000/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
			if (response.ok) {
				setMensagem('Cadastro realizado com sucesso!');
			} else {
				const data = await response.json();
				if (data && data.message) {
					setMensagem('Erro ao cadastrar usuário.');
				}
			}
		} catch (error) {
			setMensagem('Erro ao conectar ao servidor.');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-400 to-blue-500 relative overflow-hidden">
			{/* Elementos decorativos de fundo */}
			<div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 opacity-30 rounded-full blur-3xl animate-pulse" />
			<div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300 opacity-30 rounded-full blur-3xl animate-pulse" />
			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/90 rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center border border-white/40 backdrop-blur-md">
					<h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600 mb-2 drop-shadow-lg">Crie sua conta</h1>
					<p className="text-gray-500 mb-8 text-center">Preencha os dados para se cadastrar</p>
					<form onSubmit={handleSubmit} className="w-full space-y-5">
						<input
							type="text"
							name="name"
							placeholder="Nome"
							value={form.name}
							onChange={handleChange}
							required
							className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg shadow-sm"
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={form.email}
							onChange={handleChange}
							required
							className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-sm"
						/>
						<input
							type="password"
							name="password"
							placeholder="Senha"
							value={form.password}
							onChange={handleChange}
							required
							className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg shadow-sm"
						/>
						<button
							type="submit"
							className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-blue-600 text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-blue-600 hover:to-pink-500 transition-all duration-200"
						>
							Cadastrar
						</button>
					</form>
					{mensagem && (
						<p className={`mt-4 text-center font-semibold ${mensagem.startsWith('Cadastro') ? 'text-green-600' : 'text-red-600'}`}>{mensagem}</p>
					)}
					<div className="mt-6 text-center">
						<a href="/login" className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold shadow-md hover:from-pink-400 hover:to-blue-400 transition-all duration-200">Já tem conta? Faça login</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cadastro;
