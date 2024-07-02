import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../Hooks/useSignup";

export const Register = () => {
  const [creds, setCreds] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  let selectedGender = creds.gender;
  const handleCheckboxChange = (gender) => {
    setCreds({ ...creds, gender: gender });
  };

  const { loading, signup } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(creds);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className=" text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>
        <form className="flex flex-col text-slate-300" onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base lable-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Kerollos George"
              className="w-full input input-borderd h-10"
              value={creds.fullName}
              onChange={(e) => setCreds({ ...creds, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base lable-text">username</span>
            </label>
            <input
              type="text"
              placeholder="kerollosgeorge"
              className="w-full input input-borderd h-10"
              value={creds.username}
              onChange={(e) => setCreds({ ...creds, username: e.target.value })}
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
              value={creds.password}
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base lable-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Passwoed"
              className="w-full input input-borderd h-10"
              value={creds.confirmPassword}
              onChange={(e) =>
                setCreds({ ...creds, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="flex">
            <div className="form-control">
              <label
                className={`label gap-2 cursor-pointer ${
                  selectedGender === "male" ? "selected" : ""
                }`}
              >
                <span className="label-text">Male</span>
                <input
                  type="checkbox"
                  className="checkbox border-slate-900"
                  checked={selectedGender === "male"}
                  onChange={() => handleCheckboxChange("male")}
                />
              </label>
            </div>
            <div className="form-control">
              <label
                className={`label gap-2 cursor-pointer ${
                  selectedGender === "female" ? "selected" : ""
                }`}
              >
                <span className="label-text">Female</span>
                <input
                  type="checkbox"
                  className="checkbox border-slate-900"
                  checked={selectedGender === "female"}
                  onChange={() => handleCheckboxChange("female")}
                />
              </label>
            </div>
          </div>

          <Link
            to={"/login"}
            className="text-sm self-start  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>
          <button className="btn btn-block btn-sm mt-2" disabled={loading}>
            {loading ? (
              <span className="loadeing loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
