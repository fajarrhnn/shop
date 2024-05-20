interface Products {
    id: number,
    title: string,
    description: string,
    image: string,
    price: number,
    category: string,
    rating: {
        rate: string,
        count: number
    }
}
export type { Products as ProductsTypes }