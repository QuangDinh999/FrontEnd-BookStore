import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import formatCurrency from '../../asset/formatprice';


function Checkout() {
    const [cartitems, setCartItems] = useState([])
    const [customer, setCustomer] = useState({
        name: "",
        phoneNumber: "",
        address: ""
    })

    const [selectedPayment, setSelectedPayment] = useState('Chưa Chọn');

    const HandleCustomerInfo = (e) => {
        e.preventDefault()
        console.log(customer);
        if( localStorage.getItem('customerInfo')) {
            localStorage.removeItem('customerInfo')
        }
        localStorage.setItem('customerInfo', JSON.stringify(customer))
    }

    console.log(localStorage.getItem('customerInfo'));
    var total = 0
    useEffect(() => {
        const fetchData = async () => {
            try {
                    const response = await axios.get('http://localhost/BackEnd-Laravel-BookStore/public/api/home/cartitems');
                    setCartItems(response.data)
                    console.log(response.data);
                }
            catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    console.log(cartitems);


    const handlePayment = async () => {
        switch (selectedPayment) {
            case "VNPAY":
                try {
                    const config = {
                        headers: {
                          "Access-Control-Allow-Origin": "*",
                          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                        }
                      };
                    const response = await axios.post(`http://localhost/BackEnd-Laravel-BookStore/public/api/home/vnpay/${total}`);
                    window.location.href = response.data.url;
                    // console.log(response,response.data.url);
                } catch (error) {
                    console.error('Payment error', error);
                }
                break;
        
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

    console.log(JSON.parse(localStorage.getItem('customerInfo')));
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
                    {/*/breadcrums*/}
                    {/* <div className="step-one">
                        <h2 className="heading">Step1</h2>
                    </div>
                    <div className="checkout-options">
                        <h3>New User</h3>
                        <p>Checkout options</p>
                        <ul className="nav">
                            <li>
                                <label>
                                    <input type="checkbox" /> Register Account
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" /> Guest Checkout
                                </label>
                            </li>
                            <li>
                                <a href="">
                                    <i className="fa fa-times" />
                                    Cancel
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="register-req">
                        <p>
                            Please use Register And Checkout to easily get access to your order
                            history, or use Checkout as Guest
                        </p>
                    </div> */}
                    {/*/register-req*/}
                    <div className="shopper-informations">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="shopper-info">
                                    <p>Shopper Information</p>
                                    <form onSubmit={HandleCustomerInfo}>
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
                                        <button type='submit' className="btn btn-primary">Xác Nhận</button>
                                    </form>
                                </div>
                            </div>
                            {/* <div className="col-sm-5 clearfix">
                                <div className="bill-to">
                                    <p>Bill To</p>
                                    <div className="form-one">
                                        <form>
                                            <input type="text" placeholder="Company Name" />
                                            <input type="text" placeholder="Email*" />
                                            <input type="text" placeholder="Title" />
                                            <input type="text" placeholder="First Name *" />
                                            <input type="text" placeholder="Middle Name" />
                                            <input type="text" placeholder="Last Name *" />
                                            <input type="text" placeholder="Address 1 *" />
                                            <input type="text" placeholder="Address 2" />
                                        </form>
                                    </div>
                                    <div className="form-two">
                                        <form>
                                            <input type="text" placeholder="Zip / Postal Code *" />
                                            <select>
                                                <option>-- Country --</option>
                                                <option>United States</option>
                                                <option>Bangladesh</option>
                                                <option>UK</option>
                                                <option>India</option>
                                                <option>Pakistan</option>
                                                <option>Ucrane</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                            <select>
                                                <option>-- State / Province / Region --</option>
                                                <option>United States</option>
                                                <option>Bangladesh</option>
                                                <option>UK</option>
                                                <option>India</option>
                                                <option>Pakistan</option>
                                                <option>Ucrane</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                            <input type="password" placeholder="Confirm password" />
                                            <input type="text" placeholder="Phone *" />
                                            <input type="text" placeholder="Mobile Phone" />
                                            <input type="text" placeholder="Fax" />
                                        </form>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-sm-8">
                                <div className="order-message">
                                    <p>Shipping Order</p>
                                    <textarea
                                        name="message"
                                        placeholder="Notes about your order, Special Notes for Delivery"
                                        rows={16}
                                        defaultValue={""}
                                    />
                                    <label>
                                        <input type="checkbox" /> Shipping to bill address
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="review-payment">
                        <h2>Xem xét &amp; Thanh toán</h2>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Sản phẩm</td>
                                    <td className="description" />
                                    <td className="price">Giá</td>
                                    <td className="quantity">Số lượng</td>
                                    <td className="total">Tổng giá</td>
                                    <td />
                                </tr>
                            </thead>
                            <tbody>
                            {cartitems.map((cartitem) => {
                                total+=cartitem.book.price * cartitem.amount
                                    return (
                                        
                                        <tr key={cartitem.id}>
                                            <td className="cart_product">
                                                <a href="">
                                                    <img width={'100px'} src= {"images/img/" + cartitem.book.img} alt="" />
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
                                                    <a className="cart_quantity_up" href="">
                                                        {" "}
                                                        +{" "}
                                                    </a>
                                                    <input
                                                        className="cart_quantity_input"
                                                        type="text"
                                                        name="quantity"
                                                        defaultValue={cartitem.amount}
                                                        autoComplete="off"
                                                        size={2}
                                                    />
                                                    <a className="cart_quantity_down" href="">
                                                        {" "}
                                                        -{" "}
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="cart_total">
                                                <p className="cart_total_price">{formatCurrency(cartitem.book.price * cartitem.amount)} VNĐ</p>
                                            </td>
                                            <td className="cart_delete">
                                                <a className="cart_quantity_delete" href="">
                                                    <i className="fa fa-times" />
                                                </a>
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
                                                    <td>{selectedPayment}</td>
                                                </tr>
                                                <tr>
                                                    <td>$59</td>
                                                </tr>
                                                {/* <tr>
                                                    <td>Exo Tax</td>
                                                    <td>$2</td>
                                                </tr>
                                                <tr className="shipping-cost">
                                                    <td>Shipping Cost</td>
                                                    <td>Free</td>
                                                </tr> */}
                                                <tr>
                                                    <td>Tổng tiền</td>
                                                    <td>
                                                        <span>{formatCurrency(total)} VNĐ</span>
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
                        <span>
                            <label>
                                <input type="checkbox"
                                checked={selectedPayment === 'COD'}
                                onChange={() => setSelectedPayment('COD')}
                                /> COD
                            </label>
                        </span>
                        <span>
                            <label>
                                <input type="checkbox" 
                                checked={selectedPayment === 'VNPAY'}
                                onChange={() => setSelectedPayment('VNPAY')}
                                /> VNPAY ATM
                            </label>
                        </span>
                    
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