import { useState } from "react";
import { useDispatch } from "react-redux";
import { accountActions } from "../store/account";

export default function Signup() {

    const dispath = useDispatch();
    const [passwordIsNotEqual, setPasswordIsNotEqual] = useState();
    
    function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        const acquisitionData = fd.getAll('acquisition');
        data.acquisition = acquisitionData
        if(data.password !== data.confirmPassword) {
            setPasswordIsNotEqual(true);
            return;
        } else {
            setPasswordIsNotEqual(false);
        }
        data.loggedIn = true;
        dispath(accountActions.signUp(data));
        window.scroll(0, 0);
    }
    
    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
            
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white pb-5">Sign Up</h2>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength={6}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        minLength={6}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {passwordIsNotEqual && (
                <p className="text-red-600 dark:text-red-400 mb-4">Password doesn't match!</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                    <input
                        name="first-name"
                        type="text"
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                    <input
                        name="last-name"
                        type="text"
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">What best describes your role?</label>
                <select
                    name="role"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <fieldset className="mb-4">
                <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">How did you find us?</legend>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input name="acquisition" value="google" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800" />
                        <label htmlFor="google" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Google</label>
                    </div>
                    <div className="flex items-center">
                        <input name="acquisition" value="friend" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800" />
                        <label htmlFor="friend" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Referred by friend</label>
                    </div>
                    <div className="flex items-center">
                        <input name="acquisition" value="other" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800" />
                        <label htmlFor="other" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Other</label>
                    </div>
                </div>
            </fieldset>

            <div className="my-6 pt-6">
                <div className="flex items-center">
                    <input type="checkbox" name="terms" required className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800" />
                    <label htmlFor="terms-and-conditions" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        I agree to the terms and conditions
                    </label>
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button type="reset" className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                Reset
                </button>
                <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                Sign up
                </button>
            </div>
        </form>
    )
}