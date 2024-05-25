interface Products {
    id: string,
    title: string,
    description: string,
    image: string,
    category: string,
    slug: string,
    price: number,
    rating: number,
    stock: number
}
export type { Products as ProductsTypes }

interface Users {
    id: string,
    firstName: string,
    lastName: string,
    email?: string,
    password?: string
}

export type { Users as UsersTypes }

interface Carts {
    id: string,
    title: string,
    image: string,
    price: number,
    quantity: number
}

export type { Carts as CartsTypes }