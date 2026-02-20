/**
 * Tests del servicio API (fetchProducts con mock de fetch).
 */

import { fetchProducts, ApiError } from '../api';

const mockProductsResponse = {
  products: [
    {
      id: 1,
      title: 'Test',
      description: 'D',
      price: 10,
      discountPercentage: 0,
      rating: 4,
      stock: 5,
      brand: 'B',
      category: 'C',
      thumbnail: '',
      images: [],
    },
  ],
  total: 1,
  skip: 0,
  limit: 30,
};

describe('api', () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn() as typeof fetch;
  });

  describe('fetchProducts', () => {
    it('devuelve los productos cuando la respuesta es ok', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProductsResponse),
      });
      const result = await fetchProducts();
      expect(result).toEqual(mockProductsResponse);
      expect(result.products).toHaveLength(1);
      expect(result.products[0].title).toBe('Test');
    });

    it('lanza ApiError cuando la respuesta no es ok', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
        status: 404,
        text: () => Promise.resolve('Not found'),
      });
      try {
        await fetchProducts();
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect((e as ApiError).message).toContain('Error al obtener productos');
        expect((e as ApiError).statusCode).toBe(404);
      }
    });
  });
});
