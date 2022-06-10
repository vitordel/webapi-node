Construir uma Web API em NodeJS utilizando a biblioteca express.js.


OK:

A API deve conter 5 rotas detalhadas abaixo e um middleware de autenticação para
identificar um usuário através de um jwt. Os dados só devem ser retornados se as
credenciais fornecidas forem válidas (informar na resposta quais são as credenciais
utilizadas).

FALTA:

Opcional: Nas rotas de alteração de dados (POST, PUT e DELETE) criar um middleware
que identifique um nível de acesso admin (embutido na credencial), permitindo apenas
usuários com este nível, acesso a estas rotas