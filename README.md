# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Hospedagem estática (Hostinger / Apache)

Requer Node.js 22.13.0 ou superior **apenas no computador que gera os arquivos**.

```sh
npm install
npm run build:static
```

Envie todo o conteúdo de `dist/static/` para a raiz pública da hospedagem
(por exemplo, `public_html/`), incluindo `index.html`, `assets/` e as imagens.
O HTML inicial contém o conteúdo completo pré-renderizado e os metadados SEO.
Não envie `.tanstack/static-server/`: são arquivos temporários usados somente
durante a geração, não necessários na hospedagem. Não é preciso Node,
Cloudflare Worker, variáveis de ambiente nem regras de reescrita no Apache.

`npm run build` e a publicação na Lovable continuam usando a configuração original.
