import { useState } from "react";
import styles from "./styles.module.css";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Overlay from "../Overlay/Overlay";
import "../Overlay/overlay.css";
import { CircularProgress } from "@chakra-ui/react";

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
  const [error, setError] = useState("")
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
    
  const navigate = useNavigate()
  
  const handleClick = () => {
    setLoading(!loading)
    navigate("/login")
  };

  const handleLabel = () => {
    setShow(!show);
  };

  const message = "Registration Successful";

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      try {
          setLoading(!loading)
          const url = "http://localhost:8080/api/users";
        const { data: res } = await axios.post(url, data)
        .then(setLoading(!loading))
          setIsOverlayOpen(!isOverlayOpen);
          //setLoading(!loading)
          //navigate("/login");
          console.log(res.message);
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setError(error.response.data.message);
          }
        }
    }

  return (
    <div>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Sign in
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input
                type="text"
                className={styles.input}
                placeholder="First Name"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className={styles.input}
                placeholder="Last Name"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className={styles.input}
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
              <input
                type={show ? "text":"password"}
                className={styles.input}
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
              <label onClick={handleLabel}>{show ? "Hide" : "Show"}</label>
              {error && <div className={styles.error_msg}>{error}</div>}
              <div className="submit__loading">
                <button type="submit" className={styles.green_btn}>
                  Sign Up
                </button>
                {loading && <CircularProgress isIndeterminate color="green" />}
              </div>
            </form>
          </div>

          {isOverlayOpen && (
            <Overlay
              isOpen={isOverlayOpen}
              onClose={() => setIsOverlayOpen(!isOverlayOpen)}
              message={message}>
              <button
                onClick={handleClick}
                className={styles.green_btn}
                style={{ width: "100px", marginLeft: "0" }}>
                Ok
              </button>
            </Overlay>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
