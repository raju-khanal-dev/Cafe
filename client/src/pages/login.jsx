import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate();
    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f4f4f4",
        },
        card: {
            width: "400px",
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        },
        heading: {
            textAlign: "center",
            marginBottom: "20px",
        },
        input: {
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            outline: "none",
        },
        button: {
            width: "100%",
            padding: "12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
        },
        text: {
            textAlign: "center",
            marginTop: "15px",
        },
        link: {
            color: "#007bff",
            textDecoration: "none",
        },
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, password })

            })
            const data = await response.json();
            if (data.success) {
                localStorage.setItem("auth", "true");
                return navigate("/home");
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Login</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>

                <p style={styles.text}>
                    Don't have an account?{" "}
                    <Link to="/" style={styles.link}>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;