import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

function Home() {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const menuRef = useRef(null);
    const contactRef = useRef(null);

    const [cart, setCart] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);

    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        gsap.fromTo(
            homeRef.current,
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
        );
    }, []);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
        setMobileNav(false);
    };

    const menu = [
        { name: "Espresso", price: 180, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
        { name: "Latte", price: 220, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735" },
        { name: "Cappuccino", price: 200, img: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6" },
        { name: "Mocha", price: 250, img: "https://images.unsplash.com/photo-1511920170033-f8396924c348" }
    ];

    const addToCart = (item) => setCart([...cart, item]);

    const styles = {
        container: {
            fontFamily: "Poppins, sans-serif",
            background: "#0b0505",
            color: "#fff",
            overflowX: "hidden",
        },

        /* NAVBAR */
        navbar: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(14px)",
            zIndex: 1000,
        },

        logo: {
            color: "#ff3b3b",
            fontWeight: "bold",
            fontSize: "18px",
        },

        navGroup: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
        },

        btn: {
            background: "transparent",
            border: "1px solid rgba(255,59,59,0.5)",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
        },

        hamburger: {
            display: "none",
            background: "#ff3b3b",
            border: "none",
            padding: "6px 10px",
            borderRadius: "6px",
            color: "#fff",
        },

        /* HERO */
        hero: {
            height: "100vh",
            backgroundImage:
                "url('https://images.unsplash.com/photo-1442512595331-e89e73853f31')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            textAlign: "center",
            padding: "20px",
        },

        overlay: {
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
        },

        title: {
            fontSize: "clamp(32px, 6vw, 60px)",
            color: "#ff3b3b",
        },

        subtitle: {
            marginTop: "10px",
            color: "#ddd",
        },

        section: {
            padding: "100px 16px",
            maxWidth: "1100px",
            margin: "auto",
            textAlign: "center",
        },

        /* GRID */
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            marginTop: "20px",
        },

        card: {
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,59,59,0.2)",
            borderRadius: "12px",
            overflow: "hidden",
        },

        img: {
            width: "100%",
            height: "130px",
            objectFit: "cover",
        },

        content: {
            padding: "10px",
        },

        /* CART */
        cartOverlay: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: menuOpen ? "block" : "none",
            zIndex: 998,
        },

        cart: {
            position: "fixed",
            top: 0,
            right: menuOpen ? 0 : "-340px",
            width: "300px",
            height: "100vh",
            background: "#0b0505",
            borderLeft: "2px solid #ff3b3b",
            padding: "15px",
            transition: "0.3s ease",
            zIndex: 999,
            overflowY: "auto",
        },

        cartItem: {
            padding: "10px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
        },

        closeBtn: {
            background: "transparent",
            border: "1px solid #ff3b3b",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "6px",
            marginBottom: "10px",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.container}>

            {/* NAVBAR */}
            <div style={styles.navbar}>
                <div style={styles.logo}>☕ Crimson Café</div>

                <div style={styles.navGroup}>
                    <button style={styles.btn} onClick={() => scrollToSection(homeRef)}>Home</button>
                    <button style={styles.btn} onClick={() => scrollToSection(menuRef)}>Menu</button>
                    <button style={styles.btn} onClick={() => scrollToSection(aboutRef)}>About</button>
                    <button style={styles.btn} onClick={() => scrollToSection(contactRef)}>Contact</button>

                    <button style={styles.btn} onClick={() => setMenuOpen(true)}>
                        🛒 {cart.length}
                    </button>
                </div>
            </div>

            {/* CART OVERLAY */}
            <div style={styles.cartOverlay} onClick={() => setMenuOpen(false)} />

            {/* CART */}
            <div style={styles.cart}>
                <button style={styles.closeBtn} onClick={() => setMenuOpen(false)}>
                    ✖ Close
                </button>

                <h3 style={{ color: "#ff3b3b" }}>Your Orders</h3>

                {cart.length === 0 ? (
                    <p>No items yet</p>
                ) : (
                    cart.map((item, i) => (
                        <div key={i} style={styles.cartItem}>
                            • {item.name} - Rs {item.price}
                        </div>
                    ))
                )}
            </div>

            {/* HERO */}
            <div ref={homeRef} style={styles.hero}>
                <div style={styles.overlay}></div>
                <div>
                    <h1 style={styles.title}>Crimson Café</h1>
                    <p style={styles.subtitle}>
                        Luxury coffee experience crafted for perfection
                    </p>
                </div>
            </div>

            {/* MENU */}
            <div ref={menuRef} style={styles.section}>
                <h1 style={{ color: "#ff3b3b" }}>Menu</h1>

                <div style={styles.grid}>
                    {menu.map((item, i) => (
                        <motion.div key={i} style={styles.card} whileHover={{ scale: 1.05 }}>
                            <img src={item.img} style={styles.img} />
                            <div style={styles.content}>
                                <h4>{item.name}</h4>
                                <p style={{ color: "#ff3b3b" }}>Rs {item.price}</p>
                                <button
                                    style={{
                                        marginTop: "8px",
                                        width: "100%",
                                        padding: "6px",
                                        background: "#ff3b3b",
                                        border: "none",
                                        color: "#fff",
                                        borderRadius: "6px",
                                    }}
                                    onClick={() => addToCart(item)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ABOUT */}
            <div ref={aboutRef} style={styles.section}>
                <h1 style={{ color: "#ff3b3b" }}>About</h1>
                <p style={{ color: "#ccc", maxWidth: "600px", margin: "auto" }}>
                    Premium café experience with handcrafted coffee and modern luxury vibes.
                </p>
            </div>

            {/* CONTACT */}
            <div ref={contactRef} style={styles.section}>
                <h1 style={{ color: "#ff3b3b" }}>Contact</h1>

                <input placeholder="Name" style={{ margin: 8, padding: 10 }} />
                <input placeholder="Email" style={{ margin: 8, padding: 10 }} />

                <br />

                <button style={{
                    marginTop: 10,
                    padding: "10px 20px",
                    background: "#ff3b3b",
                    border: "none",
                    color: "#fff",
                    borderRadius: "6px"
                }}>
                    Send Message
                </button>
            </div>
        </div>
    );
}

export default Home;