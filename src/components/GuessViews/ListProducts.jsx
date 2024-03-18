import ProductCard from "./ProductCard";
const ListProducts = () => {
    const course1 = {
        name: "Tiếng Anh giao tiếp",
        duration: "3",
        price: 3990000,
    };
    const course2 = {
        name: "Tiếng Anh IELTS",
        duration: "12",
        price: 7990000,
    };
    return (
        <section id="courses" className=" w-full min-h-screen">
            <ProductCard courses={course1} />
            <ProductCard courses={course2} />
        </section>
    );
};

export default ListProducts;
