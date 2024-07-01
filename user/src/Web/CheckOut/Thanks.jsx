import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { Link } from 'react-router-dom';
import formatCurrency from '../../asset/formatprice';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Thanks() {
    const location = useLocation();
    const [apiCalled, setApiCalled] = useState(false)
    useEffect(() => {
        const param = new URLSearchParams(location.search)
        if(!(param == "")) {
            const Amount = param.get('vnp_Amount')
            const vnp_Amount = Amount.substring(0, Amount.length - 2);
            const vnp_transactionCode = param.get('vnp_BankTranNo')
            const vnp_ResponseCode  = param.get('vnp_ResponseCode')
            const customerInfo = JSON.parse(localStorage.getItem('customerInfo'))

            const orderInfo = {
                'vnp_Amount': vnp_Amount,
                'vnp_transactionCode': vnp_transactionCode,
                'vnp_ResponseCode': vnp_ResponseCode,
                ...customerInfo
             }
            console.log(orderInfo);
            // if (vnp_ResponseCode == '00' && !apiCalled) {
            //     const fetchData = async () => {
            //         try {
            //                 const response = await axios.get('http://localhost/BackEnd-Laravel-BookStore/public/api/home/cartitems');
            //                 setApiCalled(true)
            //                 console.log(response.data);
            //             }
            //         catch (error) {
            //             console.log(error);
            //         }
            //     }
            //     fetchData()
            // }
        }else {

        }
        

    }, [location])


    return (
        <>
            <Header />
            Thanks
            {/*/#cart_items*/}
            <Footer />
        </>

    )
}


export default Thanks;