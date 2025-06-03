import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Mountain,
  Zap,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const RockLoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // Validate form data
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      //   if (formData.password.length < 6) {
      //     throw new Error("Password must be at least 6 characters long");
      //   }

      // Prepare request data
      const requestData = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      // Make API call
      const endpoint = isLogin
        ? "http://localhost:6969/api/v1/user/login"
        : "http://localhost:6969/api/v1/user/signup";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log(response)
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `${isLogin ? "Login" : "Signup"} failed`
        );
      }

      // Success handling
      setSuccess(true);

      // Store token if provided
      if (data.token) {
        // In a real app, you'd store this securely
        console.log("Token received:", data.token);
      }

      // Navigate to home after a short delay
      setTimeout(() => {
        // In a real React app with React Router, you'd use:
        // navigate('/home') or history.push('/home')
        console.log("Navigating to home page...");
        alert(
          `${
            isLogin ? "Login" : "Signup"
          } successful! Redirecting to home page...`
        );
        // window.location.href = '/home'; // Uncomment for actual navigation
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-stone-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mountain silhouette background */}
      <div className="absolute bottom-0 left-0 right-0 h-96 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <path
            d="M0,400 L0,300 L100,200 L200,150 L300,120 L400,100 L500,80 L600,60 L700,90 L800,120 L900,180 L1000,220 L1100,280 L1200,320 L1200,400 Z"
            fill="url(#mountainGradient)"
            className="opacity-30"
          />
          <path
            d="M0,400 L0,350 L150,250 L250,200 L350,170 L450,140 L550,120 L650,100 L750,130 L850,160 L950,200 L1050,240 L1150,300 L1200,350 L1200,400 Z"
            fill="url(#mountainGradient2)"
            className="opacity-20"
          />
          <defs>
            <linearGradient
              id="mountainGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#92400e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#451a03" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient
              id="mountainGradient2"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Moving rocks and debris */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={`rock-${i}`}
            className="absolute animate-float-rock opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          >
            <div
              className="bg-gradient-to-br from-stone-400 to-stone-600 transform rotate-12 shadow-lg"
              style={{
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                borderRadius: `${Math.random() * 50}% ${Math.random() * 50}% ${
                  Math.random() * 50
                }% ${Math.random() * 50}%`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Larger floating rocks */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={`large-rock-${i}`}
            className="absolute animate-drift opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
            }}
          >
            <div
              className="bg-gradient-to-br from-stone-500 to-stone-700 shadow-xl"
              style={{
                width: `${8 + Math.random() * 16}px`,
                height: `${8 + Math.random() * 16}px`,
                borderRadius: `${Math.random() * 30}% ${Math.random() * 30}% ${
                  Math.random() * 30
                }% ${Math.random() * 30}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Small dust particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute w-1 h-1 bg-stone-300 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Mountain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
            CoreAnalyzer
          </h1>
          <p className="text-stone-300 text-sm">
            Advanced Lithology Analysis Platform
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.02] transition-all duration-300">
          {/* Toggle Buttons */}
          <div className="flex mb-8 bg-black/20 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="space-y-6">
            {/* Success Message */}
            {success && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-green-300 font-medium">
                    {isLogin
                      ? "Login successful!"
                      : "Account created successfully!"}
                  </p>
                  <p className="text-green-400 text-sm">
                    Redirecting to home page...
                  </p>
                </div>
              </div>
            )}
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-300 font-medium">Error</p>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}
            {/* Name Field (Sign Up Only) */}
            {!isLogin && (
              <div className="space-y-2 transform animate-fadeIn">
                <label className="text-stone-200 text-sm font-medium">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 group-focus-within:text-amber-400 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-stone-200 text-sm font-medium">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 group-focus-within:text-amber-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            \{/* Password Field */}
            {/* Phone Number Field */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-stone-200 text-sm font-medium">
                  Phone Number
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 group-focus-within:text-amber-400 transition-colors" />
                  <input
                    type="text"
                    name="number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    placeholder="Enter your Phone Number"
                    required
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-stone-200 text-sm font-medium">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 group-focus-within:text-amber-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-amber-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Confirm Password (Sign Up Only) */}
            {!isLogin && (
              <div className="space-y-2 transform animate-fadeIn">
                <label className="text-stone-200 text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 group-focus-within:text-amber-400 transition-colors" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            {/* Forgot Password (Login Only) */}
            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    {isLogin ? "Sign In" : "Create Account"}
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            {/* Terms (Sign Up Only) */}
            {!isLogin && (
              <p className="text-stone-300 text-xs text-center leading-relaxed">
                By creating an account, you agree to our{" "}
                <button
                  type="button"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Privacy Policy
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-stone-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              {isLogin ? "Sign up here" : "Sign in here"}
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-rock {
          0% {
            transform: translateX(-10px) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(10px) translateY(-15px) rotate(90deg);
          }
          50% {
            transform: translateX(-5px) translateY(-10px) rotate(180deg);
          }
          75% {
            transform: translateX(15px) translateY(-20px) rotate(270deg);
          }
          100% {
            transform: translateX(-10px) translateY(0px) rotate(360deg);
          }
        }

        @keyframes drift {
          0% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateX(-30px) translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateX(20px) translateY(-30px) rotate(240deg);
          }
          100% {
            transform: translateX(0px) translateY(0px) rotate(360deg);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-float-rock {
          animation: float-rock ease-in-out infinite;
        }

        .animate-drift {
          animation: drift ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default RockLoginForm;
