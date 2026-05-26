import { boolean, number, object, string, type InferOutput, array } from "valibot";


export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(), 
    price: number(),
    availability: boolean()
})
export const ProductsSchema = array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>

export type Pagination = {
    total: number
    page: number
    limit: number
    totalPages: number
}

export type PaginatedProducts = {
    products: Product[]
    pagination: Pagination
}