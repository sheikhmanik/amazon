import Hero from "./home-page/Hero";
import Products from "./home-page/products/Products";

export default function Home() {
    return (
        <div className="flex flex-col gap-16">
            <Hero autoSlide={true} autoSlideInterval={5000} />
            <Products category="All" title="All Products" />
            <Products category="Beauty" title="Beauty Products" />
            <Products category="Fragrances" title="Fragrances Products" />
            <Products category="Furniture" title="Furniture Products" />
            <Products category="Groceries" title="Groceries Products" />
        </div>
    )
}