import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import JWTContext from "../JWTContext";
import { signup, login } from "../../fetch-functions.js/users/auth";
import { LoginAPIResType, SignUpAPIResType } from "../types/UserTypes";

type Inputs = {
  email: string;
  username: string;
  password: string;
};

const LoginPage = ({ isLogin }: { isLogin: Boolean }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [jwt, setJwt] = useContext(JWTContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const email = watch("email");

  useEffect(() => {
    if (email && !errors.email && error) {
      setError("");
    }
  }, [email, errors.email]);

  const handleLogin: SubmitHandler<Inputs> = async (data) => {
    const res: SignUpAPIResType = await signup(data);
    if (res.status === "error") {
      if (res.message.includes("duplicate key")) {
        setError("Email taken!");
      }
    } else {
      setJwt(res.token);
      navigate("/");
    }
  };

  const handleSignup: SubmitHandler<Inputs> = async (data) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    const res: LoginAPIResType = await login(body);
    setJwt(res.token);
    navigate("/");
  };

  return (
    <div className="login-form-wrapper">
      <form
        className="login-form"
        onSubmit={
          isLogin ? handleSubmit(handleSignup) : handleSubmit(handleLogin)
        }
      >
        <div className="login-form-div">
          {isLogin ? <h2>Login</h2> : <h2>Sign up</h2>}
        </div>
        <div className="login-form-div">
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: "Fill in before submitting!" })}
          />
          {error ? <p>Email already taken!</p> : ""}
          <p>{errors.email?.message}</p>
        </div>
        {!isLogin && (
          <div className="login-form-div">
            <input
              placeholder="username"
              {...register("username", {
                required: "Fill in before submitting!",
                minLength: {
                  value: 2,
                  message: "Username must contain at least 2 characters",
                },
              })}
            />
            <p>{errors.username?.message}</p>
          </div>
        )}
        <div className="login-form-div">
          <input
            placeholder="password"
            type="password"
            {...register("password", {
              required: "Fill in before sumbitting!",
              minLength: {
                value: 8,
                message: "Passowrd must contain at least 8 characters!",
              },
            })}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div className="login-form-div">
          {isLogin ? (
            <p className="sign-up-paragraph">
              No account yet?{" "}
              <Link className="sign-up-link" to="/Signup">
                Register here
              </Link>
            </p>
          ) : (
            <p className="sign-up-paragraph">
              Already a member?{" "}
              <Link className="sign-up-link" to="/Login">
                Log in
              </Link>
            </p>
          )}

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
