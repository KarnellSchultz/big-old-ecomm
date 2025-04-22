export interface CartItem {
  id: string;
  productId: string;
  customerId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

class CartDatabase {
  private dbName = 'CartDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async connect(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create cart items store
        if (!db.objectStoreNames.contains('cartItems')) {
          const store = db.createObjectStore('cartItems', { keyPath: 'id' });
          store.createIndex('customerId', 'customerId', { unique: false });
          store.createIndex('productId', 'productId', { unique: false });
        }

        // Create customers store
        if (!db.objectStoreNames.contains('customers')) {
          const store = db.createObjectStore('customers', { keyPath: 'id' });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };
    });
  }

  async addToCart(item: CartItem): Promise<CartItem> {
    const db = await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('cartItems', 'readwrite');
      const store = transaction.objectStore('cartItems');
      const request = store.put(item);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(item);
    });
  }

  async getCartItems(customerId: string): Promise<CartItem[]> {
    const db = await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('cartItems', 'readonly');
      const store = transaction.objectStore('cartItems');
      const index = store.index('customerId');
      const request = index.getAll(customerId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async updateCartItem(item: CartItem): Promise<CartItem> {
    const db = await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('cartItems', 'readwrite');
      const store = transaction.objectStore('cartItems');
      const request = store.put(item);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(item);
    });
  }

  async removeFromCart(itemId: string): Promise<void> {
    const db = await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('cartItems', 'readwrite');
      const store = transaction.objectStore('cartItems');
      const request = store.delete(itemId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clearCart(customerId: string): Promise<void> {
    const items = await this.getCartItems(customerId);
    const db = await this.connect();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('cartItems', 'readwrite');
      const store = transaction.objectStore('cartItems');
      
      let completed = 0;
      let errors = 0;

      items.forEach(item => {
        const request = store.delete(item.id);
        request.onsuccess = () => {
          completed++;
          if (completed + errors === items.length) {
            resolve();
          }
        };
        request.onerror = () => {
          errors++;
          if (completed + errors === items.length) {
            reject(new Error('Failed to clear some items from cart'));
          }
        };
      });
    });
  }
}

export const cartDB = new CartDatabase();