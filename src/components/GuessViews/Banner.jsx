const Banner = () => {
    const textOnBanner = "Tham gia ngay để được nhận ưu đãi";

    return (
        <div className="relative flex justify-center items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5">
            <p className="text-sm leading-6 text-gray-900">
                <strong className="font-semibold">
                    Tư vấn miễn phí{" "}
                    <a className="btn" href="tel:1800 646464">
                        1800 646464
                    </a>
                </strong>
                <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                    <circle cx={1} cy={1} r={1} />
                </svg>
                {textOnBanner}
            </p>
            <a
                href="#"
                className="rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
                Đăng kí ngay <span aria-hidden="true">&rarr;</span>
            </a>
        </div>
    );
};

export default Banner;
