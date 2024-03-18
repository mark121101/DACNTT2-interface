const Footer = () => {
    return (
        <footer id="footer" className="footer p-10 bg-base-200 text-base-content">
            <aside>
                <a className="btn btn-ghost text-xl">English.</a>

                <p>
                    <strong>English. Inc</strong>
                    <br />
                    Cung cấp dịch vụ giảng dạy tiếng Anh từ năm 2024
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};
export default Footer;
