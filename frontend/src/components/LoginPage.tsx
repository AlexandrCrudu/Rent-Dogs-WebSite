import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = ({ isLogin }: { isLogin: Boolean }) => {
  type Inputs = {
    email: string;
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const handleLogin: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        <div className="login-form-div">
          {isLogin ? <h2>Login</h2> : <h2>Sign up</h2>}
        </div>
        <div className="login-form-div">
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: "Fill in before submitting!" })}
          />
          <p>{errors.email?.message}</p>
        </div>
        {!isLogin && (
          <div className="login-form-div">
            <input
              placeholder="username"
              {...register("username", {
                required: "Fill in before submitting!",
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
