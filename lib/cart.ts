'use client'

export interface CartItem {
  productId: string
  name: string
  price: number
  discountPrice?: number
  image?: string
  quantity: number
  lensType?: string
  coatings?: string[]
}

export class CartManager {
  private static STORAGE_KEY = 'eyewear-cart'

  static getCart(): CartItem[] {
    if (typeof window === 'undefined') return []
    const cart = localStorage.getItem(this.STORAGE_KEY)
    return cart ? JSON.parse(cart) : []
  }

  static addItem(item: CartItem): void {
    const cart = this.getCart()
    const existingIndex = cart.findIndex((i) => i.productId === item.productId)

    if (existingIndex > -1) {
      cart[existingIndex].quantity += item.quantity
    } else {
      cart.push(item)
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart))
  }

  static updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCart()
    const item = cart.find((i) => i.productId === productId)

    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart))
      }
    }
  }

  static removeItem(productId: string): void {
    const cart = this.getCart().filter((i) => i.productId !== productId)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart))
  }

  static clearCart(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }

  static getTotal(): number {
    return this.getCart().reduce((total, item) => {
      const price = item.discountPrice || item.price
      return total + price * item.quantity
    }, 0)
  }

  static getItemCount(): number {
    return this.getCart().reduce((count, item) => count + item.quantity, 0)
  }
}



