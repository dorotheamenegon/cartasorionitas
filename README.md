# Biblioteca Dom Orione — PWA v19

Este pacote transforma a Biblioteca em um Progressive Web App (PWA).

## Incluído
- `index.html`: Biblioteca completa.
- `manifest.webmanifest`: identidade e configuração instalável.
- `sw.js`: cache do aplicativo e fallback offline.
- `icons/`: ícones PNG e SVG para Android, iOS e navegadores.
- `offline.html`: mensagem de segurança se a página ainda não tiver sido armazenada.

## Publicação
O PWA precisa ser servido por HTTPS. Para GitHub Pages, publique o conteúdo desta pasta na raiz de um repositório e habilite Pages em **Settings > Pages > Deploy from a branch**, selecionando a branch principal e a pasta `/ (root)`.

Depois de publicado, abra a URL HTTPS uma vez com internet. O navegador instalará o service worker e armazenará a página e os ícones. Ao tocar em **Instalar app**, a Biblioteca abre diretamente a confirmação nativa quando o navegador disponibiliza `beforeinstallprompt`; se não disponibilizar, mostra instruções específicas; no Safari do iPhone/iPad, use Compartilhar > Adicionar à Tela de Início.

## Offline
O conteúdo principal das cartas está embutido no HTML e fica disponível offline depois do primeiro carregamento. Links externos, fontes online e documentos que não estejam neste pacote podem continuar exigindo internet.

## Atualizações
Quando uma nova versão for publicada, o service worker substitui o cache antigo ao ser atualizado. O cache atual é `dom-orione-pwa-v19`.
