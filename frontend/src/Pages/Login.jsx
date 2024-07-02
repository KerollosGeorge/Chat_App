import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../Hooks/useLogin";

export const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className=" text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-500">ChatApp</span>
        </h1>
        <form className="flex flex-col text-slate-300" onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base lable-text">username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-borderd h-10"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base lable-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Passwoed"
              className="w-full input input-borderd h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to={"/register"}
            className="text-sm self-start  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <button className="btn btn-block btn-sm mt-2" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};