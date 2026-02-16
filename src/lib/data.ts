export type Product = {
  id: string;
  name: string;
  price: number;
  category: "vestuario" | "joias";
  description: string;
  sizes: string[];
  theme: "latelier" | "ethere";
  images: {
    primary: string;
    hover: string;
    gallery: string[];
  };
};

export const products: Product[] = [
  {
    id: "anel-solitario-luna",
    name: "Anel Solitario Luna",
    price: 85000,
    category: "joias",
    description:
      "Anel solitario em ouro branco com diamante central lapidado para brilho de alto contraste.",
    sizes: ["12", "14", "16", "18"],
    theme: "ethere",
    images: {
      primary: "/images/realistic/anel-solitario-luna-primary.jpg",
      hover: "/images/realistic/anel-solitario-luna-hover.jpg",
      gallery: [
        "/images/realistic/anel-solitario-luna-primary.jpg",
        "/images/realistic/anel-solitario-luna-gallery1.jpg",
        "/images/realistic/anel-solitario-luna-gallery2.jpg",
      ],
    },
  },
  {
    id: "designer-coat",
    name: "Designer Coat",
    price: 92000,
    category: "vestuario",
    description:
      "Sobretudo de alfaiataria premium em la fria com corte editorial e acabamento minimalista.",
    sizes: ["P", "M", "G", "GG"],
    theme: "latelier",
    images: {
      primary: "/images/realistic/designer-coat-primary.jpg",
      hover: "/images/realistic/designer-coat-hover.jpg",
      gallery: [
        "/images/realistic/designer-coat-primary.jpg",
        "/images/realistic/designer-coat-gallery1.jpg",
        "/images/realistic/designer-coat-gallery2.jpg",
      ],
    },
  },
  {
    id: "colar-solitario-luz",
    name: "Colar Solitario Luz",
    price: 45000,
    category: "joias",
    description:
      "Colar de corrente fina com pedra central para composicao noturna da linha Ethere.",
    sizes: ["Unico"],
    theme: "ethere",
    images: {
      primary: "/images/realistic/colar-solitario-luz-primary.jpg",
      hover: "/images/realistic/colar-solitario-luz-hover.jpg",
      gallery: [
        "/images/realistic/colar-solitario-luz-primary.jpg",
        "/images/realistic/colar-solitario-luz-gallery1.jpg",
        "/images/realistic/colar-solitario-luz-gallery2.jpg",
      ],
    },
  },
  {
    id: "silk-blouse",
    name: "Silk Blouse",
    price: 92000,
    category: "vestuario",
    description:
      "Blusa de seda com caimento leve e textura tactil para styling de colecao.",
    sizes: ["P", "M", "G"],
    theme: "latelier",
    images: {
      primary: "/images/realistic/silk-blouse-primary.jpg",
      hover: "/images/realistic/silk-blouse-hover.jpg",
      gallery: [
        "/images/realistic/silk-blouse-primary.jpg",
        "/images/realistic/silk-blouse-gallery1.jpg",
        "/images/realistic/silk-blouse-gallery2.jpg",
      ],
    },
  },
];

export const mockProducts: Product[] = [
  {
    id: "colar-aurora",
    name: "Colar Aurora",
    price: 120000,
    category: "joias",
    description:
      "Colar delicado em ouro rosé com pingente de safira azul e diamantes cravejados.",
    sizes: ["Único"],
    theme: "ethere",
    images: {
      primary: "/images/realistic/colar-aurora-primary.jpg",
      hover: "/images/realistic/colar-aurora-hover.jpg",
      gallery: [
        "/images/realistic/colar-aurora-primary.jpg",
        "/images/realistic/colar-aurora-gallery1.jpg",
        "/images/realistic/colar-aurora-gallery2.jpg",
      ],
    },
  },
  {
    id: "jaqueta-urban",
    name: "Jaqueta Urban",
    price: 45000,
    category: "vestuario",
    description:
      "Jaqueta casual em couro ecológico com design moderno e detalhes metálicos.",
    sizes: ["P", "M", "G", "GG"],
    theme: "latelier",
    images: {
      primary: "/images/realistic/jaqueta-urban-primary.jpg",
      hover: "/images/realistic/jaqueta-urban-hover.jpg",
      gallery: [
        "/images/realistic/jaqueta-urban-primary.jpg",
        "/images/realistic/jaqueta-urban-gallery1.jpg",
        "/images/realistic/jaqueta-urban-gallery2.jpg",
      ],
    },
  },
];

export const initialCartItems: Array<{ productId: string; quantity: number }> =
  [
    { productId: "anel-solitario-luna", quantity: 1 },
    { productId: "designer-coat", quantity: 1 },
  ];

export function getProductById(productId: string) {
  return products.find((item) => item.id === productId) ?? null;
}

export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
