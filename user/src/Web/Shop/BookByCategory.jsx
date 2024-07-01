import React from 'react';
import Header from '../../Component/Header';
import Sidebar from '../../Component/Sidebar';
import Footer from '../../Component/Footer';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function BookByCategory() {
    const location = useLocation()
    const {categoryId} = location.state || {}

    const [books, setBooks] = useState([])

    
    useEffect(() => {
        if(categoryId) {
            const fetchdata = async () => {
                try {
                    const response = await axios.get(`http://localhost/BackEnd-Laravel-BookStore/public/api/home/category/${categoryId}`)
                    setBooks(response.data)
                } catch (error) {
                    console.log('error');
                }
            }
            fetchdata()
        }
    }, [categoryId])

    

    return (
        <>
            <Header />
            <section id="advertisement">
                <div className="container">
                    <img src="images/home/banner_manga.webp" alt="" />
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">
                                {/*features_items*/}
                                <h2 className="title text-center">Tất cả mặt hàng</h2>
                                {books.map((book) => {
                                    return(
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
                                                            Thêm vào giỏ hàng
                                                        </a>
                                                    </div>
                                                    <div className="product-overlay">
                                                        <div className="overlay-content">
                                                            <Link to={'/product-detail'} state={{bookId: book.id, categoryId: book.categories_id}}>
                                                                <h2>{book.price}</h2>
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
                                        </div>
                                        
                                    )
                                })}
                                
                                
                                <ul  className="pagination">
                                    <li className="active">
                                        <a href="">1</a>
                                    </li>
                                    <li>
                                        <a href="">2</a>
                                    </li>
                                    <li>
                                        <a href="">3</a>
                                    </li>
                                    <li>
                                        <a href="">»</a>
                                    </li>
                                </ul>
                            </div>
                            {/*features_items*/}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            {/*/Footer*/}
        </>
    )
}



export default BookByCategory;