import React, { useState, useEffect } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
} from "reactstrap"
// import img1 from "../assets/images/latest/car1.jpg"

//Import Breadcrumb
// import Breadcrumbs from "../components/Common/Breadcrumb"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import toast, { Toaster } from "react-hot-toast"
import ReactPaginate from "react-paginate"
// import { URL } from "../../Apiurls";
import axios from "axios"
import { useHistory } from "react-router-dom"
import { addData, updateData, deletedData } from "Servicescalls"

const Withdraw = () => {
  const [form, setForm] = useState([])
  const [forms, setForms] = useState([])
  const [forms1, setForms1] = useState([])
  const [form1, setForm1] = useState([])
  const [modal_small, setmodal_small] = useState(false)
  const [modal_small1, setmodal_small1] = useState(false)

  const handleChange =(e)=>{
    const myForm = {...forms};
    myForm[e.target.name]=e.target.value;
    setForms(myForm)
  }
  const handleChange1 =(e)=>{
    const myForm = {...forms1};
    myForm[e.target.name]=e.target.value;
    setForms1(myForm)
  }
  // get all Withdraw

  const getAllWithdraws = async () => {
    const resonse = await addData("agent/getallwithdrawalrequest")
    var _data = resonse
    setForm(_data.data.agentInfo)
  }

    // search fuctions
    const WithdrawsSearch = async e => {
      const resonse = await addData("agent/getallwithdrawalrequest?searchQuery=" + e.target.value)
      var _data = resonse
      setForm(_data.data.agentInfo)
    }

    const popup = (data)=>{
      setForm1(data)
      setmodal_small(true)
    }
    const popup1 = (data)=>{
      setForm1(data)
      setmodal_small1(true)
    }

        // Update fucnctions
        const payemount = async (e) => {
          e.preventDefault()
          const bodydata = {
            transactionId:forms.transactionId,
            description:forms.description,
            status:"paid"
          }
          try {
            const resonse = await addData("agent/paytoagent/" + form1._id, bodydata)
            var _data = resonse
            console.log(_data)
            toast.success(_data.data.message)
            setmodal_small(false)
            getAllWithdraws()
          } catch (error) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(error.response.data.message)
            } else {
              // toast.error("An error occurred. Please try again.")
            }
          }
        
          // setForm(_data.data.agentInfo)
        }

        // Update fucnctions
        const unpayemount = async (e) => {
          e.preventDefault()
          const bodydata = {
            description:forms1.description,
            status:"unpaid"
          }
          try {
            const resonse = await addData("agent/paytoagent/" + form1._id, bodydata)
            var _data = resonse
            console.log(_data)
            toast.success(_data.data.message)
            setmodal_small1(false)
            getAllWithdraws()
          } catch (error) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(error.response.data.message)
            } else {
              // toast.error("An error occurred. Please try again.")
            }
          }
        
          // setForm(_data.data.agentInfo)
        }

  useEffect(() => {
    getAllWithdraws()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = form.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(form.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Right Agent Group"
            breadcrumbItem="Withdraw Requests"
          />
          {/* {permissioins.banner === true || roles === "admin" ? ( */}

          <Row>
            <Col md={12}>
              <Card>
                <CardHeader className="bg-white">
                  {/* <CardTitle>Withdraw Requests </CardTitle> */}
                </CardHeader>

                <CardBody>
                  <div>
                    <div className="table-responsive">
                      <div style={{ float: "right" }}>
                        <Input
                          type="text"
                          name="search"
                          // value={forms.search}
                          onChange={WithdrawsSearch}
                          className="form-control"
                          placeholder="Search.."
                        />
                      </div>
                      <Table className="table table-bordered mb-4 mt-5">
                        <thead>
                          <tr>
                            <th>S No</th>
                            <th>Agent Id</th>
                            <th>Agent Name</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th style={{ width: "120px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <td>{(pageNumber - 1) * 10 + key + 11}</td>
                              <td>{data.agentId}</td>
                              <td>{data.agentName} </td>
                              <td>{data.date} </td>
                              <td>₹ {data.amount} </td>
                              <td>{data.status}</td>
                              <td>
                                {/* {permissioins.editbanner === true || roles === "admin" ? ( */}
                                {data.status == "paid" ? (
                                  <Button
                                    onClick={() => {
                                      popup1(data);
                                    }}
                                    className="mr-2"
                                    style={{ padding: "6px", margin: "3px" }}
                                    color="danger"
                                    outline
                                  >
                                    Unpay <i className="bx bx-x-circle"></i>
                                  </Button>
                                ) : (
                                  <Button
                                  onClick={() => {
                                    popup(data);
                                  }}
                                    className="mr-2"
                                    style={{ padding: "6px", margin: "3px" }}
                                    color="success"
                                    outline
                                  >
                                    Pay <i className="bx bx-check-circle"></i>
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <div className="mt-3" style={{ float: "right" }}>
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
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal
          size="sm"
          isOpen={modal_small}
          toggle={() => {
            tog_small()
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Add Payment Details
            </h5>
            <button
              onClick={() => {
                setmodal_small(false)
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Form
              onSubmit={e => {
                payemount(e)
              }}
            >
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">
                  Transaction id <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter  Transaction id"
                  required
                  name="transactionId"
                  onChange={e => {
                    handleChange(e)
                  }}
                />
              </div>
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">Description</Label>
                <textarea
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter Description"
                  name="description"
                  onChange={e => {
                    handleChange(e)
                  }}
              
                />
              </div>

              <div style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    setmodal_small(false)
                  }}
                  color="danger"
                  type="button"
                >
                  Cancel <i className="fas fa-times-circle"></i>
                </Button>
                <Button className="m-1" color="primary" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
        <Modal
          size="sm"
          isOpen={modal_small1}
          toggle={() => {
            tog_small()
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
             Payment Details
            </h5>
            <button
              onClick={() => {
                setmodal_small1(false)
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Form
              onSubmit={e => {
                unpayemount(e)
              }}
            >
             
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">Description</Label>
                <textarea
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter Description"
                  name="description"
                  onChange={e => {
                    handleChange1(e)
                  }}
              
                />
              </div>

              <div style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    setmodal_small1(false)
                  }}
                  color="danger"
                  type="button"
                >
                  Cancel <i className="fas fa-times-circle"></i>
                </Button>
                <Button className="m-1" color="primary" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>

        <Toaster />
      </div>
    </React.Fragment>
  )
}

export default Withdraw
