# Credit Simulator API
Esta aplicação tem por objetivo realizar a simulação de créditos, com diferentes taxas de juros a depender da idade do solicitante.


## Instruções de setup
### Como rodar a aplicação:
Para rodar a aplicação localmente é necessário ter o Docker e o Docker Compose instalados na máquina, em seguida basta rodar os comandos abaixo na <b>raiz do projeto</b>:

- Para configurar as variáveis de ambiente necessárias deve-se copiar o conteúdo do arquivo "sample.env" para um arquivo ".env":
```
cp sample.env .env
```
- Para rodar a aplicação com o docker deve-se digitar o seguinte comando:
```
cd development && docker-compose up
```

## Como testar os endpoints de forma manual:
A aplicação conta com três rotas, a primeira para acessar a documentação no swagger, a segunda para criar a simulação, e a terceira para acessar as simulações criadas, podendo utilizar filtros. É necessário que a aplicação esteja rodando através do docker compose, onde poderá ser acessada pela porta 3000.

1 - Endpoint da rota do swagger /credit-simulation/v1/api-docs/:
<br> O swagger pode ser acessado através do navegador, pela rota http://localhost:3000/credit-simulation/v1/api-docs/. Recomendo que seja acessado para entender os contratos das aplicações, podendo ser utilizado também para fazer os testes das demais rotas.

2 - Endpoint da rota POST /credit-simulation/v1/simulate:
<br>Todos os campos do body são obrigatórios.

```
curl --request POST \
  --url http://localhost:3000/credit-simulation/v1/simulate \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.2.0' \
  --data '{
	"birthDate": "1990-10-01",
	"amount": 10000,
	"paymentTerm": 45
}'
```

3 - Endpoint da rota GET /credit-simulation/v1/simulate:
<br>Essa rota pode ser utilizada com e sem filtros. Caso queira utilizá-los é necessário passá-los como "query params". As opções de filtros são:
<ol>
<li><b>minAmount:</b> valor mínimo solicitado no empréstimo;</li>
<li><b>maxAmount:</b> valor máximo solicitado no empréstimo;</li>
<li><b>createdAfter:</b> data mínima de criação da simulação do empréstimo;</li>
<li><b>createdBefore:</b> data máxima de criação da simulação do empréstimo;</li>
<li><b>page:</b> página da listagem. Default: 1;</li>
<li><b>pageSize:</b> quantidade de itens por página. Default: 10</li>
</ol>

<br>Exemplo da requisição com todos os filtros:
```
curl --request GET \
  --url 'http://localhost:3000/credit-simulation/v1/simulate?page=2&pageSize=5&minAmount=5000&maxAmount=12000&createdAfter=2024-01-01&createdBefore=2024-10-01' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.2.0'
```

## Como rodar os testes automatizados:

Para rodar os testes unitários e de integração pode-se utilizar o comando abaixo (não precisa estar com a aplicação rodando):
```
npm run test
```

Para rodar os testes e2e é necessário rodar a aplicação [através do docker](#como-rodar-a-aplicação), depois pode-se utilizar o comando:
```
npm run test:e2e
```

Para rodar o teste de coverage pode-se utilizar o comando:
```
npm run test:coverage
```

Obs: No arquivo package.json é possível ver todos os scripts disponíveis.

## Como rodar os testes de desempenho:

Para realizar os testes de desempenho foi utilizada a biblioteca "autocannon". Para rodar e ver os resultados de latência, statusCode, deve-se rodar os comandos abaixo com a aplicação em execução:

- Rota de create
```
npm run stress:create
```

- Rota de get
```
npm run stress:get
```

Os scripts desses comandos estão configurados para ter 300 conexões simultâneas (usuários) em 10 segundos. A partir disso, é possível ver os resultados de latência máxima, média, por percentil, requisições por segundo, volume de bytes baixados e o número total de requisições nesse período. Para alterar o número de conexões é preciso mudar o valor da flag -c e para alterar o tempo de duração do teste é preciso mudar a flag -d nos scripts "stress:create" e "stress:get".

Os resultados são apresentados em tabelas no terminal.

## Estrutura do projeto e decisões de arquiteura:

O projeto foi construído utilizando Node.js e TypeScript. Este último foi escolhido por adicionar tipagem ao JavaScript, o que facilita o processo de desenvolvimento, tornando-o menos suscetível a erros que poderiam ocorrer devido à flexibilidade do JavaScript.

A arquitetura de software foi organizada em camadas, com divisões de domínio, aplicação, infraestrutura e casos de uso (services). Essa estrutura visa garantir uma clara separação de responsabilidades, resultando em um código mais organizado, com menor impacto em outras partes do sistema durante mudanças, além de proporcionar flexibilidade e facilitar a evolução contínua do projeto.

Para a persistência dos dados, foi utilizado o banco relacional MySQL em conjunto com o TypeORM, que facilita o mapeamento das entidades, a criação de tabelas e a inserção/recuperação de itens, utilizando o próprio TypeScript, sem a necessidade de escrever SQL manualmente.

Priorizando a padronização do código, foram utilizadas ferramentas como ESLint e Prettier para evitar problemas e garantir uma formatação consistente.

Para garantir o funcionamento correto da aplicação, foram realizados testes unitários, de integração e end-to-end, que auxiliam na identificação de se a aplicação funciona como o esperado e se continua a operar corretamente após modificações no código.

Para executar a aplicação e integrar o código com o banco de dados, foram utilizados o Docker e o Docker Compose. Simplificando o processo de configuração do ambiente e garantindo a consistência ao rodar em diferentes máquinas. 

A documentação foi feita por meio do Swagger, para facilitar o entendimento das rotas presentes na API, dos contratos utilizados, dos possíveis erros e os retornos das rotas. Além disso, também permite testes manuais na aplicação. 

Por fim, foi incluído um teste de desempenho que ajuda a entender como a API se comporta em termos de latência quando submetida a um determinado número de conexões simultâneas (usuários), quantas requisições é capaz de processar em um período de tempo e, a partir disso, identificar se a aplicação possui gargalos e problemas de desempenho.