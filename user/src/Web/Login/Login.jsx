import React from 'react';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://BackEnd-Laravel-BookStore/public/api/auth/login'
                , {email, password})
            localStorage.clear();
            localStorage.setItem('tokenUser', response.data.token)
            localStorage.setItem('user', response.data.user)
            console.log(response.data.token);
            navigate('/')
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
                            <div className="login-form">
                                {/*login form*/}
                                <h2>Đăng nhập vào tài khoản của bạn</h2>
                                <form onSubmit={handleSubmit}>
                                    <input type="email" autoComplete="email" placeholder="Email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}/>
                                    <input type="password" autoComplete="current-password" placeholder="Password"
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)}/>
                                    {/* <span>
                                        <input type="checkbox" className="checkbox" />
                                        Keep me signed in
                                    </span> */}
                                    <button type="submit"  className="btn btn-default">
                                        Đăng nhập
                                    </button>
                                </form>
                            </div>
                            {/*/login form*/}
                        </div>
                        {/* <div className="col-sm-1">
                            <h2 className="or">OR</h2>
                        </div>
                        <div className="col-sm-4">
                            <div className="signup-form">
                                
                                <h2>Đăng ký người dùng mới!</h2>
                                <form action="#">
                                    <input type="text" placeholder="Tên tài khoản" />
                                    <input type="email" placeholder="Địa chỉ email" />
                                    <input type="password" placeholder="Mật khẩu" />
                                    <input type="password" placeholder="Nhập lại mật khẩu" />
                                    <button type="submit" className="btn btn-default">
                                        Đăng ký
                                    </button>
                                </form>
                            </div>
                            
                        </div> */}
                    </div>
                </div>
            </section>
            {/*/form*/}
            <Footer />
        </>

    )
}

export default Login;