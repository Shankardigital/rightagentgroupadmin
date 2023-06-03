import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  CardFooter,
  Form,
  Nav,
  Table,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
  CardTitle,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import classnames from "classnames"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

// import avatar from "../../assets/images/users/avatar-2.jpg"
import avatar from "../../assets/images/usersicon.png"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import { useHistory } from "react-router-dom"
import { addData } from "Servicescalls"
import { imgUrl } from "Baseurls"
import toast, { Toaster } from "react-hot-toast"
import ReactPaginate from "react-paginate"

const Customerdetials = () => {
  const history = useHistory()
  const [modal, setmodal] = useState(false)
  const [forms, setforms] = useState([])
  const [form, setform] = useState([])
  const [form1, setform1] = useState([])
  const [form2, setform2] = useState([])

  const [activeTab1, setactiveTab1] = useState("1")
  const toggle1 = tab => {
    if (activeTab1 !== tab) {
      setactiveTab1(tab)
    }
  }

  const handleChange1 = e => {
    const formdata = { ...form1 }
    formdata[e.target.name] = e.target.value
    setform1(formdata)
  }
  const handleChange = e => {
    const formdata = { ...forms }
    formdata[e.target.name] = e.target.value
    setforms(formdata)
  }
  const handleChange2 = e => {
    const formdata = { ...form }
    formdata[e.target.name] = e.target.value
    setform(formdata)
  }

  // get customers

  const getByCustomer = async () => {
    const bodydata = {
      id: sessionStorage.getItem("customerid"),
    }
    const resonse = await addData("customer/getbyid", bodydata)
    var _data = resonse
    setform(_data.data.customerResult)
  }

  // get customers status

  const getBycuststatus = async (e) => {
    e.preventDefault()
    const id = sessionStorage.getItem("customerid")
    const bodydata = {
      paymentStatus: form.paymentStatus,
      amount: form1.amount,
    }
    try {
      const resonse = await addData("customer/updatestatus/" + id, bodydata)
      var _data = resonse
      toast.success(_data.data.message)
      // getByCustomer()
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

  // get customersfollowup
  const getByCustomerFollowup = async () => {
    const bodydata = {
      customerObjId: sessionStorage.getItem("customerid"),
    }
    const resonse = await addData("customer/getfollowups", bodydata)
    var _data = resonse
    setform2(_data.data.customerFollowUp)
  }

    // Add customersfollowup

    const addByCustomerFollowup = async (e) => {
      e.preventDefault()
      const bodydata = {
        customerObjId: sessionStorage.getItem("customerid"),
        date: forms.date,
        time: forms.time,
        description: forms.description,
      }
      try {
        const resonse = await addData("customer/addfollowup", bodydata)
        var _data = resonse
        setmodal(false)
        toast.success(_data.data.message)
        getByCustomerFollowup()
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

  useEffect(() => {
    getByCustomer()
    getByCustomerFollowup()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = form2.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(form2.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Right Agent Group" breadcrumbItem="Customer Details" />
          <Row>
            <div>
              <Button
                onClick={history.goBack}
                className="mb-2  m-1"
                style={{ float: "right" }}
                color="dark"
              >
                <i className="far fa-arrow-alt-circle-left"></i> Back
              </Button>
            </div>
            <Col md="4">
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs="12">
                      <div className="text-primary p-3 mb-5">
                        {/* <h5 className="text-primary">Welcome Back !</h5>
                <p>Right Agent Group Dashboard</p> */}
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col sm="12">
                      <div className="profile-user-wid">
                        <div className="text-center">
                          <img
                            style={{ width: "100px" }}
                            src={avatar}
                            alt=""
                            className="img-thumbnail rounded-circle"
                          />
                        </div>
                      </div>
                      <h5 className="font-size-15 text-center mt-1">
                        {form.customerId}
                      </h5>
                      <p className="font-size-15 mt-4 text-truncate text-dark">
                        Details
                      </p>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Full name</span>
                        </div>
                        <div className="col col-7">
                          <span>: {form.name}</span>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Email</span>
                        </div>
                        <div className="col col-7">
                          <span>:{form.email}</span>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Phone number</span>
                        </div>
                        <div className="col col-7">
                          <span>: {form.phone}</span>
                          <br />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Address</span>
                        </div>
                        <div className="col col-7">
                          <span>: {form.address}</span>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <CardBody>
                  <div className="mt-3">
                    <Nav pills className="navtab-bg nav-justified">
                      <NavItem className="border border-primary rounded">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab1 === "1",
                          })}
                          onClick={() => {
                            toggle1("1")
                          }}
                        >
                          Follow-up
                        </NavLink>
                      </NavItem>
                      <NavItem className="border border-primary rounded">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab1 === "2",
                          })}
                          onClick={() => {
                            toggle1("2")
                          }}
                        >
                          Update Status
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  <TabContent activeTab={activeTab1} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <form
                        onSubmit={e => {
                          handleSubmit1(e)
                        }}
                      >
                        <Row>
                          <Col md="6">
                            <h5 className="mb-4">Follow-up</h5>
                          </Col>
                          <Col md="6 text-end">
                            <Button
                              onClick={() => {
                                setmodal(!modal)
                              }}
                              color="primary"
                              outline
                            >
                              Add Follow-up{" "}
                            </Button>
                          </Col>
                        </Row>

                        <div className="table-rep-plugin mt-5">
                          <Table hover bordered responsive>
                            <thead>
                              <tr>
                                <th>Sl No</th>
                                <th>Date & Time </th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {lists.map((data, key) => (
                                <tr key={key}>
                                  <th scope="row">
                                    {(pageNumber - 1) * 10 + key + 11}
                                  </th>
                                  <td>
                                    {data.date} {data.time}
                                  </td>
                                  <td>{data.description}</td>
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
                      </form>
                    </TabPane>
                    <TabPane tabId="2">
                      <form
                        onSubmit={e => {
                          getBycuststatus(e)
                        }}
                      >
                        <Row className="mb-4">
                          <Col md="12">
                            <CardText className="mb-0">
                              <h5>Update Status</h5>
                              <Row>
                                <Col className="mt-3" md="6">
                                  <Label>Status</Label>{" "}
                                  <span className="text-danger">*</span>
                                  <select
                                    value={form.paymentStatus}
                                    required
                                    onChange={e => {
                                      handleChange2(e)
                                    }}
                                    name="paymentStatus"
                                    className="form-select"
                                  >
                                    <option value="">Select</option>
                                    <option value="Initial">Initial</option>
                                    <option value="make_a_call">
                                      {" "}
                                      Make a cll{" "}
                                    </option>
                                    <option value="Proposal">Proposal</option>
                                    <option value="Success">Success</option>
                                    <option value="Cancel">Cancel</option>
                                  </select>
                                </Col>
                                {form.paymentStatus == "Success" ? (
                                  <Col className="mt-3" md="6">
                                    <Label>Amount</Label>{" "}
                                    <span className="text-danger">*</span>
                                    <Input
                                      value={form1.amount}
                                      placeholder="Enter amount"
                                      onChange={e => {
                                        handleChange1(e)
                                      }}
                                      name="amount"
                                    />
                                  </Col>
                                ) : (
                                  ""
                                )}
                              </Row>
                            </CardText>
                          </Col>
                        </Row>
                        <div style={{ float: "right" }}>
                          <Button
                            style={{ width: "150px" }}
                            color="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Toaster />
        <Modal
          isOpen={modal}
          role="dialog"
          size="sm"
          autoFocus={true}
          centered
          data-toggle="modal"
          toggle={() => {
            setmodal(!modal)
          }}
        >
          <div>
            <ModalHeader
              //   className="border-bottom-0"
              toggle={() => {
                setmodal(!modal)
              }}
            >
              <h5>Add</h5>
            </ModalHeader>
          </div>
          <div className="modal-body">
            <form onSubmit={(e)=>{addByCustomerFollowup(e)}}>
              <div>
                <Label>
                  Date <span className="text-danger">*</span>
                </Label>
                <Input name="date" onChange={(e)=>{handleChange(e)}} required type="date" placeholder="Enter Date" />
              </div>
              <div className="mt-3">
                <Label>
                  Time <span className="text-danger">*</span>
                </Label>
                <Input name="time" onChange={(e)=>{handleChange(e)}} required type="time" placeholder="Enter Time" />
              </div>
              <div className="mt-3">
                <Label>
                  Description <span className="text-danger">*</span>
                </Label>
                <textarea
                  required
                  name="description" onChange={(e)=>{handleChange(e)}}
                  className="form-control"
                  type="text"
                  placeholder="Enter Description"
                />
              </div>
              <div className="text-end mt-3">
                <Button type="submit" color="success" outline>
                  Submit <i className="fas fa-check-circle"></i> 
                </Button>
                <Button
                type="button"
                onClick={() => {
                  setmodal(!modal)
                }}
                color="danger m-1"
                outline
              >
                Cancel <i className="bx bx-x-circle"></i>
              </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Customerdetials)
