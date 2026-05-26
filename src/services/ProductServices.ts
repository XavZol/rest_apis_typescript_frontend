import { safeParse, string, parse, pipe, transform, check } from "valibot";
import { DraftProductSchema, ProductsSchema, type Product, ProductSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success) {
            const url = `/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `/api/products`
        const {data} = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id : Product['id']) {
    try {
        const url = `/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updatedProduct(data : ProductData, id : Product['id']) {
    try {
        // En el nuevo Valibot, pipe toma el esquema inicial y luego las acciones secuenciales
        const NumberSchema = pipe(
            string(), 
            transform((val) => Number(val)),
            check((val) => !isNaN(val), "Debe ser un número válido")
        )

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        
        if(result.success) {
            const url = `/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id : Product['id']){
    try {
        const url = `/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updatedProductAvailability(id: Product['id']) {
    try {
        const url = `/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}