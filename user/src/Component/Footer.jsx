import React from 'react';

function Footer() {
    return (
        <>
            <footer id="footer">
                {/*Footer*/}
                <div className="footer-top">
                    <div className="container">
                        {/* <div className="row">
                            <div className="col-sm-2">
                                <div className="companyinfo">
                                    <h2>
                                        <span>e</span>-shopper
                                    </h2>
                                    <p>
                                        
                                        
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do
                                        eiusmod tempor
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="col-sm-3">
                                    <div className="video-gallery text-center">
                                        <a href="#">
                                            <div className="iframe-img">
                                                <img src="images/home/iframe1.png" alt="" />
                                            </div>
                                            <div className="overlay-icon">
                                                <i className="fa fa-play-circle-o" />
                                            </div>
                                        </a>
                                        <p>Circle of Hands</p>
                                        <h2>24 DEC 2014</h2>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="video-gallery text-center">
                                        <a href="#">
                                            <div className="iframe-img">
                                                <img src="images/home/iframe2.png" alt="" />
                                            </div>
                                            <div className="overlay-icon">
                                                <i className="fa fa-play-circle-o" />
                                            </div>
                                        </a>
                                        <p>Circle of Hands</p>
                                        <h2>24 DEC 2014</h2>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="video-gallery text-center">
                                        <a href="#">
                                            <div className="iframe-img">
                                                <img src="images/home/iframe3.png" alt="" />
                                            </div>
                                            <div className="overlay-icon">
                                                <i className="fa fa-play-circle-o" />
                                            </div>
                                        </a>
                                        <p>Circle of Hands</p>
                                        <h2>24 DEC 2014</h2>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="video-gallery text-center">
                                        <a href="#">
                                            <div className="iframe-img">
                                                <img src="images/home/iframe4.png" alt="" />
                                            </div>
                                            <div className="overlay-icon">
                                                <i className="fa fa-play-circle-o" />
                                            </div>
                                        </a>
                                        <p>Circle of Hands</p>
                                        <h2>24 DEC 2014</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="address">
                                    <img src="images/home/map.png" alt="" />
                                    <p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="footer-widget">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                <div className="single-widget">
                                    <h2>DỊCH VỤ</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li>
                                            <a href="#">Điều khoản sử dụng</a>
                                        </li>
                                        <li>
                                            <a href="#">Chính sách bảo mật</a>
                                        </li>
                                        <li>
                                            <a href="#">Liên hệ</a>
                                        </li>
                                        <li>
                                            <a href="#">Tra cứu đơn hàng</a>
                                        </li>
                                        <li>
                                            <a href="#">FAQ’s</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="single-widget">
                                    <h2>HỖ TRỢ</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li>
                                            <a href="#">Hướng dẫn đặt hàng</a>
                                        </li>
                                        <li>
                                            <a href="#">Chính sách đổi trả - hoàn tiền</a>
                                        </li>
                                        <li>
                                            <a href="#">Phương thức vận chuyển</a>
                                        </li>
                                        <li>
                                            <a href="#">Chính sách khách hàng cho Thư viện - Trường học</a>
                                        </li>
                                        <li>
                                            <a href="#">Phương thức thanh toán</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="single-widget">
                                    <h2>KẾT NỐI MẠNG XÃ HỘI</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li>
                                            <a href="#">FaceBook</a>
                                        </li>
                                        <li>
                                            <a href="#">Instagram</a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="single-widget">
                                    <h2>About Shopper</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li>
                                            <a href="#">Company Information</a>
                                        </li>
                                        <li>
                                            <a href="#">Địa chỉ: Số 55 Quang Trung, Nguyễn Du, Hai Bà Trưng, Hà Nội</a>
                                        </li>
                                        <li>
                                            <a href="#">Số điện thoại: (+84) 1900571595</a>
                                        </li>
                                        <li>
                                            <a href="#">Affillate Program</a>
                                        </li>
                                        <li>
                                            <a href="#">Copyright</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3 col-sm-offset-1">
                                <div className="single-widget">
                                    <h2>About Shopper</h2>
                                    <form action="#" className="searchform">
                                        <input type="text" placeholder="Your email address" />
                                        <button type="submit" className="btn btn-default">
                                            <i className="fa fa-arrow-circle-o-right" />
                                        </button>
                                        <p>
                                            Get the most recent updates from <br />
                                            our site and be updated your self...
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <p className="pull-left">
                                Copyright © .
                            </p>
                            
                        </div>
                    </div>
                </div>
            </footer>
            {/*/Footer*/}
        </>
    )
}

export default Footer;