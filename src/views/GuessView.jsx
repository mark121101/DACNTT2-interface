import Banner from "../components/GuessViews/Banner";
import Navigative from "../components/GuessViews/NavigativeBar";
import Hero from "../components/GuessViews/Hero";
import ListProducts from "../components/GuessViews/ListProducts";
import Footer from "../components/GuessViews/Footer";


const StartedPage = () => {
    return (
        <>
            <Banner />
            <Navigative />
            <Hero />
            <ListProducts />
            <Footer />
        </>
    );
};

export default StartedPage;
