import React from 'react';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import Footer from '../Component/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import formatCurrency from '../asset/formatprice';


function Index() {
    const [books, setBook] = useState([])
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/BackEnd-Laravel-BookStore/public/api/book');
            setBook(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    const cartitem = []

    const handleCartItem = async (bookID, amount) => {
        
        const userID = JSON.parse(localStorage.getItem('user')).id
        console.log(userID);
        try {
          const res = await axios.post('http://localhost/BackEnd-Laravel-BookStore/public/api/home/cartitems/add', {bookID, amount, userID})
          console.log(res.data);
           
        } catch (error) {
            console.log(error);
        }
    }

    console.log(books);
    return (
        <>
            <Header />
            <section id="slider">
                {/*slider*/}
                <div className="container" style={{width: '100%'}}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div
                                id="slider-carousel"
                                className="carousel slide"
                                data-ride="carousel"
                            >
                                <ol className="carousel-indicators">
                                    <li
                                        data-target="#slider-carousel"
                                        data-slide-to={0}
                                        className="active"
                                    />
                                    <li data-target="#slider-carousel" data-slide-to={1} />
                                    <li data-target="#slider-carousel" data-slide-to={2} />
                                </ol>
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <div className="col-sm-12">
                                            <img width={'1250px'}
                                                src="images/home/ms_banner_img1.webp"
                                                className="img-responsive"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-sm-12">
                                            <img width={'1250px'}
                                                src="images/home/banner_img4.webp"
                                                className="img-responsive"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-sm-12">
                                            <img width={'1250px'}
                                                src="images/home/banner_img5.webp"
                                                className="img-responsive"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href="#slider-carousel"
                                    className="left control-carousel hidden-xs"
                                    data-slide="prev"
                                >
                                    <i className="fa fa-angle-left" />
                                </a>
                                <a
                                    href="#slider-carousel"
                                    className="right control-carousel hidden-xs"
                                    data-slide="next"
                                >
                                    <i className="fa fa-angle-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*/slider*/}
            <section>
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <div className="col-sm-9 padding-right">
                        <div className="recommended_items">
                                {/*recommended_items*/}
                                <h2 className="title text-center">Mặt hàng liên quan</h2>
                                <div
                                    id="recommended-item-carousel"
                                    className="carousel slide"
                                    data-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            {books.map((book) => {
                                                return (
                                                <div key={book.id} className="col-sm-4">
                                                    <div className="product-image-wrapper">
                                                        <div className="single-products">
                                                            <div className="productinfo text-center">
                                                                <Link to={'/product-detail'} state={{bookId: book.id, categoryId: book.categories_id}}>
                                                                    <img src={'images/img/' + book.img} alt="" />
                                                                    <h2>{book.price} VND</h2>
                                                                    <p>{book.name}</p>
                                                                </Link> 
                                                                <a href="#" className="btn btn-default add-to-cart">
                                                                    <i className="fa fa-shopping-cart" />
                                                                    Add to cart
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            })}
                                            
                                        </div>
                                        <div className="item">
                                            {books.map((book) => {
                                                return (
                                                <div key={book.id} className="col-sm-4">
                                                    <div className="product-image-wrapper">
                                                        <div className="single-products">
                                                            <div className="productinfo text-center">
                                                                <Link to={'/product-detail'} state={{bookId: book.id, categoryId: book.categories_id}}>
                                                                    <img src={'images/img/' + book.img} alt="" />
                                                                    <h2>{formatCurrency(book.price)} VND</h2>
                                                                    <p>{book.name}</p>
                                                                </Link>
                                                                <a href="#" className="btn btn-default add-to-cart">
                                                                    <i className="fa fa-shopping-cart" />
                                                                    Add to cart
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            })}
                                        </div>
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
                            

                            <div>
                                <img style={{width: '100%', marginBottom: '42px'}} src="images/home/banner_manga.webp" alt="" />
                            </div>
                            

                            <div className="features_items">
                                {/*features_items*/}
                                <h2 className="title text-center">Mặt hàng nổi bật</h2>
                                {books.map((book) => {
                                    
                                    return (
                                    <div key={book.id} className="col-sm-4">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <Link to={'/product-detail'} state={{bookId: book.id, categoryId: book.categories_id}}>
                                                        <img src={'images/img/' + book.img} alt="" />
                                                        <h2>{formatCurrency(book.price)} VNĐ</h2>
                                                        <p>{book.name}</p>
                                                    </Link>
                                                    <a href="#" onClick={() => handleCartItem(book.id, 1)} className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Thêm vào giỏ hàng
                                                    </a>
                                                </div>
                                                <div className="product-overlay">
                                                    <div className="overlay-content">
                                                        <Link to={'/product-detail'} state={{bookId: book.id, categoryId: book.categories_id}}>
                                                            <h2>{formatCurrency(book.price)} VNĐ</h2>
                                                            <p>{book.name}</p>
                                                        </Link>
                                                        <button href="" onClick={() => handleCartItem(book.id, 1)} className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Thêm vào giỏ hàng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Index;