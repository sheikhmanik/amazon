import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
    return (
        <>
            <Header/>
            <div className="pt-[120px] sm:pt-[64px]">
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}