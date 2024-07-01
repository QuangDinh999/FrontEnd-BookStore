import React from 'react';
import Header from '../../Component/Header';
import Sidebar from '../../Component/Sidebar';
import Footer from '../../Component/Footer';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function BookBySearch() {
    const location = useLocation()
    const {searchWord} = location.state || {}
    const [books, setBooks] = useState([])
    console.log(searchWord);
    
    useEffect(() => {
        if(searchWord) {
            const fetchdata = async () => {
                try {
                    const response = await axios.get(`http://localhost/BackEnd-Laravel-BookStore/public/api/book`)
                    console.log(response.data);
                    setBooks(response.data)
                } catch (error) {
                    console.log('error');
                }
            }
            fetchdata()
        }
    }, [searchWord])
    console.log(books);

    const searchBooks = searchWord ? books.filter((book) => {
        const name = book.name.toLowerCase()
        const author = book.author.toLowerCase()
        const searchWordLower = searchWord.toLowerCase()
       return name.includes(searchWordLower) || author.includes(searchWordLower)
    }) : []

    console.log(searchBooks);
    const displayBooks = searchBooks.length > 0 ? searchBooks : []
    

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
                                {displayBooks.length > 0 ? (
                                    displayBooks.map((book) => {
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
                                                                Thêm vào giỏ hàng
                                                            </a>
                                                        </div>
                                                        <div className="product-overlay">
                                                            <div className="overlay-content">
                                                                <Link to={'/product-detail'} state={{bookId: book.id, categoryId: book.categories_id}}>
                                                                    <h2>{book.price} VND</h2>
                                                                    <p>{book.name}</p>
                                                                </Link>
                                                                <a href="#" className="btn btn-default add-to-cart">
                                                                    <i className="fa fa-shopping-cart" />
                                                                    Thêm vào giỏ hàng
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="col-sm-12">
                                        <h2 style={{textAlign: 'center'}}>Không tìm thấy kết quả</h2>
                                    </div>
                                )}
                                
                                
                                <ul style={{display: 'flex', justifyContent: 'center'}} className="pagination">
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



export default BookBySearch;