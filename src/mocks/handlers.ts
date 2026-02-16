import { http, HttpResponse } from "msw";

import { products } from "@/lib/data";

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json(products);
  }),
  http.get("/api/products/:id", ({ params }) => {
    const product = products.find((item) => item.id === params.id);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  })
];