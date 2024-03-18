const Hero = () => {
    const textIntroduce = `Chào mừng bạn đến với English. 
        Với sứ mệnh mang đến giải pháp học tiếng Anh hàng đầu, 
        English. hội tụ những yếu tố tốt nhất như: 
        Đội ngũ giáo viên bản xứ chuyên môn cao, cố vấn học tập hỗ trợ tận tình. 
        Lớp học có tính tương tác và phương pháp đã được kiểm chứng hiệu quả. 
        Học tiếng Anh online - offline với thời gian linh hoạt.`;
    return (
        <div
            id="learn"
            className="hero min-h-screen"
            style={{
                backgroundImage:
                    "url(https://giasutienphong.com.vn/wp-content/uploads/2020/06/tt-tieng-anh-quan-10.jpg)",
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content z-10">
                <div className="max-w-md ">
                    <h1 className="mb-5 text-base-100 text-5xl font-bold uppercase">học Tiếng Anh</h1>
                    <h1 className="mb-5 text-base-100 text-3xl font-bold uppercase">giao tiếp</h1>
                    <h1 className="mb-5 text-3xl font-bold uppercase">
                        tại <span className="text-neutral bg-neutral-content rounded px-3">English.</span>
                    </h1>

                    <p className="mb-5">{textIntroduce}</p>
                    <button className="btn text-xl text-neutral">Liên hệ ngay</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
