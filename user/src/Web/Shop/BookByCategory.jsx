import React from 'react';
import Header from '../../Component/Header';
import Sidebar from '../../Component/Sidebar';
import Footer from '../../Component/Footer';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import formatCurrency from '../../asset/formatprice';
import ReactPaginate from 'react-paginate';

const itemsPerPage = 2; 

function BookByCategory() {
    const location = useLocation()
    const {categoryId} = location.state || {}

    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

    const pageCount = Math.ceil(books.length / itemsPerPage);
    
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
                            <div className="features_items" style={{textAlign: 'center'}}>
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
                                                            <h2>{formatCurrency(book.price)} VNĐ</h2>
                                                            <p>{book.name}</p>
                                                        </Link>
                                                        <button href="" onClick={() => handleCartItem(book.id, 1)} className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Thêm vào giỏ hàng
                                                        </button>
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
                                
                                
                                <ReactPaginate
                                    previousLabel={'«'}
                                    nextLabel={'»'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                />
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