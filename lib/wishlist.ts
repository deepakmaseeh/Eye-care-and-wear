'use client'

export interface WishlistItem {
  productId: string
  name: string
  price: number
  discountPrice?: number
  image?: string
  addedAt: string
}

export class WishlistManager {
  private static STORAGE_KEY = 'eyewear-wishlist'

  static getWishlist(): WishlistItem[] {
    if (typeof window === 'undefined') return []
    const wishlist = localStorage.getItem(this.STORAGE_KEY)
    return wishlist ? JSON.parse(wishlist) : []
  }

  static addItem(item: Omit<WishlistItem, 'addedAt'>): void {
    const wishlist = this.getWishlist()
    
    // Check if already in wishlist
    if (wishlist.some((i) => i.productId === item.productId)) {
      return
    }

    wishlist.push({
      ...item,
      addedAt: new Date().toISOString(),
    })

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wishlist))
  }

  static removeItem(productId: string): void {
    const wishlist = this.getWishlist().filter((i) => i.productId !== productId)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wishlist))
  }

  static isInWishlist(productId: string): boolean {
    return this.getWishlist().some((i) => i.productId === productId)
  }

  static getItemCount(): number {
    return this.getWishlist().length
  }
}



