/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import React, { useState, useEffect } from 'react';
  import DataTable from 'react-data-table-component';
  import axios from 'axios';
  
  const Tables = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/BackEnd-Laravel-BookStore/public/api/book');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);


    // List Pubsiher
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost/PHP_Book_Laravel-main/public/api/publisher');
          setPublishers(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    // List Category
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost/PHP_Book_Laravel-main/public/api/categories');
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    // Add
    const [modal, setModal] = useState(false);
    const [isbn, setIsbn] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [author, setAuthor] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [publish_year, setPublishYear] = useState('');
    const [category_id, setCategoryId] = useState('');
    const [publisher_id, setPublisherId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [previewImg, setPreviewImg] = useState('');

    const toggleModal = () => {
      setIsbn('984233-32478-3')
        setName('');
        setAmount('');
        setPrice('');
        setAuthor('');
        setImg(null);
        setPreviewImg('');
        setDescription('');
        setPublishYear('');
        setCategoryId('');
        setPublisherId('');
        setModal(!modal);
    };

    const addBook = async () => {
        try {
            console.log(isbn);
            await axios.post('http://localhost/PHP_Book_Laravel-main/public/api/book/add', {
                isbn,
                name,
                price,
                author,
                img,
                amount,
                description,
                publish_year,
                // created_at: new Date().toISOString(),
                category_id,
                publisher_id,
            });
            // Xóa các trường sau khi thêm thành công
            setIsbn('');
            setName('');
            setAmount('');
            setPrice('');
            setAuthor('');
            setImg('');
            setPreviewImg('');
            setDescription('');
            setPublishYear('');
            setCategoryId('');
            setPublisherId('');
            setErrorMessage('');
            fetchData();
            toggleModal(); // Đóng modal sau khi thêm thành công
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    // Xử lý lỗi trùng lặp
                    setErrorMessage('Sản phẩm đã tồn tại.');
                } else if (error.response.status === 422) {
                    // Xử lý lỗi xác thực
                    console.error('Lỗi xác thực:', error.response.data.errors);
                    setErrorMessage(Object.values(error.response.data.errors).flat().join('\n'));
                } else {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                    setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
                }
                // Xóa thông báo lỗi sau 3 giây
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            } else {
                console.error('Lỗi khi thêm sản phẩm:', error);
                setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
            }
        }
    };

    const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (file) {
              setImg(file.name); // Set the file object
              const reader = new FileReader();
              reader.onloadend = () => {
                  setPreviewImg(reader.result); // Set the preview image URL
              };
              reader.readAsDataURL(file);
          } else {
              // Clear img state if no file selected
              setImg(null);
              setPreviewImg('');
          }
      };

      // Edit
    const [showPopup, setShowPopup] = useState(false);
    const [Data, setData] = useState(null);
    const [editedData, setEditedData] = useState({
      isbn: '',
      name: '',
      amount: '',
      price: '',
      author: '',
      img: '',
      description: '',
      publish_year: '',
      category_id: '',
      publisher_id: '',
  });

    const fetchDataById = async (id) => {
        try {
          const response = await axios.get(`http://localhost/PHP_Book_Laravel-main/public/api/book/edit/${id}`);
          setShowPopup(true);
          setData(response.data);
          setEditedData(response.data); // Set edited data with fetched data
          setPreviewImg('');
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const handleEdit = async () => {
        try {
          // Send edited data to API for updating
          await axios.put(`http://localhost/PHP_Book_Laravel-main/public/api/book/update/${Data.id}`, {
            ...editedData,
            img: editedData.img, // Send only the file name, not the temporary URL
        });
          // Close popup and reset state
          setShowPopup(false);
          setData(null);
          setEditedData({});
          setPreviewImg('');
          setErrorMessage(''); 
          fetchData();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Hiển thị thông báo lỗi từ phản hồi của server
                setErrorMessage(error.response.data.message);
                // Đặt hẹn giờ để xóa thông báo sau 3 giây
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            } else {
                // Xử lý các loại lỗi khác
                console.error('Lỗi khi cập nhật thông tin danh mục:', error);
            }
        }
      };

      const handleEditFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Set the file name
            setEditedData({ ...editedData, img: file.name });
            // Set the preview image URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImg('');
        }
    };
    

      // Delete
      const deleteData = async (id) => {
        try {
        await axios.delete(`http://localhost/PHP_Book_Laravel-main/public/api/book/delete/${id}`);
        // After successful deletion, refresh the publisher list or perform other actions
        fetchData();
        } catch (error) {
        console.error('Error deleting publisher:', error);
        }
      };


  
      const columns = [
        {
          name: 'Hình ảnh',
          selector: row => (
            <img src={require(`../../assets/img/product/${row.img}`)} width={'90px'} height={'120px'} alt={row.name} />
          ),
          sortable: false, // Hình ảnh không cần sắp xếp
        },
        {
          name: 'Isbn',
          selector: row => row.ISBN,
          sortable: true,
        },
        {
          name: 'Tên sách',
          selector: row => row.name,
          sortable: true,
        },
        {
          name: 'Số lượng sách',
          selector: row => row.amount,
          sortable: true,
        },
        {
          name: 'Giá sách',
          selector: row => `${row.price.toLocaleString('vi-VN')} VND`,
          sortable: true,
        },
        // {
        //   name: 'Tác giả',
        //   selector: row => row.author,
        //   sortable: true,
        // },
        {
          name: 'Năm xuất bản',
          selector: row => row.publish_year,
          sortable: true,
        },
        {
          name: 'Nhà sản xuất',
          selector: row => row.publisher.name,
          sortable: true,
        },
        {
          name: 'Danh mục',
          selector: row => row.category.name,
          sortable: true,
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <button className="button-edit" onClick={() => fetchDataById(row.id)} style={{ marginRight: '10px' }}>Sửa</button>
              <button className="button-delete" onClick={() => deleteData(row.id)}>Xóa</button>
            </div>
          ),
        }
      ];
      
    
    return (
      <>
        <Header />
          {/* Page content */}
          <Container className="mt--7" fluid>
            {/* Table */}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0" style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: "1" }}>
                      <h3 className="mb-0" style={{ paddingBottom: "10px" }}>Quản lý sách</h3>
                    </div>
                    <div>
                      <a className="btn btn-success" onClick={toggleModal}>Thêm sách</a>
                    </div>
                  </CardHeader>
                    <DataTable
                      columns={columns}
                      data={books}
                      progressPending={loading}
                      pagination
                    />
                </Card>
              </div>
            </Row>
          </Container>

          <Modal isOpen={modal} toggle={toggleModal} className="modal-lg">
            <ModalHeader style={{ paddingBottom: "0px" }} toggle={toggleModal}><h2>Thêm sách mới</h2></ModalHeader>
            <ModalBody style={{ paddingTop: "0px" }}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="isbn">ISBN</Label>
                    <Input type="text" name="isbn" id="isbn" value={isbn} 
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount">Số lượng</Label>
                    <Input type="text" name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="author">Tác giả</Label>
                    <Input type="text" name="author" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="category_id">Danh mục</Label>
                    <Input type="select" name="category_id" id="category_id" value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                      <option value="">Chọn danh mục</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="name">Tên sách</Label>
                    <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="price">Giá</Label>
                    <Input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="publish_year">Năm xuất bản</Label>
                    <Input type="text" name="publish_year" id="publish_year" value={publish_year} onChange={(e) => setPublishYear(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="publisher_id">Nhà xuất bản</Label>
                    <Input type="select" name="publisher_id" id="publisher_id" value={publisher_id} onChange={(e) => setPublisherId(e.target.value)}>
                      <option value="">Chọn nhà xuất bản</option>
                      {publishers.map(publisher => (
                        <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="img">Hình ảnh</Label><br />
                {previewImg && <img src={previewImg} alt="Preview" style={{ width: '100px', height: '150px' }} />}
                <Input type="file" name="img" id="img" onChange={(e) => handleFileChange(e)} style={{marginTop: "10px"}}/>
              </FormGroup>
              <FormGroup>
                <Label for="description">Mô tả</Label>
                <Input type="textarea" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormGroup>
            </ModalBody>
            <ModalFooter style={{ paddingTop: "0px" }}>
              <Button color="primary" onClick={addBook}>Thêm</Button>
              <Button color="secondary" onClick={toggleModal}>Hủy</Button>
            </ModalFooter>
          </Modal>

          {/* // Edit */}
          <Modal isOpen={showPopup} toggle={() => setShowPopup(false)} className="modal-lg">
            <ModalHeader style={{paddingBottom: "0px"}} toggle={() => setShowPopup(false)}><h2>Sửa sách</h2></ModalHeader>
            <ModalBody style={{ paddingTop: "0px" }}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="isbn">ISBN</Label>
                    <Input type="text" name="isbn" id="isbn" value={editedData.isbn} onChange={(e) => setEditedData({ ...editedData, isbn: e.target.value })} maxLength={10}
                      onInput={(e) => {
                        if (e.target.value.length > 10) {
                          e.target.value = e.target.value.slice(0, 10); // Cắt bớt giá trị nhập vào nếu nó vượt quá 10 ký tự
                        }
                        setEditedData({ ...editedData, isbn: e.target.value });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount">Số lượng</Label>
                    <Input type="text" name="amount" id="amount" value={editedData.amount} onChange={(e) => setEditedData({ ...editedData, amount: e.target.value })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="author">Tác giả</Label>
                    <Input type="text" name="author" id="author" value={editedData.author} onChange={(e) => setEditedData({ ...editedData, author: e.target.value })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="category_id">Danh mục</Label>
                    <Input type="select" name="category_id" id="category_id" value={editedData.category_id} onChange={(e) => setEditedData({ ...editedData, category_id: e.target.value })}>
                      <option value="">Chọn danh mục</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="name">Tên sách</Label>
                    <Input type="text" name="name" id="name" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="price">Giá</Label>
                    <Input type="text" name="price" id="price" value={editedData.price} onChange={(e) => setEditedData({ ...editedData, price: e.target.value })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="publish_year">Năm xuất bản</Label>
                    <Input type="text" name="publish_year" id="publish_year" value={editedData.publish_year} onChange={(e) => setEditedData({ ...editedData, publish_year: e.target.value })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="publisher_id">Nhà xuất bản</Label>
                    <Input type="select" name="publisher_id" id="publisher_id" value={editedData.publisher_id} onChange={(e) => setEditedData({ ...editedData, publisher_id: e.target.value })}>
                      <option value="">Chọn nhà xuất bản</option>
                      {publishers.map(publisher => (
                        <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="img">Hình ảnh</Label><br />
                {previewImg && <img src={previewImg} alt="Preview" style={{ width: '100px', height: '150px' }} />}
                {!previewImg && editedData.img && <img src={require(`../../assets/img/product/${editedData.img}`)} alt="Current" style={{ width: '100px', height: '150px' }} />}
                <Input type="file" name="img" id="img" onChange={handleEditFileChange} style={{marginTop: "10px"}}/>
              </FormGroup>
              <FormGroup>
                <Label for="description">Mô tả</Label>
                <Input type="textarea" name="description" id="description" value={editedData.description} onChange={(e) => setEditedData({ ...editedData, description: e.target.value })} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleEdit}>Cập nhật</Button>{' '}
              <Button color="secondary" onClick={() => setShowPopup(false)}>Hủy</Button>
            </ModalFooter>
          </Modal>


      </>
    );
  };
  
  export default Tables;
  