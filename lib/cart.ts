import type { Product } from '@/types/product';

interface AddToCartInput {
  ean: string;
  quantity: number;
  unit?: 'piece';
}

interface AddToCartResponse {
  addProductsToCart: {
    id: {
      id: string;
    };
    totals: {
      itemsCount: number;
    };
    items: Array<{
      itemId: {
        id: string;
        type: string;
      };
      collectStore: {
        warning: {
          stock: string;
          type: string;
        };
      };
      ean: string;
    }>;
  };
}

const ADD_TO_CART_MUTATION = `
  mutation AddProductsToCart($input: AddProductsToCartInput!) {
    addProductsToCart(input: $input) {
      id {
        id
      }
      totals {
        itemsCount
      }
      items {
        itemId {
          id
          type
        }
        collectStore {
          warning {
            stock
            type
          }
        }
        ean
      }
    }
  }
`;

export const addToCart = async (
  product: Product,
  quantity: number = 1,
  unit: 'piece' = 'piece'
): Promise<AddToCartResponse> => {
  // Get the EAN from the product variants
  const ean = product.variants?.[0]?.ean || product.id;
  
  const variables = {
    input: {
      cart: {
        items: [
          {
            ean,
            quantity: {
              quantity,
            },
            unit,
          },
        ],
      },
    },
  };

  const response = await fetch('https://api.xxlsports.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ADD_TO_CART_MUTATION,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add product to cart');
  }

  const { data } = await response.json();
  return data;
};

// Helper function to add product to cart from product page
export const addProductToCart = async (productId: string, quantity: number = 1) => {
  try {
    // Fetch the product details first
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    
    const product = await response.json();
    return await addToCart(product, quantity);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};