import { useDispatch, useSelector } from "react-redux";

import Signup from "./Signup";
import Login from "./Login";
import { accountActions } from "../store/account";

export default function Account() {

    const dispath = useDispatch();
    const accountInfo = useSelector(state => state.account.accountInfo);
    const loggedIn = accountInfo?.loggedIn;

    function deleteAccount() {
        dispath(accountActions.deleteAccount());
        window.scroll(0, 0);
    }

    function logout() {
        dispath(accountActions.logOut());
        window.scroll(0, 0);
    }

    return (
        <div className="my-10 px-3">
        {!accountInfo && <Signup />}
        {accountInfo && !loggedIn && <Login/>}
        {accountInfo && loggedIn && (
            <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-gray-800 dark:text-white">
                <div className="flex items-start justify-between pb-7">
                    <h1 className="text-3xl font-bold mb-6">Welcome, {accountInfo["last-name"]}!</h1>
                    <button 
                        onClick={deleteAccount} 
                        className="flex items-center justify-center px-5 py-2.5 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 rounded-md dark:text-white dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400 cursor-pointer"
                    >
                        Delete Account
                    </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                        <p><span className="font-medium">First Name:</span> {accountInfo["first-name"]}</p>
                        <p><span className="font-medium">Last Name:</span> {accountInfo["last-name"]}</p>
                        <p><span className="font-medium">Email:</span> {accountInfo.email}</p>
                        <p><span className="font-medium">Role:</span> {accountInfo.role}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Other Details</h2>
                        <p><span className="font-medium">Found us via:</span></p>
                        <ul className="list-disc list-inside ml-4">
                            {accountInfo.acquisition?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <p className="mt-2"><span className="font-medium">Agreed to Terms:</span> ✅</p>
                    </div>
                </div>
                <button 
                    onClick={logout} 
                    className="flex items-center justify-center px-5 py-2.5 text-sm font-medium text-red-600 bg-white border border-red-300 hover:bg-red-50 rounded-md dark:bg-transparent dark:text-red-300 dark:border-red-500 dark:hover:bg-red-900 cursor-pointer mt-3"
                >
                    Logout
                </button>

            </div>
        )}
        </div>
    )
}