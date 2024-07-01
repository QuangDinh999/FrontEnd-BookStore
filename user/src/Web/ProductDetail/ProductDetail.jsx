import React from 'react';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductDetail() {
    const location = useLocation()
    const bookInfo = location.state || {}
    console.log(bookInfo);
    const [booksDetail, setBookDetail] = useState([])
    const [bookByCategory, setBookByCategory] = useState([])
   
    

    useEffect(() => {
        if(bookInfo.bookId && bookInfo.categoryId) {
            const fetchdata = async () => { 
                try {
                    const bookDetail = await axios.get(`http://localhost/BackEnd-Laravel-BookStore/public/api/home/book_detail/${bookInfo.bookId}`)
                    console.log(bookDetail);
                    const bookByCategory = await axios.get(`http://localhost/BackEnd-Laravel-BookStore/public/api/home/category/${bookInfo.categoryId}`)
                    setBookDetail(bookDetail.data)
                    setBookByCategory(bookByCategory.data)
                } catch (error) {
                    console.log('error',  error);
                }
            }
            

            fetchdata()
        }
    }, [bookInfo])
    console.log(booksDetail);

    return (
        <>
            <Header />
            <section>
                <div className="container">
                    <div className="row">
                        {/* <Sidebar /> */}
                        <div className="col-sm-12 padding-right">
                            {booksDetail.map((book) => {
                                return(
                                    <div className="product-details" key={book.id}>
                                        {/*product-details*/}
                                        <div className="col-sm-4">
                                            <div className="view-product">
                                                <img src={'images/img/' + book.img} alt="" />
                                                <h3>ZOOM</h3>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="product-information">
                                                {/*/product-information*/}
                                                {/* <img
                                                    src={'images/img/' + book.img}
                                                    className="newarrival"
                                                    alt=""
                                                /> */}
                                                <h2>{book.name}</h2>
                                                <p>ISBN: {book.ISBN}</p>
                                                <span>
                                                    <span>{book.price} VNĐ</span>
                                                    <label>Số lượng:</label>
                                                    <input type="text" defaultValue={3} />
                                                    <button type="button" className="btn btn-fefault cart">
                                                        <i className="fa fa-shopping-cart" />
                                                         Thêm Giỏ hàng
                                                    </button>
                                                </span>
                                                <h4>
                                                    <b>Tác Giả:</b> {book.author}
                                                </h4>
                                            
                                                <p>
                                                    <b>Tình trạng hàng:</b> {book.amount > 0 ? 'Còn hàng': 'Hết hàng'}
                                                </p>
                                            
                                                
                                                {/* <a href="">
                                                    <img
                                                        src="images/product-details/share.png"
                                                        className="share img-responsive"
                                                        alt=""
                                                    />
                                                </a> */}
                                            </div>
                                            {/*/product-information*/}
                                        </div>
                                    </div>                                        
                                )
                            })}
                            {/*/product-details*/}
                            <div className="category-tab shop-details-tab">
                                {/*category-tab*/}
                                <div className="col-sm-12">
                                    <ul className="nav nav-tabs">
                                        {/* <li>
                                            <a href="#details" data-toggle="tab">
                                                Details
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#companyprofile" data-toggle="tab">
                                                Company Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#tag" data-toggle="tab">
                                                Tag
                                            </a>
                                        </li> */}
                                        <li className="active">
                                            <a href="#reviews" data-toggle="tab">
                                                Mô tả
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    {/* <div className="tab-pane fade" id="details">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="companyprofile">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tag">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="tab-pane fade active in" id="reviews">
                                        {booksDetail.map((book) => {
                                            return (
                                            <div className="col-sm-12">
                                                <p>
                                                    {book.description}
                                                </p>
                                            </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/*/category-tab*/}
                            <div className="recommended_items">
                                {/*recommended_items*/}
                                <h2 className="title text-center">Sách cùng thể loại</h2>
                                <div
                                    id="recommended-item-carousel"
                                    className="carousel slide"
                                    data-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            {bookByCategory.map((book) => {
                                                return (
                                                    <div key={book.id} className="col-sm-4">
                                                        <div className="product-image-wrapper">
                                                            <div className="single-products">
                                                                <div className="productinfo text-center">
                                                                    <Link to={'/product-detail'} state={{bookId: book.id, categoryId: book.categories_id}}>
                                                                        <img width={'200px'} src={'images/img/' + book.img} alt="" />
                                                                        <h2>{book.price}</h2>
                                                                        <p>{book.name}</p>
                                                                    </Link>
                                                                    
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-default add-to-cart"
                                                                    >
                                                                        <i className="fa fa-shopping-cart" />
                                                                        Thêm giỏ hàng
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {/* <div className="item">
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend1.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default add-to-cart"
                                                            >
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend2.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default add-to-cart"
                                                            >
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend3.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default add-to-cart"
                                                            >
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <a
                                        className="left recommended-item-control"
                                        href="#recommended-item-carousel"
                                        data-slide="prev"
                                    >
                                        <i className="fa fa-angle-left" />
                                    </a>
                                    <a
                                        className="right recommended-item-control"
                                        href="#recommended-item-carousel"
                                        data-slide="next"
                                    >
                                        <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                            </div>
                            {/*/recommended_items*/}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ProductDetail;