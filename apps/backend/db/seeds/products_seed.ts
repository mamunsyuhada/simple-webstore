import { Knex } from "knex";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw('DELETE FROM products');

    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;

    const productData = products.map((product: any) => ({
        id: uuidv4(), // Generate a new UUID
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        created_at: new Date(),
        updated_at: new Date(),
    }));

    for (const product of productData) {
        await knex.raw(
            `
            INSERT INTO products (id, title, price, description, category, image, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                product.id,
                product.title,
                product.price,
                product.description,
                product.category,
                product.image,
                product.created_at,
                product.updated_at,
            ]
        );
    }
}