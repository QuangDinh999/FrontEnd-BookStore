import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import formatCurrency from '../../asset/formatprice';


function Checkout() {
    const [cartitems, setCartItems] = useState([])
    const [payments, setPayment] = useState([])
    const [total, setTotal] = useState(0)
    const [selectedPayment, setSelectedPayment] = useState('Chưa Chọn');

    
    console.log();

    const [customer, setCustomer] = useState({
        customer_id: JSON.parse(localStorage.getItem('user')).id,
        name: "",
        phoneNumber: "",
        address: "", 
        order_note: "",
        cartitems: "",
        totalPrice: 0
    })

    useEffect(() => {
        let newTotal = 0
        cartitems.forEach((cartitem) => {
            newTotal+=cartitem.book.price * cartitem.amount
        })
        setTotal(newTotal)
        setCustomer((prevCustomer) => (
            {
                ...prevCustomer,
                totalPrice: total
            }
        ))
    }, [cartitems])

    console.log(total);
    useEffect(() => {
        const fetchData = async () => {
            try {
                    const CartitemsRes = await axios.get('http://localhost/BackEnd-Laravel-BookStore/public/api/home/cartitems');
                    const PaymentRes = await axios.get('http://localhost/BackEnd-Laravel-BookStore/public/api/payment');
                    setCartItems(CartitemsRes.data)

                    setCustomer({
                        ...customer,
                        cartitems: CartitemsRes.data
                    })

                    setPayment(PaymentRes.data)
                }
            catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    
    console.log(customer);

    const handlePayment = async () => {
        switch (selectedPayment) {
            case "VNPAY ATM":
                try {
                    console.log(customer.totalPrice, customer.cartitems);  
                    const response = await axios.post(`http://localhost/BackEnd-Laravel-BookStore/public/api/vnpay`, customer);
                    console.log(response,response.data);
                    window.location.href = response.data.url;
                } catch (error) {
                    console.error('Payment error', error);
                }
                break;
            case "COD":
                try {
                    const response = await axios.post(`http://localhost/BackEnd-Laravel-BookStore/public/api/cod`, customer);
                    console.log(response,response.data);
                } catch (error) {
                    console.error('Payment error', error);
                }
            default:
                break;
        }
    };

    const checkPayment = () => {
        if(selectedPayment === 'Chưa Chọn') {
             alert('Chua chon pttt')
        }else {
            handlePayment();
        }
        
    }


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
                            <li className="active">Xác nhận thanh toán</li>
                        </ol>
                    </div>
                    
                    <div className="shopper-informations">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="shopper-info">
                                        <form>
                                            <p>Shopper Information</p>
                                            <input
                                            value={customer.name}
                                            onChange={e => setCustomer({
                                                ...customer,
                                                name: e.target.value
                                            })}
                                            placeholder="Họ Tên Người Nhận Hàng" />
                                            <input
                                            value={customer.phoneNumber}
                                            onChange={e => setCustomer({
                                                ...customer,
                                                phoneNumber: e.target.value
                                            })}
                                            placeholder="Số Điện thoại người Nhận" />
                                            <input
                                            value={customer.address}
                                            onChange={e => setCustomer({
                                                ...customer,
                                                address: e.target.value
                                            })} 
                                            placeholder="Địa Chỉ GIao Hàng" />
                                            <h4>Phương Thức Thanh Toán</h4>
                                            <div className="payment-options" style={{marginTop: '25px'}}>
                                                {payments.map(payment => {
                                                    return(
                                                        <span key={payment.id}>
                                                            <label>
                                                                <input type="checkbox"
                                                                checked={selectedPayment === payment.name}
                                                                onChange={() => {
                                                                    setSelectedPayment(payment.name)
                                                                    setCustomer({
                                                                        ...customer,
                                                                        payment_id: payment.id
                                                                    })
                                                                }}
                                                                /> {payment.name}
                                                            </label>
                                                        </span>
                                                    )
                                                })}
                                            </div> 
                                            <button type='submit' className="btn btn-primary">Xác Nhận</button>
                                        </form>
                                    </div>
                                </div>
                                
                                <div className="col-sm-8">
                                    <div className="order-message">
                                        <p>Shipping Order</p>
                                        <textarea
                                            onChange={(e) => setCustomer({
                                                ...customer,
                                                order_note: e.target.value
                                            })}
                                            name="message"
                                            placeholder="Notes about your order, Special Notes for Delivery"
                                            rows={16}
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </div>
                           
                    </div>
                    <div className="review-payment">
                        <h2>Xem xét &amp; Thanh toán</h2>
                    </div>
                    <div className="table-responsive cart_info">
                        <table style={{textAlign: 'center'}} className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Sản phẩm</td>
                                    <td className="description" >Tên sản phẩm</td>
                                    <td className="price">Giá</td>
                                    <td className="quantity">Số lượng</td>
                                    <td className="total">Tổng giá</td>
                                    <td/>
                                </tr>
                            </thead>
                            <tbody >
                            {cartitems.map((cartitem) => {
                                    return (
                                        
                                        <tr key={cartitem.id}>
                                            <td className="cart_product">
                                                <a href="">
                                                    <img style={{float: 'left'}} width={'100px'} src= {"images/img/" + cartitem.book.img} alt="" />
                                                </a>
                                            </td>
                                            <td className="cart_description">
                                                <h4>
                                                    <a href="">{cartitem.book.name}</a>
                                                </h4>
                                                <p>{cartitem.book.ISBN}</p>
                                            </td>
                                            <td className="cart_price">
                                                <p>{formatCurrency(cartitem.book.price)} VND</p>
                                            </td>
                                            <td className="cart_quantity">
                                                <div className="cart_quantity_button">
                                                    
                                                <span className="cart_quantity_display">{cartitem.amount}</span>
                                                    
                                                </div>
                                            </td>
                                            <td className="cart_total">
                                                <p className="cart_total_price">{formatCurrency(cartitem.book.price * cartitem.amount)} VNĐ</p>
                                            </td>
                                            
                                        </tr>   
                                    )
                            })}
                            
                                
                                <tr>
                                    <td colSpan={4}>&nbsp;</td>
                                    <td colSpan={2}>
                                        <table className="table table-condensed total-result">
                                            <tbody>
                                                <tr>
                                                    <td>Phương thức thanh toán</td>
                                                    <td><span>{selectedPayment}</span></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                </tr>
                                                
                                                <tr>
                                                    <td><h3>Tổng tiền</h3></td>
                                                    <td>
                                                        <span><h3>{formatCurrency(total)} VNĐ</h3></span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    
                        <div className="payment-options">
                            <button className="btn btn-default" onClick={checkPayment} style={{backgroundColor: 'orange', width: '150px', height: '40px', border: 'none', float: 'right'}}>
                                    Mua ngay
                            </button>
                        </div>
                    
                </div>
            </section>{" "}
            {/*/#cart_items*/}
            <Footer />
        </>

    )
}


export default Checkout;