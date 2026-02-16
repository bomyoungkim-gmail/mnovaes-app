# 🛠 Especificação Técnica: High-End Tech Stack

## 1. Core Framework
- **Framework:** Next.js 15+ (App Router)
- **Linguagem:** TypeScript (Strict Mode)
- **Rendering:** Server-Side Rendering (SSR) para SEO em páginas de produto e Static Site Generation (SSG) para editoriais.

## 2. Styling & Design System
- **Engine:** Tailwind CSS
- **Componentes Base:** Radix UI (via Shadcn/UI customizado)
- **Variantes de UI:** CVA (Class Variance Authority) para alternar entre os temas Éthéré e L'Atelier.

## 3. Motion & Experience
- **Animações:** Framer Motion (Orquestração de entrada e Shared Element Transitions).
- **Scroll:** Lenis Scroll (Smooth scrolling nativo).
- **Imersão:** React Three Fiber (Three.js) para visualização 3D de joias.

## 4. Assets & Performance
- **Imagens/Vídeos:** Cloudinary (Transformações em tempo real e entrega de vídeos 4K otimizados).
- **Fontes:** Google Fonts ou Fontes Locais (Woff2) com `next/font`.

## 5. Mocking Data (Mockup Real)
- **API Simulation:** MSW (Mock Service Worker) para interceptar requisições e simular o backend futuro sem alterar o código de serviço.