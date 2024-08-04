import React, { useEffect, useState } from 'react';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { Link } from 'react-router-dom';
import formatCurrency from '../../asset/formatprice';
import axios from 'axios';
function Cart() {
    const [cartitems, setCartItems] = useState([])
    const [updateitem, setUpdateItem] = useState({})
    var total = 0
    useEffect(() => {
        const fetchData = async () => {
           try {
            const CartitemsRes = await axios.get('http://localhost/BackEnd-Laravel-BookStore/public/api/home/cartitems');
            setCartItems(CartitemsRes.data)
            console.log(CartitemsRes.data);
           } catch (error) {
                console.log(error);
           }
        }
        fetchData()
    }, [])
    


 
    const newCartItems = [...cartitems];
    const handleIncrement = (index) => {
        newCartItems[index].amount += 1;
        setCartItems(newCartItems);
        setUpdateItem(cartitems[index])
    };
    const handleDecrement = (index) => {
        if(newCartItems[index].amount > 1) {
            newCartItems[index].amount -= 1;
            setCartItems(newCartItems);
            setUpdateItem(cartitems[index])
        } else if (newCartItems[index].amount = 1) {
            newCartItems[index].amount -= 1;
            setCartItems(newCartItems)
            setUpdateItem(cartitems[index])
            newCartItems.splice(index, 1)
        } 
        else {
            alert('so luong san pham dang la 0')
        }
    };
    const handleDelete = (index) => {
        newCartItems[index].amount = 0;
        setCartItems(newCartItems)
        setUpdateItem(cartitems[index])
        newCartItems.splice(index, 1)
    }

    useEffect(() => {
        const fetchData = async () => {
           try {
            
            const res = await axios.put('http://localhost/BackEnd-Laravel-BookStore/public/api/home/cartitems/update', 
                updateitem);
            console.log(res.data);
           } catch (error) {
                console.log(error);
           }
        }
        fetchData()
    }, [cartitems])

    console.log(updateitem);
    console.log(cartitems);
    
    return (
        <>
            <Header />
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li>
                                <Link to={'/'}>Trang chủ</Link>
                            </li>
                            <li className="active">Giỏ hàng</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Sản phẩm</td>
                                    <td className="description" />
                                    <td className="price">Giá tiền</td>
                                    <td className="quantity">Số lượng</td>
                                    <td className="total">Tổng giá</td>
                                    <td />
                                </tr>
                            </thead>
                            <tbody>
                                {cartitems.map((cartitem, index) => {
                                    total+=cartitem.book.price * cartitem.amount
                                    return (
                                        <tr key={index}>
                                            <td className="cart_product">
                                                <a href="">
                                                    <img width={'100px'} src={"images/img/" + cartitem.book.img} alt="" />
                                                </a>
                                            </td>
                                            <td className="cart_description">
                                                <h4>
                                                    <a href="">{cartitem.book.name}</a>
                                                </h4>
                                                <p>{cartitem.book.isbn}</p>
                                            </td>
                                            <td className="cart_price">
                                                <p>{formatCurrency(cartitem.book.price)} VNĐ</p>
                                            </td>
                                            <td className="cart_quantity">
                                                <div className="cart_quantity_button">
                                                <button className='btn-updown' onClick={() => handleDecrement(index)}>-</button>
                                                    <span className="cart_quantity_display">{cartitem.amount}</span>
                                                    <button className='btn-updown' onClick={() => handleIncrement(index)}>+</button>
                                                </div>
                                            </td>
                                            <td className="cart_total">
                                                <p className="cart_total_price">{formatCurrency(cartitem.book.price * cartitem.amount)} VNĐ</p>
                                            </td>
                                            <td className="cart_delete">
                                                {/* <a className="cart_quantity_delete" href="">
                                                <i className="fa fa-times" />
                                                </a> */}
                                                <button onClick={() => {handleDelete(index)}} className="cart_quantity_delete">
                                                    <i className="fa fa-times" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>{" "}
            {/*/#cart_items*/}
            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>Giá Tiền Tạm Tính</h3>
                        <p>
                            Xin vui lòng kiểm tra lại các thông tin chi tiết và tiến hành thanh toán cho đơn hàng.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="total_area">
                                <ul>
                                    <li>
                                        <h4>Tổng tiền</h4> <h4 className='total_price'>{formatCurrency(total)} VNĐ</h4>
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href="">
                                    Cập nhập
                                </a>
                                <Link to={'/checkout'} className="btn btn-default check_out">
                                    Xác nhận
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*/#do_action*/}
            <Footer />
        </>

    )
}

export default Cart;