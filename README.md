# Sinara Front

Sistema Frontend de gestor para as aplicações do Sinara.

## Framework
O projeto foi desenvolvido com:

- React: Biblioteca JavaScript para construção de interfaces de usuário.
- Vite: Ferramenta de build ultrarrápida para desenvolvimento local e produção.
- JSX: Sintaxe do React que combina JavaScript e HTML.

## Como baixar e executar o projeto

**Passo 1** - Baixe o projeto:

No terminal da sua máquina, execute o seguinte comando:

```bash
git clone https://github.com/Sinara-project/sinara-front.git
```

**Passo 2** - Baixe as dependências do projeto:

No terminal e dentro do projeto, execute:

```bash
npm install
```

**Passo 3** - Rode o projeto:

Ainda no terminal, execute:
```bash
npm run dev
```

Com o comando executado, acesse o link http://localhost:5173/

## Estrutura de pastas

Na pasta `src`, está todo o conteúdo do projeto, e as principais pastas dele são:

- `/assets` - Todas as imagens fixas estão aqui
- `/components` - Todos os componentes react usados em outras telas estão aqui
- `/pages` - Todas as páginas do projeto estão aqui
- `/services` - Todos os serviços de acesso às APIs estão aqui

## Componentes

Na pasta `components` estão os seguintes componentes:

- `/data-dropdown` - Dropdown com informações selecionáveis
- `/loading` - Componente de carregamento
- `/notifications` - Componente deslizável de notificações
- `/permissions` - Componentes referentes às permissões, que possui os componentes:
  - `/add-worker` - Modal de adicionar operário em permissão
  - `/create-permission` - Modal de criar permissão
  - `/permissions-dropdown` - Dropdown com informações personalizado para permissões
- `/return-arrow` - Seta de retorno
- `/sheets-content` - Modal com conteúdo de planilhas (DESCARTADO)
- `/sidebar` - Barra lateral de navegação
- `/snackbar` - Snackbar de avisos

## Páginas

Na pasta `pages` estão as seguintes páginas:

### Autenticação (`/auth`)
- `/login` - Página de entrada no sistema
- `/login-confirm` - Confirmação de login com código
- `/logon` - Cadastro de usuário
- `/logon-insert-code` - Inserção de código de verificação de cadastro
- `/plan-choice` - Seleção de planos
- `/payment` - Processamento de pagamentos
- `/thanks` - Página de agradecimento
- `/restrict-password` - Criação de senha para a área restrita

### Fluxo Principal
- `/splash` - Tela de abertura
- `/home` - Página inicial do sistema
- `/dashboards` - Tela com dashboards
- `/sheets-list` - Lista de planilhas (DESCARTADO)
- `/create-form` - Criação de formulários
- `/points` - Gestão de pontos
- `/profile` - Perfil do usuário

### Área restrita (`/restricted-area`)
- `/enter` - Tela de login na área restrita
- `/menu` - Menu da área restrita
- `/workers` - Gestão de trabalhadores
- `/edit-worker` - Edição de dados do operário
- `/logon-worker` - Cadastro de operário
- `/permissions` - Gereciamento de permissões
- `/points` - Gestão de pontos, com:
  - `/point-menu` - Menu de pontos do dia selecionado
  - `/point-worker` - Menu de pontos do operário

### Configurações (`/edit`)
- `/editData` - Edição de dados (senhas)
- `/settings` - Configurações do sistema

## Serviços

Na pasta `services` estão organizados os seguintes serviços:

### Serviços Externos (`/external`)
- `/image` - Serviço de coleta de imagem por domínio (logo.clearbit.com)
- `/enterprise` - Serviço de busca de CNPJs do Brasil (open.cnpja.com)

### Serviços de acesso aos bancos de dados
- `/mongoDB` - Serviços de conexão e operações com MongoDB, contendo:
  - `/Forms` - Serviços para gestão de formulários
  - `/Notifications` - Serviços de notificações do sistema
  - `/Permissions` - Serviços para gestão de permissões e acessos

- `/sql` - Serviços de conexão e operações com banco SQL, contendo:
  - `/enterprise` - Serviços relacionados à empresa
  - `/credit-card` - Serviços para processamento de cartão de crédito
  - `/payment` - Serviços gerais de pagamento
  - `/workers` - Serviços para gestão de trabalhadores
  - `/points` - Serviços para controle de pontos e registros

## Serviços externos
Foram utilizados serviços externos para facilitar o acesso a dados como nome de empresas, imagens e domínios.

### Serviço logo.clearbit
O logo.clearbit é uma api que coleta a imagem de um site por seu domínio: https://logo.clearbit.com

### Serviço open.cnpja
O open.cnpja é uma API que acessa uma base de dados com várias empresas do Brasil, onde é usado um endpoint de procurar empresa por CNPJ: https://open.cnpja.com/office/{cnpj}

---

Desenvolvido pela equipe de Desenvolvimento de sistemas do Sinara.
