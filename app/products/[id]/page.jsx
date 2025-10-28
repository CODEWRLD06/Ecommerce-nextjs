"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import styles from "./page.module.css"

export default function ProductDetails({ params }) {
    const id = params.id
    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`)
                if(!res.ok) throw new Error("Failed to fetch product data")
                const data = await res.json()
                setProduct(data)
            } catch (error) {
                alert(error)
            }
        }

        if(id) {
            fetchProduct()
        }
    }, [id])    
        
    if(!product) return <p className={styles.loading}>Loading...</p>

    const getStockStatus = () => {
        if(product.stock === 0) return { text: "Out of Stock", class: styles.outOfStock }
        if(product.stock < 10) return { text: `Only ${product.stock} left!`, class: styles.lowStock }
        return { text: "In Stock", class: styles.inStock }
    }

    const stockStatus = getStockStatus()

    return (
        <div className={styles.container}>
            <Link href="/products" className={styles.backButton}>
                ← Back to Products
            </Link>

            <div className={styles.productGrid}>
                <div className={styles.imageSection}>
                    <img 
                        src={product.images[selectedImage]} 
                        alt={product.title}
                        className={styles.mainImage}
                    />
                    <div className={styles.thumbnails}>
                        {product.images.map((img, index) => (
                            <img 
                                key={index}
                                src={img}
                                alt={`${product.title} ${index + 1}`}
                                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                                onClick={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.detailsSection}>
                    <p className={styles.brand}>{product.brand}</p>
                    <h1 className={styles.title}>{product.title}</h1>
                    
                    <div className={styles.ratingSection}>
                        <span className={styles.rating}>⭐ {product.rating}</span>
                        <span className={styles.reviewCount}>({product.reviews.length} reviews)</span>
                    </div>

                    <div className={styles.priceSection}>
                        <span className={styles.price}>${product.price}</span>
                        {product.discountPercentage > 0 && (
                            <span className={styles.discount}>-{product.discountPercentage}% OFF</span>
                        )}
                    </div>

                    <span className={`${styles.stockStatus} ${stockStatus.class}`}>
                        {stockStatus.text}
                    </span>

                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.tags}>
                        {product.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>{tag}</span>
                        ))}
                    </div>

                    <button className={styles.addToCartButton}>Add to Cart</button>
                </div>
            </div>

            <div className={styles.infoSection}>
                <h2>Product Details</h2>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>SKU</span>
                        <span className={styles.infoValue}>{product.sku}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Weight</span>
                        <span className={styles.infoValue}>{product.weight}g</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Dimensions</span>
                        <span className={styles.infoValue}>
                            {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                        </span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Warranty</span>
                        <span className={styles.infoValue}>{product.warrantyInformation}</span>
                    </div>
                </div>
            </div>

            <div className={styles.infoSection}>
                <h2>Shipping & Returns</h2>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Shipping Info</span>
                        <span className={styles.infoValue}>{product.shippingInformation}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Return Policy</span>
                        <span className={styles.infoValue}>{product.returnPolicy}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Availability</span>
                        <span className={styles.infoValue}>{product.availabilityStatus}</span>
                    </div>
                </div>
            </div>

            <div className={styles.infoSection}>
                <h2>Customer Reviews</h2>
                <div className={styles.reviewsGrid}>
                    {product.reviews.map((review, index) => (
                        <div key={index} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <span className={styles.reviewerName}>{review.reviewerName}</span>
                                <span className={styles.reviewRating}>⭐ {review.rating}</span>
                            </div>
                            <p className={styles.reviewComment}>{review.comment}</p>
                            <span className={styles.reviewDate}>
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}