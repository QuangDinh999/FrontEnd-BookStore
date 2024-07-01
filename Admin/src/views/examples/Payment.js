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
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import DataTable from 'react-data-table-component';
  
  const Payment = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchPaymentMethods = async () => {
        try {
            const response = await axios.get('http://localhost/PHP_Book_Laravel-main/public/api/payment');
            setPaymentMethods(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching the payment methods:', error);
            setLoading(false);
        }
        };

    useEffect(() => {
        fetchPaymentMethods();
    }, []);



    // Add

    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleModal = () => {
        setName('');
        setModal(!modal);
    };

    const addPayment = async () => {
        try {
            await axios.post('http://localhost/PHP_Book_Laravel-main/public/api/payment/add', { name });
            setName('');
            setErrorMessage('');
            fetchPaymentMethods();
            toggleModal(); // Đóng modal sau khi thêm thành công
        } catch (error) {
            if (error.response) {
            if (error.response.status === 409) {
                // Xử lý lỗi trùng lặp
                setErrorMessage('Phương thức thanh toán đã tồn tại.');
            } else if (error.response.status === 422) {
                // Xử lý lỗi xác thực
                console.error('Lỗi xác thực:', error.response.data.errors);
                setErrorMessage(Object.values(error.response.data.errors).flat().join('\n'));
            } else {
                console.error('Lỗi khi thêm phương thức thanh toán:', error);
                setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
            }
            // Xóa thông báo lỗi sau 3 giây
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            } else {
            console.error('Lỗi khi thêm phương thức thanh toán:', error);
            setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
            }
        }
    };

    // Edit
    const [showPopup, setShowPopup] = useState(false);
    const [Data, setData] = useState(null);
    const [editedData, setEditedData] = useState({
      name: '',
    });

    const fetchDataById = async (id) => {
        try {
          const response = await axios.get(`http://localhost/PHP_Book_Laravel-main/public/api/payment/edit/${id}`);
          setShowPopup(true);
          setData(response.data);
          setEditedData(response.data); // Set edited data with fetched data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
     };

     const handleEdit = async () => {
        try {
          // Send edited data to API for updating
          await axios.put(`http://localhost/PHP_Book_Laravel-main/public/api/payment/update/${Data.id}`, editedData);
          // Close popup and reset state
          setShowPopup(false);
          setData(null);
          setEditedData({});
          setErrorMessage(''); 
          fetchPaymentMethods();
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
                console.error('Lỗi khi cập nhật thông tin phương thức thanh toán:', error);
            }
        }
      };

      // Delete
        const deleteData = async (id) => {
            try {
            await axios.delete(`http://localhost/PHP_Book_Laravel-main/public/api/payment/delete/${id}`);
            // After successful deletion, refresh the publisher list or perform other actions
            fetchPaymentMethods();
            } catch (error) {
            console.error('Error deleting publisher:', error);
            }
        };



const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
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
                      <h3 className="mb-0" style={{ paddingBottom: "10px" }}>Quản lý phương thức thanh toán</h3>
                    </div>
                    <div>
                      <a className="btn btn-success" onClick={toggleModal}>Thêm phương thức thanh toán</a>
                    </div>
                </CardHeader>
                <DataTable
                  columns={columns}
                  data={paymentMethods}
                  progressPending={loading}
                  pagination
                />
              </Card>
            </div>
          </Row>
        </Container>

        <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader style={{paddingBottom: "0px"}} toggle={toggleModal}><h2>Thêm phương thức thanh toán</h2></ModalHeader>
        <ModalBody style={{paddingTop: "0px"}}>
          <FormGroup>
                {errorMessage && (
                <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                  {errorMessage}
                </div>
              )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Tên phương thức thanh toán</Label>
            <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormGroup>
        </ModalBody>
        <ModalFooter style={{paddingTop: "0px"}}>
          <Button color="primary" onClick={addPayment}>Thêm</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showPopup} toggle={() => setShowPopup(false)}>
        <ModalHeader style={{paddingBottom: "0px"}} toggle={() => setShowPopup(false)}><h2>Sửa phương thức thanh toán</h2></ModalHeader>
        <ModalBody>
        <FormGroup>
            {errorMessage && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                {errorMessage}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Tên phương thức thanh toán</Label>
            <Input type="text" name="name" id="name" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} />
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
  
  export default Payment;
  