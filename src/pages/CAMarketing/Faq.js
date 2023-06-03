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
import img3 from "../../assets/images/crypto/blog/img-3.jpg"
import { addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Faq = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [banner, setbanner] = useState([])
  const [types, settypes] = useState([])
  const [form, setform] = useState({ productId: "", subProduct: "" })
  const [form1, setform1] = useState([])
  console.log(form1)
  const [form2, setform2] = useState([])
  const [Files, setFiles] = useState("")
  const [Files1, setFiles1] = useState("")

  const [inputList, setInputList] = useState([{ label: "", value: "" }])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }
  const handleRemoveClick = index => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }
  const handleAddClick = () => {
    setInputList([...inputList, { label: "", value: "" }])
  }

  const history = useHistory()

  const changeHandler = e => {
    setFiles(e.target.files)
  }
  const changeHandler1 = e => {
    setFiles1(e.target.files)
  }

  function tog_small() {
    setmodal_small(!modal_small)
    removeBodyCss()
  }

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

  // get all function

  const getAllbenners = async () => {
    const resonse = await addData("admin/faq/get")
    var _data = resonse
    setbanner(_data.data.faq)
  }

  useEffect(() => {
    getAllbenners()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = banner.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(banner.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  // Add function

  const addbenners = async e => {
    e.preventDefault()
    const bodydata = {
      data: inputList,
    }

    try {
      const resonse = await addData("admin/faq/add", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setInputList([{ label: "", value: "" }])
      getAllbenners()
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

  // Edit fuction
  const editbenners = async e => {
    e.preventDefault()
    const bodydata = {
      question: form1.question,
      answer: form1.answer,
      status: form1.status,
    }
    try {
      const resonse = await addData("admin/faq/edit/" + form1._id, bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setmodal_small(false)
      getAllbenners()
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

  // Delete fuction

  const deletebenners = async data => {
    try {
      const resonse = await addData("admin/faq/delete/" + data._id, {})
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      getAllbenners()
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

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Delete?")
    if (confirmBox === true) {
      deletebenners(data)
    }
  }

  const getpopup = data => {
    setform1(data)
    tog_small()
  }

  // Search fuction
  const handleSearch = async e => {
    const resonse = await addData("admin/faq/get?searchQuery=" + e.target.value)
    var _data = resonse
    setbanner(_data.data.faq)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Right Agent Group" breadcrumbItem="Faq" />
          {/* {permissioins.banner === true || roles === "admin" ? ( */}

          <Row>
            <Col md={4}>
              <Card>
                <CardHeader className="bg-white">
                  <CardTitle>Add Faq</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form
                    onSubmit={e => {
                      addbenners(e)
                    }}
                  >
                    <div>
                      {inputList.map((x, i) => (
                        <div key={i} className="box row">
                          <div className="mt-3">
                            <Label for="name" style={{ color: "black" }}>
                              Question : <span className="text-danger">*</span>
                            </Label>
                            <Input
                              onChange={e => handleInputChange(e, i)}
                              type="text"
                              name="value"
                              value={x.value}
                              placeholder="Enter Question"
                            />
                          </div>
                          <div className="mt-3">
                            <Label for="name" style={{ color: "black" }}>
                              Answer : <span className="text-danger">*</span>
                            </Label>
                            <Input
                              onChange={e => handleInputChange(e, i)}
                              type="text"
                              name="label"
                              value={x.label}
                              placeholder="Enter Answer"
                            />
                          </div>
                          <div className="mt-3">
                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <button
                                  className="mr10 btn btn-outline-danger text-end btn-sm"
                                  style={{ float: "right" }}
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  Remove
                                </button>
                              )}
                              {inputList.length - 1 === i && (
                                <button
                                  className="btn btn-outline-info btn-sm w-50"
                                  onClick={handleAddClick}
                                >
                                  Add
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4" style={{ float: "right" }}>
                      <Button color="primary" type="submit">
                        Submit <i className="fas fa-check-circle"></i>
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md={8}>
              <Card>
                <CardHeader className="bg-white">
                  <CardTitle>Faq List </CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <div className="table-responsive">
                      <div style={{ float: "right" }}>
                        <Input
                          type="text"
                          name="search"
                          onChange={handleSearch}
                          className="form-control"
                          placeholder="Search.."
                        />
                      </div>
                      <Table className="table table-bordered mb-4 mt-5">
                        <thead>
                          <tr>
                            <th>S No</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                                  <td>{(pageNumber - 1) * 5 + key + 6}</td>
                              <td>{data.question} </td>
                              <td>{data.answer}</td>
                              <td>{data.status}</td>
                              <td>
                                <Button
                                  onClick={() => {
                                    getpopup(data)
                                  }}
                                  className="mr-2"
                                  style={{ padding: "6px", margin: "3px" }}
                                  color="success"
                                  outline
                                >
                                  <i className="bx bx-edit "></i>
                                </Button>
                                <Button
                                  onClick={() => {
                                    manageDelete(data)
                                  }}
                                  style={{ padding: "6px", margin: "3px" }}
                                  color="danger"
                                  outline
                                >
                                  <i className="bx bx-trash"></i>
                                </Button>
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
              Edit Faq
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
                editbenners(e)
              }}
            >
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">
                  Question <span className="text-danger">*</span>
                </Label>
                <Input
                  placeholder="Enter Question"
                  name="question"
                  onChange={e => {
                    handleChange1(e)
                  }}
                  value={form1.question}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">
                  Answer <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  onChange={e => {
                    handleChange1(e)
                  }}
                  name="answer"
                  placeholder="Enter Answer"
                  value={form1.answer}
                />
              </div>

              <div className="mb-3">
                <Label for="basicpill-firstname-input3">
                  Status <span className="text-danger">*</span>
                </Label>
                <select
                  name="status"
                  value={form1.status}
                  onChange={e => {
                    handleChange1(e)
                  }}
                  className="form-select"
                >
                  <option value="active">Active</option>
                  <option value="inactive">In Active</option>
                </select>
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

        <Toaster />
      </div>
    </React.Fragment>
  )
}

export default Faq
