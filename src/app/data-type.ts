export interface SignUp {
    name: string,
    password: string,
    email: string
}
export interface LogIn {
    email: string,
    password: string
}
export interface Product {
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    id: number,
    quantity: undefined | number
    productId: undefined | number
}
export interface CartData {
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    id: number | undefined,
    quantity: undefined | number,
    productId: number,
    userId: number
}
export interface PriceSummery {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}
export interface order {
    email: string,
    address: string,
    contact: string,
    totalPrice: number,
    userId: string,
    id: number | undefined

}