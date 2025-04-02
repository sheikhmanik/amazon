import Hero from "./home-page/Hero";

export default function Home() {
    return (
        <>
            <Hero autoSlide={true} autoSlideInterval={5000} />
        </>
    )
}