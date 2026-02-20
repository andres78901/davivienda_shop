/**
 * Servicio de API para obtener productos desde DummyJSON.
 */

import type { ProductsApiResponse } from '../types/product';

const BASE_URL = 'https://dummyjson.com';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Obtiene la lista de productos desde la API.
 */
export async function fetchProducts(): Promise<ProductsApiResponse> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new ApiError(
      `Error al obtener productos: ${response.statusText}`,
      response.status,
      await response.text()
    );
  }

  const data = (await response.json()) as ProductsApiResponse;
  return data;
}
