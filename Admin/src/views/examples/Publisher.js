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


  const Publisher = () => {
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/PHP_Book_Laravel-main/public/api/publisher');
        setPublishers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    // ADD

    const [modal, setModal] = useState(false);
    const [data, setData] = useState({
      'name': '',
      'phoneNumber': ''
    });

    
    const [errorMessage, setErrorMessage] = useState('');
  
    const toggleModal = () => {
      setData({
        name: '',
        phoneNumber: ''
      });
      setModal(!modal);
    };

    const addPublisher = async () => {
      try {
        await axios.post('http://localhost/PHP_Book_Laravel-main/public/api/publisher/add', data);
        setData({
          name: '',
          phoneNumber: ''
        });
        setErrorMessage('');
        fetchData();
        toggleModal(); // Close the modal after successful addition
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Handle validation errors
          console.error('Validation errors:', error.response.data.errors);
          setErrorMessage(Object.values(error.response.data.errors).flat().join('\n'));
          setShowPopup(false); // Show the popup
  
          // Clear the error message after 3 seconds
          setTimeout(() => {
            setErrorMessage('');

          }, 3000);
        } else {
          console.error('Error adding publisher:', error);
        }
      }
    };


    // Edit 
    const [showPopup, setShowPopup] = useState(false);
    const [publisherData, setPublisherData] = useState({
      name: '',
      phoneNumber: '',
    });
    const [editedData, setEditedData] = useState({
      name: '',
      phoneNumber: '',
    });
  
    const fetchDataById = async (publisherId) => {
      try {
        const response = await axios.get(`http://localhost/PHP_Book_Laravel-main/public/api/publisher/edit/${publisherId}`);
        setShowPopup(true);
        setPublisherData(response.data);
        setEditedData(response.data); // Set edited data with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const handleEdit = async () => {
      try {
        // Send edited data to API for updating
        await axios.put(`http://localhost/PHP_Book_Laravel-main/public/api/publisher/update/${publisherData.id}`, editedData);
        // Close popup and reset state
        setShowPopup(false);
        setPublisherData({
          name: '',
          phoneNumber: '',
        });
        setEditedData({
          name: '',
          phoneNumber: '',
        });
        setErrorMessage(''); 
        fetchData();
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Handle validation errors
          console.error('Validation errors:', error.response.data.errors);
          setErrorMessage(Object.values(error.response.data.errors).flat().join('\n'));
          setShowPopup(true); // Show the popup
  
          // Clear the error message after 3 seconds
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        } else {
          console.error('Error adding publisher:', error);
        }
      }
    };

    // Delete
    const deletePublisher = async (publisherId) => {
      try {
        await axios.delete(`http://localhost/PHP_Book_Laravel-main/public/api/publisher/delete/${publisherId}`);
        // After successful deletion, refresh the publisher list or perform other actions
        fetchData();
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
        name: 'PhoneNumber',
        selector: row => row.phoneNumber,
        sortable: true,
      },
      {
        name: 'Actions',
        cell: row => (
          <div>
            <button className="button-edit" onClick={() => fetchDataById(row.id)} style={{ marginRight: '10px' }}>Sửa</button>
            <button className="button-delete" onClick={() => deletePublisher(row.id)}>Xóa</button>
          </div>
        ),
      }
    ];
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0" style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: "1" }}>
                      <h3 className="mb-0" style={{ paddingBottom: "10px" }}>Quản lý nhà xuất bản</h3>
                    </div>
                    <div>
                      <a className="btn btn-success" onClick={toggleModal}>Thêm nhà xuất bản</a>
                    </div>
                </CardHeader>
                <DataTable
                  columns={columns}
                  data={publishers}
                  progressPending={loading}
                  pagination
                />
              </Card>
            </div>
          </Row>
        </Container>

        {/* Modal để thêm nhà xuất bản mới */}
        <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader style={{paddingBottom: "0px"}} toggle={toggleModal}><h2>Thêm nhà xuất bản</h2></ModalHeader>
        <ModalBody style={{paddingTop: "0px"}}>
          <FormGroup>
                {errorMessage && (
                <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                  {errorMessage}
                </div>
              )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Tên nhà xuất bản</Label>
            <Input type="text" name="name" id="name" value={data.name} onChange={(e) => setData(prevdata => ({
              ...prevdata,
              name: e.target.value
            }))} />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Số điện thoại</Label>
            <Input type="text" name="phoneNumber" id="phoneNumber" value={data.phoneNumber} onChange={(e) => setData(prevdata => ({
              ...prevdata,
              phoneNumber: e.target.value
            }))} />
          </FormGroup>
          
        </ModalBody>
        <ModalFooter style={{paddingTop: "0px"}}>
          <Button color="primary" onClick={addPublisher}>Thêm</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showPopup} toggle={() => setShowPopup(false)}>
        <ModalHeader style={{paddingBottom: "0px"}} toggle={() => setShowPopup(false)}><h2>Sửa nhà xuất bản</h2></ModalHeader>
        <ModalBody>
        <FormGroup>
            {errorMessage && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                {errorMessage}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Tên nhà xuất bản</Label>
            <Input type="text" name="name" id="name" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="phone_number">Số điện thoại</Label>
            <Input type="text" name="phone_number" id="phone_number" value={editedData.phoneNumber} onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })} />
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
  
  export default Publisher;
  