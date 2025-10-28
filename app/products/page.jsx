"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import styles from "./page.module.css"

export default function ProductsDetails() {
    const [ products, setProducts ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ category, setCategory ] = useState("")

    useEffect(() => {
        async function loadProducts() {
            try{
                const allProductsUrl = "https://dummyjson.com/products?limit=0"
                const categorizedUrl = `https://dummyjson.com/products/category/${category}`
                const url = !category || category === "all" ? allProductsUrl : categorizedUrl
                const res = await fetch(url)
                if(!res.ok) throw new Error("Please try again later!!!")
                const data = await res.json()
                setProducts(data.products)
            }catch(err){
                alert(err)
                setProducts([])
            }
        }

        loadProducts()
    }, [category])

    useEffect(() => {
        async function getcategories() {
            const res = await fetch("https://dummyjson.com/products/categories")
            const data = await res.json()
            setCategories(data)
        }

        getcategories()
    }, [])

    



    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backButton}>
                ← Back to Home
            </Link>
            <h1 className={styles.heading}>Our Products</h1>
            <div className={styles.categoryBar}>
                <button onClick={() => setCategory("all")} className={styles.button}>All Products</button>
                { categories.map(cat => (
                    <button key={cat.slug} onClick={() => setCategory(cat.slug)} className={styles.button}>{cat.name}</button>
                ))}
            </div> 
            
            <div className={styles.grid}>
                {
                    products.length === 0 ? (<p className={styles.loading}>Loading...</p>) :
                    products.map(product => (
                        <Link key={product.id} href={`/products/${product.id}`} className={styles.card}>
                            <img src={product.thumbnail} alt={product.title} className={styles.image} />
                            <div>
                                <h2 className={styles.title}>{product.title}</h2>
                                <p className={styles.price}>${product.price}</p>
                                <p className={styles.category}>{product.category}</p>
                                <p className={styles.rating}>⭐ {product.rating}</p>
                            </div>
                        </Link>

                    ))
                }
            </div>
        </div>    
    )
}