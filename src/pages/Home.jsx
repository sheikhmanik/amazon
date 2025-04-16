import Hero from "./home-page/Hero";
import Products from "./home-page/products/Products";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center pb-10 gap-10 sm:gap-12">
            <Hero autoSlide={true} autoSlideInterval={5000} />
            <div className="w-screen max-w-[1536px] flex flex-col gap-14 sm:gap-16 py-7">
                <Products category="All" title="All Products" />
                <Products category="Beauty" title="Beauty Products" />
                <Products category="Fragrances" title="Fragrances Products" />
                <Products category="Furniture" title="Furniture Products" />
                <Products category="Groceries" title="Groceries Products" />
            </div>
        </div>
    )
}