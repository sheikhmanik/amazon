import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import Loading from "../../../ui/Loading";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

export default function Products({ category, title }) {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    async function fetchProducts() {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/api/products`);
        const data = response.data.products;
        const filteredProducts = category.toLowerCase() === 'all' 
        ? data
        : data.filter(product => product.category.toLowerCase() === category.toLowerCase())
        setProducts(filteredProducts);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const [slidesToShow, setSlidesToShow] = useState();
    const [slidesToScroll, setSlidesToScroll] = useState();

    useEffect(() => {
        const updateSlides = () => {
            const screenWidth = window.innerWidth > 1536 ? 1536 : window.innerWidth;            
            const cardWidth = screenWidth <= 400 ? (175 + 10) : (175 + 20); // 175px card + ~24px margin (e.g. Tailwind `gap-6`)
            const calculatedSlides = Math.floor(screenWidth / cardWidth);
            const show = Math.max(calculatedSlides, 1); // At least show 1
            setSlidesToShow(show);
            setSlidesToScroll(show);
        };
        updateSlides();
        window.addEventListener("resize", updateSlides);
        return () => window.removeEventListener("resize", updateSlides);
    }, []);
    

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow,
        slidesToScroll,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

    return (
        <div className="sm:mx-5 max-w-[1536px]">
            { isLoading ? (
                <div className="flex items-center justify-center">
                    <Loading/>
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    <h3 className="font-Montserrat uppercase font-bold text-xl md:text-2xl ml-5">{ title }</h3>
                    
                    <Slider key={slidesToShow} {...settings} >
                        {products.map((product, index) => {
                            function handleBuying() {
                                sessionStorage.setItem('PRODUCT_TO_BUY', JSON.stringify(product));
                                window.scroll(0, 0);
                                navigate("/checkout");
                            }
                            return (
                                <div key={index} className="px-2">
                                    <Product {...product} handleBuying={handleBuying} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            )}
        </div>
    )
}