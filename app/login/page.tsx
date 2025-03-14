'use client';
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    // const router = useRouter();

    function sendLoginRequest(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        console.log("Username:", username);
        console.log("Password:", password);
        login();
        // router.push("/construction");
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Company Logo and Title */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Awesome Constructions</h1>
                    <p className="text-gray-600">Welcome back! Please log in to your account.</p>
                </div>

                {/* Login Form */}
                <form className="space-y-6" onSubmit={sendLoginRequest}>
                    {/* Username Input */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Log In
                    </button>
                </form>

                {/* Register Option */}
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        {"Don't have an account? "}
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>

                {/* Social Login Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-4">
                    {/* Google Login Button */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                        Log in with Google
                    </button>

                    {/* Facebook Login Button */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <img
                            src="https://www.facebook.com/favicon.ico"
                            alt="Facebook"
                            className="w-5 h-5 mr-2"
                        />
                        Log in with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}
