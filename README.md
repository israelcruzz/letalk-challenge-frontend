# Frontend da Simulação de Empréstimos Letalk

<img src="https://github.com/israelcruzz/letalk-challenge-frontend/blob/main/public/thumbs/capa.png?raw=true" height="100%" />

Este repositório contém a implementação frontend do Desafio de Simulação de Empréstimos da Letalk. A aplicação permite que os usuários simulem e solicitem empréstimos pessoais com base em regras de negócios específicas e exiba os resultados.

# Deploy

Foi feito o deploy do frontend utilizando a Vercel. Link Abaixo:
<a href="https://loanapp-gules.vercel.app/">Aqui</a>

# Tempo para Criar

2 horas as funcionalidades básicas, 3 horas as features.

## Sumário
- [Introdução](#introdução)
- [Recursos](#recursos)
- [Telas](#telas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Introdução
A aplicação de Simulação de Empréstimos da Letalk foi projetada para ajudar os usuários a simular as condições de um empréstimo ao inserir seus detalhes pessoais e parâmetros desejados para o empréstimo. A aplicação segue regras de negócios específicas, incluindo valores mínimos para empréstimos e taxas de juros baseadas no estado de residência do usuário.

## Recursos
- **Autenticação de Usuário**: Funcionalidade de login e registro para usuários.
- **Simulação de Empréstimo**: Usuários podem inserir seus detalhes e parâmetros desejados para simular as condições do empréstimo.
- **Solicitação de Empréstimo**: Usuários podem solicitar um empréstimo após a simulação.
- **Integração com Banco de Dados**: Salvar detalhes da solicitação de empréstimo em um banco de dados ou arquivo JSON.
- **Integração com API**: Um endpoint para recuperar solicitações de empréstimo finalizadas.
- **Notificação de Sucesso**: Exibir uma mensagem de sucesso após a conclusão da solicitação de empréstimo.
- **Download dos Detalhes da Simulação**: Opção para baixar os detalhes da simulação em formato Excel.

## Telas
### Login
Os usuários podem fazer login para acessar os recursos de simulação de empréstimos.
![Tela de Login](https://github.com/israelcruzz/letalk-challenge-frontend/blob/main/public/thumbs/login.png?raw=true)

### Registro
Novos usuários podem se registrar para criar uma conta.
![Tela de Registro](https://github.com/israelcruzz/letalk-challenge-frontend/blob/main/public/thumbs/register.png?raw=true)

### Início
A tela inicial fornece uma visão geral e opções de navegação.
![Tela Inicial](https://github.com/israelcruzz/letalk-challenge-frontend/blob/main/public/thumbs/home.png?raw=true)

### Simulação de Empréstimo
Os usuários podem inserir seus detalhes para simular um empréstimo:
- CPF
- Estado (UF)
- Data de Nascimento
- Valor do Empréstimo Desejado
- Valor da Parcela Mensal Desejada

Exemplo: João, de MG, nascido em 10/10/1986, quer um empréstimo de R$ 60.000,00 e pretende pagar R$ 15.000,00 por mês.
![Tela de Simulação 1](https://github.com/israelcruzz/letalk-challenge-frontend/blob/main/public/thumbs/simulate1.png?raw=true)

![Tela de Simulação 2](https://github.com/israelcruzz/letalk-challenge-frontend/blob/main/public/thumbs/simulate2.png?raw=true)

### Detalhes do Empréstimo
Visualize os resultados da simulação e finalize a solicitação do empréstimo. Os usuários também podem baixar os detalhes da simulação em formato Excel.
![Tela de Detalhes](https://github.com/israelcruzz/letalk-challenge-frontend/blob/main/public/thumbs/details1.png?raw=true)

![Tela de Detalhes 2](https://github.com/israelcruzz/letalk-challenge-frontend/blob/main/public/thumbs/details2.png?raw=true)

### Sucesso
Uma mensagem de sucesso é exibida após a conclusão bem-sucedida da solicitação do empréstimo.
![Tela de Sucesso](https://github.com/israelcruzz/letalk-challenge-frontend/blob/main/public/thumbs/success.png?raw=true)

### Vídeo de Demonstração
Aqui está um vídeo demonstrando o funcionamento da aplicação:
![Vídeo de Demonstração]
<a href="https://drive.google.com/file/d/1mXbSeQxdlDiN4umB9YNrbryfvCtait96/view?usp=sharing">Assistir</a>

## Instalação
Para rodar a aplicação localmente, siga estes passos:

1. Clone o repositório:
   ```bash
   git clone https://github.com/israelcruzz/letalk-challenge-frontend.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd letalk-challenge-frontend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie a aplicação:
   ```bash
   npm start
   ```

## Uso
- Abra a aplicação no seu navegador em `http://localhost:3000`.
- Registre-se ou faça login na sua conta.
- Navegue até a tela de simulação de empréstimos e insira seus detalhes.
- Visualize os resultados da simulação e finalize a solicitação do empréstimo.
- Baixe os detalhes da simulação, se necessário.

## Contribuição
Contribuições são bem-vindas! Por favor, faça um fork do repositório e envie um pull request para melhorias ou correções de bugs.

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
