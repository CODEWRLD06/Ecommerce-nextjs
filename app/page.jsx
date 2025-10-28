
import Link from "next/link"
import styles from "./page.module.css"

export default function Home(){
    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.logo}>E.STORE</div>
            </nav>
            <section className={styles.banner}>
                <h1 className={styles.bannerHeader}>Discover Luxury</h1>
                <p className={styles.bannerText}>Experience premium products crafted for the extraordinary</p>
                <Link href="./products" className={styles.link}>Shop Now</Link>
            </section>

            <section className={styles.features}>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>✨</div>
                        <h3>Premium Quality</h3>
                        <p>Every product is carefully curated to meet the highest standards of excellence and craftmanship</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🚀</div>
                        <h3>Fast Shipping</h3>
                        <p>Get your orders delivered quickly and safely right to your doorstep with our express shipping</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>💎</div>
                        <h3>Exclusive Designs</h3>
                        <p>Unique products you won't find anywhere else, designed to make you stand out from the crowd</p>
                    </div>
                </div>    
            </section>
        </div>
    ) 
} 