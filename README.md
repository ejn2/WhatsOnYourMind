<h1>What's On Your Mind ?</h1>
<p>É uma api de posts, para o usuário escrever o que pensa e compartilhar.</p>

<h2>Rotas</h2>

<table border="1">
    <th>Endpoint</th><th>Método</th><th>Ação</th>
    <tr>
        <td>/register</td><td>POST</td><td>Cadastra um novo usuário.</td>
    </tr>
    <tr>
        <td>/login</td><td>POST</td><td>Entra com o usuário.</td>
    </tr>
    <tr>
        <td>/profile</td><td>GET</td><td>Retorna os dados do usuário logado.</td>
    </tr>
    <tr>
        <td>/profile/change</td><td>PUT</td><td>Atualiza dados do usuário logado (Exceto a senha).</td>
    </tr>
    <tr>
        <td>/profile</td><td>DELETE</td><td>Exclui o registro do usuário logado (Seu token de autenticação, logo não será mais válido).</td>
    </tr>
    <tr>
        <td>/user/list</td><td>GET</td><td>Lista todos os usuário (É necessário estar logado).
</td>
    </tr>
    <tr>
        <td>/user/&ltid&gt</td><td>GET</td><td>Encontra o usuário com o id informado. (É necessário estar logado).</td>
    </tr>
    <tr>
        <td>/profile/post</td><td>POST</td><td>Cria um novo post (É necessário estar logado).</td>
    </tr>
    <tr>
        <td>/profile/post/&ltid&gt</td><td>PUT</td><td>Atualiza o post (É necessário estar logado).</td>
    </tr>
    <tr>
        <td>/profile/post/&ltid&gt</td><td>DELETE</td><td>Exclui um post específico.(É necessário estar logado).
        </td>
    </tr>
</table>

<h2>Query</h2>

<p>Você também pode usar a query "limit", para delimitar o número de dados retornado (Nessa primeira versão, só está disponível no endpoint "/user/list".)
</p>

<h3>Exemplo.</h3>
<p>http://localhost:3000/user/list?limit=10

<p>Você também pode usar a query "page" juntamente com a query "limit", para separar os dados em 'páginas' diferentes.
</p>

<h3>Exemplo.</h3>

<p>http://localhost:3000/user/list?limit=10&page=1<p>

<p>O exemplo acima mostra como você pode usar duas queries(query) simultâneas usando o símbolo "&" para separá-las.</p>

<h4>Ordernando.</h4>

<p>Para ordenar o retorno dos dados, você pode usar a query "order", tendo como valor padrão "asc" (ascendentes. Isto é, ordem crescente).
</p>

<h3>Exemplo.</h3>
<p>http://localhost:3000/user/list?limit=10&page=1&order=desc<p>

<p>Notem que acima foi passado como valor "desc" (descendente. Isto é, decrescente), pois o valor "asc", já tem como padrão.
</p>