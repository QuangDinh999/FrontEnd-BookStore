import React from 'react';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Register() {
    const [register, setRegister] = useState({
        username: '',
        email: '',
        address: '',
        phoneNumber: '',
        password: '',
        role: 'user'
    })
    
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost/BackEnd-Laravel-BookStore/public/api/auth/register'
                , register)
            console.log(response.data.token);
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Header />
            <section id="form">
                {/*form*/}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-sm-offset-1">
                            <div className="signup-form">
                                
                                <h2>Đăng ký người dùng mới!</h2>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" required placeholder="Tên tài khoản"
                                    onChange={e => setRegister({
                                        ...register,
                                        username: e.target.value

                                    })}
                                    value={register.username}
                                    />
                                    <input type="email" required placeholder="email" autocomplete="email"
                                    onChange={e => setRegister({
                                        ...register,
                                        email: e.target.value
                                        
                                    })}
                                    value={register.email}
                                    />
                                    <input type="text" required placeholder="Địa chỉ giao nhận" 
                                    onChange={e => setRegister({
                                        ...register,
                                        address: e.target.value
                                        
                                    })}
                                    value={register.address}
                                    />
                                    <input type="text" required placeholder="Số điện thoại" 
                                    onChange={e => setRegister({
                                        ...register,
                                        phoneNumber: e.target.value
                                        
                                    })}
                                    value={register.phoneNumber}
                                    />
                                    <input type="password" required placeholder="Mật khẩu" autocomplete="email"
                                    onChange={e => setRegister({
                                        ...register,
                                        password: e.target.value
                                        
                                    })}
                                    value={register.password}
                                    />
                                    {/* <input type="password" placeholder="Nhập lại mật khẩu" /> */}
                                    <button type="submit" className="btn btn-default">
                                        Đăng ký
                                    </button>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
            {/*/form*/}
            <Footer />
        </>

    )
}

export default Register;