import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../toolkit/userSlice.js";
import { saveToLocalStorage } from "../helpers/localstorage.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      saveToLocalStorage(result.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.log("Login error:", err);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-teal-100 px-4 font-sans">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h2>
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">Login to continue</p>
          <p className="text-sm text-gray-500 mt-3">
            Use dummy credentials to login
          </p>

          <div className="mt-3 inline-block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-left">
            <div className="text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Email:</span>
                <span className="font-mono">saikamireddi3@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-semibold">Password:</span>
                <span className="font-mono">452145</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className={`w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
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
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-5">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>

        {error && (
          <p className="text-center text-red-500 text-sm mt-3">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
