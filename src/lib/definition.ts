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

interface Users {
    id: string,
    firstName: string,
    lastName: string,
    email?: string,
    password?: string,
}

interface Carts {
    id: string,
    title: string,
    image: string,
    price: number,
    quantity: number
}

interface Address {
    id?: string,
    user_id?: string,
    state: string,
    city: string,
    district: string,
    subDistrict: string,
    neighborhood: string,
    street: string,
    zipCode: string,
}

export type { Products as ProductsTypes }
export type { Users as UsersTypes }
export type { Carts as CartsTypes }
export type { Address as AddressTypes }