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

import { Link, useHistory } from "react-router-dom"
import ReactPaginate from "react-paginate"
//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

// import avatar from "../../assets/images/users/avatar-2.jpg"
import avatar from "../../assets/images/usersicon.png"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"

import { addData } from "Servicescalls"
import { imgUrl } from "Baseurls"


const Userdetails = () => {
  const history = useHistory()
  //meta title
  //  document.title="Profile | Right Agent Group - React Admin & Dashboard Template";

  const [modal, setmodal] = useState(false)
  const [form, setform] = useState([])
  const [form2, setform2] = useState([])

  const [activeTab1, setactiveTab1] = useState("1")
  const toggle1 = tab => {
    if (activeTab1 !== tab) {
      setactiveTab1(tab)
    }
  }

    // get all
    const getByAgents = async () => {
      const bodydata = {
        id: sessionStorage.getItem("agentid")
      }
      const resonse = await addData("agent/getbyid", bodydata)
      var _data = resonse
      setform(_data.data.AgentResult)
    }
    // get all customers
    const getByAgentscustomers = async () => {
      const bodydata = {
        id: sessionStorage.getItem("agentid")
      }
      const resonse = await addData("agent/getallagentcustomer", bodydata)
      var _data = resonse
      setform2(_data.data.agentCutomers)
    }
  
    useEffect(()=>{
      getByAgents()
      getByAgentscustomers()
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
          <Breadcrumb title="Right Agent Group" breadcrumbItem="Agent Details" />

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
                            src={imgUrl + form.profilePic}
                            alt=""
                            className="img-thumbnail rounded-circle"
                          />
                        </div>
                      </div>
                      <h5 className="font-size-15 text-center mt-1">
                        {form.agentId}
                      </h5>
                     

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
                              Details
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
                              Bank Details
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>

                      <TabContent
                        activeTab={activeTab1}
                        className="p-3 text-muted"
                      >
                        <TabPane tabId="1">
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
                              <span className="">Mobile</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.phone}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Company</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.company}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Designation</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.designation}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">State</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.state}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">City</span>
                            </div>
                            <div className="col col-7">
                              <span>:  {form.city}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Area</span>
                            </div>
                            <div className="col col-7">
                              <span>:  {form.area}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Address</span>
                            </div>
                            <div className="col col-7">
                              <span>
                                : {form.address}
                              </span>
                            </div>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">

                        <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Paid amount</span>
                            </div>
                            <div className="col col-7">
                              <span>: ₹ 2000</span>
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Wallet</span>
                            </div>
                            <div className="col col-7">
                              <span>: ₹ 500</span>
                            </div>
                          </Row>
                          <hr/>

                        <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Bank Name</span>
                            </div>
                            <div className="col col-7">
                              <span>: IDFC Bank</span>
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">A/c Number</span>
                            </div>
                            <div className="col col-7">
                              <span>: 2451654565</span>
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">IFSC Code</span>
                            </div>
                            <div className="col col-7">
                              <span>: IDFC09835</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">UPI Id</span>
                            </div>
                            <div className="col col-7">
                              <span>: 565455456665</span>
                              <br />
                            </div>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <CardBody>
                  <h5 className="mt-3 mb-3">Customers</h5>

                  <div className="table-rep-plugin mt-4">
                    <Table hover bordered responsive>
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Customer id</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile No</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.map((data, key) => (
                        <tr key={key}>
                          <th scope="row">
                           {((pageNumber - 1) * 10) + key + 11}
                          </th>
                          <td>{data.customerId}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.phone}</td>
                          <td>
                          {data.paymentStatus}
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
        </Container>

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
            <form>
              <div>
                <Label>
                  Date <span className="text-danger">*</span>
                </Label>
                <Input required type="date" placeholder="Enter Date" />
              </div>
              <div className="mt-3">
                <Label>
                  Time <span className="text-danger">*</span>
                </Label>
                <Input required type="time" placeholder="Enter Time" />
              </div>
              <div className="mt-3">
                <Label>
                  Description <span className="text-danger">*</span>
                </Label>
                <textarea
                  required
                  className="form-control"
                  type="text"
                  placeholder="Enter Description"
                />
              </div>
              <div className="text-end mt-3">
                <Button type="submit" color="success" outline>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Userdetails)
