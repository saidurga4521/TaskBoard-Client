import { useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../toolkit/userSlice.js";
import { saveToLocalStorage } from "../helpers/localstorage";

const SignUp = () => {
  const initial = { name: "", email: "", password: "" };
  const [signUpUserData, setSignUpUserData] = useState(initial);
  const [error, setError] = useState(initial);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoading,
    error: reduxError,
    token,
  } = useSelector((state) => state.user);

  // ✅ Validation
  const validateField = (name, value) => {
    let message = "";
    if (!value) {
      message = "This field is required";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value))
        message = "Please enter a valid email address";
    } else if (name === "password" && value.length < 6) {
      message = "Password must be at least 6 characters";
    }
    setError((prev) => ({ ...prev, [name]: message }));
  };

  // ✅ Handle Input Change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSignUpUserData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    Object.entries(signUpUserData).forEach(([key, value]) => {
      validateField(key, value);
      if (!value) valid = false;
    });

    if (!valid) return;

    try {
      const result = await dispatch(signUpUser(signUpUserData)).unwrap();
      saveToLocalStorage(result.token);
      toast.success("User registered successfully!");
      navigate("/");
    } catch (err) {
      console.log("Signup failed:", err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-teal-100 px-4 font-sans">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign up to get started
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={signUpUserData.name}
              onChange={handleOnChange}
              placeholder="Enter your name"
              className={`w-full border ${
                error.name ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none`}
            />
            {error.name && (
              <p className="text-red-500 text-xs mt-1">{error.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={signUpUserData.email}
              onChange={handleOnChange}
              placeholder="you@example.com"
              className={`w-full border ${
                error.email ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none`}
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={signUpUserData.password}
                onChange={handleOnChange}
                placeholder="********"
                className={`w-full border ${
                  error.password ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-md text-sm font-medium hover:opacity-90 focus:ring-2 focus:ring-teal-400 disabled:opacity-70 flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-5">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </button>
        </p>

        {/* Optional: Redux Error */}
        {reduxError && (
          <p className="text-center text-red-500 text-sm mt-3">{reduxError}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
