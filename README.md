# ClixData Dados & BI — Site

Site institucional moderno e interativo da **ClixData Dados & BI**, empresa especializada em:

- **Dashboards de BI / Business Intelligence** (serviço de destaque)
- Administração de Banco de Dados
- ETL / ELT
- Administração de Infraestrutura de Dados

Tecnologias centrais: **SQL** e **Python**.

## Tech stack

Site estático em **HTML + CSS + JavaScript puro** (sem build, sem dependências). Paleta de cores inspirada no Facebook (`#1877F2`) e LinkedIn (`#0A66C2`).

## Estrutura

```
index.html              # Página única (hero, serviços, sobre, contato)
assets/
  css/styles.css        # Design system + layout responsivo
  js/main.js            # Navegação mobile, animações, validação do formulário
  img/                  # Imagens (logo usa wordmark SVG inline)
openspec/               # Especificação do projeto (OpenSpec)
```

## Executar localmente

Basta abrir `index.html` no navegador, ou servir localmente:

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

## Configurar o formulário de contato

O formulário usa **progressive enhancement**:

1. Defina o endpoint do serviço de formulário no atributo `action` do `<form id="contactForm">` em `index.html` (ex.: [Formspree](https://formspree.io)).
2. Enquanto o `action` contiver `your-form-id`, o formulário usa um **fallback `mailto:`** para o endereço configurado em `CONTACT_EMAIL` (`assets/js/main.js`).
3. Há um campo honeypot anti-spam e validação client-side (campos obrigatórios + formato de e-mail).

## Deploy

Por ser estático, pode ser hospedado em:

- **GitHub Pages** — Settings -> Pages -> branch `main` (raiz)
- **Netlify** / **Vercel** — conectar o repositório (sem configuração de build)

## Personalizar

- Cores/tokens: `:root` em `assets/css/styles.css`
- Contato real: e-mail, WhatsApp e LinkedIn na seção `#contato` de `index.html`
- Logo: atualmente um wordmark SVG inline (substituível por um logo em `assets/img/`)
