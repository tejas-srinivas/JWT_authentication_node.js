import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Overlay from "../Overlay/Overlay";
import "../Overlay/overlay.css";
import { CircularProgress } from "@chakra-ui/react";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleClick = () => {
    setLoading(!loading)
    window.location = `/user/${data.email}`;
  };

  const handleLabel = () => {
    setShow(!show)
  }

  const message = "Log In Successful";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(!loading)
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      setIsOverlayOpen(!isOverlayOpen);
      console.log(data)
      //window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <label className="login__show_hide" onClick={handleLabel}>{ show ? "Hide" : "Show"}</label>
            {error && <div className={styles.error_msg}>{error}</div>}
            <div className="submit__loading">
              <button type="submit" className={styles.green_btn}>
                Sign In
              </button>
              {loading && <CircularProgress isIndeterminate color="green" />}
            </div>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
          {isOverlayOpen && (
            <Overlay
              isOpen={isOverlayOpen}
              onClose={() => setIsOverlayOpen(!isOverlayOpen)}
              message={message}
              >
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

export default Login;
