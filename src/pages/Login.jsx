import { useDispatch, useSelector } from "react-redux";
import { accountActions } from "../store/account";

export default function Login() {

    const dispath = useDispatch();
    const accountInfo  = useSelector(state => state.account.accountInfo);
    const email = accountInfo.email;
    const password = accountInfo.password;

    function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        console.log("Login data:", data);
        if (email === data.email && password === data.password) {
            dispath(accountActions.logIn());
            window.scroll(0, 0);
        } else {
            console.log('incorrect password!');
        }
    }

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-gray-200 dark:bg-gray-900 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Enter your password"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    )
}