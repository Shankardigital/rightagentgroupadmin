import React, { useEffect, useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Button,
  Table,
  Label,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Link, useHistory } from "react-router-dom"
import ReactPaginate from "react-paginate"
import toast, { Toaster } from "react-hot-toast"
import { addData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Customers = () => {
  const history = useHistory()
  const [show, setshow] = useState(false)
  const [show1, setshow1] = useState(false)
  const toggle = () => setshow1(!show1)
  const [show13, setshow13] = useState(false)
  const toggle13 = () => setshow13(!show13)

  const [form, setform] = useState([])
  const [form1, setform1] = useState([])
  const [form2, setform2] = useState([])

  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }
  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }
  const handleChange2 = e => {
    let myUser = { ...form2 }
    myUser[e.target.name] = e.target.value
    setform2(myUser)
  }

  const [customer, setCustomer] = useState([])

  // get all

  const getAllCustomer = async () => {
    const resonse = await addData("customer/getall")
    var _data = resonse
    setCustomer(_data.data.customerResult)
  }

  // Add function

  const addCustomer = async e => {
    e.preventDefault()
    const bodydata = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
    }
    try {
      const resonse = await addData("customer/add", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setshow(false)
      getAllCustomer()
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  // edit function
  const popup = data => {
    setform1(data)
    setshow1(true)
  }

  const EditCustomer = async e => {
    e.preventDefault()
    const bodydata = {
      name: form1.name,
      email: form1.email,
      phone: form1.phone,
      address: form1.address,
    }
    try {
      const resonse = await addData("customer/edit/" + form1._id, bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setshow1(false)
      getAllCustomer()
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  // search fuctions
  const Customerearch = async e => {
    const resonse = await addData("customer/search?searchQuery=" + e.target.value)
    var _data = resonse
    setCustomer(_data.data.customerResult)
  }

  // Delete function
  const popupdel = (data) => {
    setform2(data)
    setshow13(true)
  }

  const deleteCustomer = async (e) => {
    e.preventDefault()
    const bodydata = {
      id: form2._id,
      password: form2.password,
    }
    try {
      const resonse = await addData("customer/delete", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setshow13(false)
      getAllCustomer()
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  const getByfunction = (data) => {
    sessionStorage.setItem("customerid", data._id)
    history.push("/customer_details")
  }

  useEffect(() => {
    getAllCustomer()
  }, [])

  const [listPerPage] = useState(10)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = customer.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(customer.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Right Agent Group" breadcrumbItem="Customers" />

          <Row>
            <Col>
              {show == true ? (
                <Card className="p-4">
                  <Form
                    onSubmit={e => {
                      addCustomer(e)
                    }}
                  >
                    <h5>Add New Customer</h5>
                    <br />
                    <Row>
                      <Col className="mt-3" md="3">
                        <Label> Name</Label>{" "}
                        <span className="text-danger">*</span>
                        <Input
                          name="name"
                          onChange={e => {
                            handleChange(e)
                          }}
                          required
                          type="text"
                          placeholder="Enter Name"
                        />
                      </Col>
                      <Col className="mt-3" md="3">
                        <Label>Email Id</Label>{" "}
                        <span className="text-danger">*</span>
                        <Input
                          name="email"
                          onChange={e => {
                            handleChange(e)
                          }}
                          required
                          type="email"
                          placeholder="Enter Email"
                        />
                      </Col>
                      <Col className="mt-3" md="3">
                        <Label>Mobile No</Label>{" "}
                        <span className="text-danger">*</span>
                        <div>
                          <Input
                            name="phone"
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile No"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </Col>

                      <Col className="mt-3" md="3">
                        <Label>Address</Label>{" "}
                        <span className="text-danger">*</span>
                        <div>
                          <Input
                            name="address"
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter Address"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="text-end mt-4">
                      <Button type="submit" color="success m-1" outline>
                        Submit <i className="bx bx-check-circle"></i>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setshow(!show)
                        }}
                        color="danger m-1"
                        outline
                      >
                        Cancel <i className="bx bx-x-circle"></i>
                      </Button>
                    </div>
                  </Form>
                </Card>
              ) : (
                ""
              )}
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <Button
                        onClick={() => {
                          setshow(!show)
                        }}
                        color="primary"
                      >
                        New Customer <i className="bx bx-user-plus"></i>
                      </Button>
                    </Col>
                    <Col>
                      <div style={{ float: "right" }}>
                        <Input
                          onChange={Customerearch}
                          name="search"
                          type="search"
                          placeholder="Search..."
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="table-rep-plugin mt-4">
                    <Table hover bordered responsive>
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Customer id</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile No</th>
                          {/* <th>Status</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.map((data, key) => (
                          <tr key={key}>
                            <th scope="row">
                              {(pageNumber - 1) * 10 + key + 11}
                            </th>
                            <td>{data.customerId}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.phone}</td>
                        
                            <td>
                              <Button
                                onClick={() => {
                                  popup(data)
                                }}
                                size="sm"
                                className="m-1"
                                outline
                                color="success"
                              >
                                <i
                                  style={{ fontSize: " 14px" }}
                                  className="bx bx-edit"
                                ></i>
                              </Button>

                              {/* <Link to="/"> */}
                                <Button
                                  size="sm"
                                  className="m-1"
                                  outline
                                  color="warning"
                                  onClick={()=>{getByfunction(data)}}
                                >
                                  <i
                                    style={{ fontSize: " 14px" }}
                                    className="fa fa-eye"
                                  ></i>
                                </Button>
                              {/* </Link> */}
                              <Button
                                size="sm"
                                className="m-1"
                                outline
                                color="danger"
                                onClick={()=>{popupdel(data)}}
                              >
                                <i
                                  style={{ fontSize: " 14px" }}
                                  className="fas fa-trash-alt"
                                ></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Col sm="12">
                      <div
                        className="d-flex mt-3 mb-1"
                        style={{ float: "right" }}
                      >
                        <ReactPaginate
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={"pagination"}
                          previousLinkClassName={"previousBttn"}
                          nextLinkClassName={"nextBttn"}
                          disabledClassName={"disabled"}
                          activeClassName={"active"}
                          total={lists.length}
                        />
                      </div>
                    </Col>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Toaster />
      </div>
      <Modal isOpen={show1} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Customer Details</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              EditCustomer(e)
            }}
          >
            <Row>
              <Col className="mt-3" md="12">
                <Label> Name</Label> <span className="text-danger">*</span>
                <Input
                  name="name"
                  value={form1.name}
                  onChange={e => {
                    handleChange1(e)
                  }}
                  required
                  type="text"
                  placeholder="Enter Name"
                />
              </Col>
              <Col className="mt-3" md="12">
                <Label>Email Id</Label> <span className="text-danger">*</span>
                <Input
                  name="email"
                  value={form1.email}
                  onChange={e => {
                    handleChange1(e)
                  }}
                  required
                  type="email"
                  placeholder="Enter Email"
                />
              </Col>
              <Col className="mt-3" md="12">
                <Label>Mobile No</Label> <span className="text-danger">*</span>
                <div>
                  <Input
                    name="phone"
                    value={form1.phone}
                    onChange={e => {
                      handleChange1(e)
                    }}
                    required
                    type="number"
                    className="form-control"
                    placeholder="Enter Mobile No"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </Col>
              <Col className="mt-3" md="12">
                <Label>Address</Label> <span className="text-danger">*</span>
                <div>
                  <textarea
                    className="form-control"
                    name="address"
                    value={form1.address}
                    onChange={e => {
                      handleChange1(e)
                    }}
                    required
                    type="text"
                    placeholder="Enter Address"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </Col>
            </Row>
            <div className="text-end mt-4">
              <Button type="submit" color="success m-1" outline>
                Submit <i className="bx bx-check-circle"></i>
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setshow1(!show1)
                }}
                color="danger m-1"
                outline
              >
                Cancel <i className="bx bx-x-circle"></i>
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <Modal size="sm" className="mt-5 pt-5" isOpen={show13} toggle={toggle13}>
        <ModalHeader toggle={toggle13}>Delete Customer</ModalHeader>
        <ModalBody>
          <div>
            <div>
              <form onSubmit={(e)=>{deleteCustomer(e)}}>
                <label>Password</label>
                <input
                  required
                  placeholder="Enter Password"
                  type="text"
                  className="form-control"
                  name="password"
                  onChange={(e)=>{handleChange2(e)}}
                />
                 <div className="text-end mt-3">
              <Button
                type="submit"
                color="success m-1"
                outline
              >
                Submit <i className="bx bx-check-circle"></i>
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setshow13(!show13)
                }}
                color="danger m-1"
                outline
              >
                Cancel <i className="bx bx-x-circle"></i>
              </Button>
            </div>
              </form>
            </div>
           
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default Customers
