"use client"
import React from 'react';
import Link from 'next/link'

const SignIn = ({ values, setValues, handleLogin,url,error }) => {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                        <button
                            onClick={handleLogin}
                            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 sm:mb-0"
                            type="button"
                        >
                            Sign In
                        </button>
                        <Link href={url}
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default SignIn;