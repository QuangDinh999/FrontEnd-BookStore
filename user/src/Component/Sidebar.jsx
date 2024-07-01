import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Sidebar() {

    const [categories, setCategory] = useState([])
    const [publishers, setPublisher] = useState([])
    
    useEffect(() => {
        const fetchdata = async () =>{
            try {
                const category = await axios.get("http://localhost/BackEnd-Laravel-BookStore/public/api/categories")
                setCategory(category.data)

                const publisher = await axios.get("http://localhost/BackEnd-Laravel-BookStore/public/api/publisher")
                setPublisher(publisher.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchdata()
    }, [])

    return (
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Danh mục</h2>
                <div className="panel-group category-products" id="accordian">
                    {/*category-productsr*/}
                    {categories.map((category) => {
                        return (
                            <div key={category.id} className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                    <Link to="/BookByCategory" state={{ categoryId: category.id }}>
                                        {category.name}
                                    </Link>
                                    </h4>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
                {/*/category-products*/}
                <div className="brands_products">
                    {/*brands_products*/}
                    <h2>Nhà xuất bản</h2>
                    <div className="panel-group category-products" id="accordian">
                    {publishers.map((publihser) => {
                        return (
                            <div key={publihser.id} className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                    <Link to="/BookByPublisher" state={{ publisherId: publihser.id }}>
                                        {publihser.name}
                                    </Link>
                                    </h4>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
                </div>
                <div className="shipping text-center">
                    {/*shipping*/}
                    <img style={{width: '260px'}} src={'images/home/sub_banner.jpg'} alt="" />
                </div>
                <div className="shipping text-center">
                    {/*shipping*/}
                    <img style={{width: '260px'}} src={'images/home/sub_banner1.jpg'} alt="" />
                </div>
                {/*/shipping*/}
            </div>
        </div>
    )
}


export default Sidebar;