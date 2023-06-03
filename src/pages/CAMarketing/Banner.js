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

const Banners = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [banner, setbanner] = useState([])
  const [types, settypes] = useState([])
  const [category, setcategory] = useState([])
  const [form, setform] = useState([])
  const [form1, setform1] = useState([])
  console.log(form1)
  const [form2, setform2] = useState([])
  const [Files1, setFiles1] = useState({ bannerImage: "" })

  const history = useHistory()
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
    const resonse = await addData("admin/banner/getall")
    var _data = resonse
    setbanner(_data.data.banner)
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

  // Edit fuction
  const editbenners = async e => {
    e.preventDefault()
    const dataArray = new FormData()
    dataArray.append("name", form1.name)
    dataArray.append("link", form1.link)
    dataArray.append("page", form1.page)
    dataArray.append("position", form1.position)
    dataArray.append("status", form1.status)
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("bannerImage", Files1[i])
    }
    try {
      const resonse = await addData(
        "admin/banner/edit/" + form1._id,
        dataArray
      )
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setFiles1({ bannerImage: "" })
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

  const getpopup = data => {
    setform1(data)
    tog_small()
  }

  const [forms, setforms] = useState([])
  console.log(forms)

  // Search fuction
  const handleSearch = async e => {
    const resonse = await addData(
      "admin/banner/getall?searchQuery=" + e.target.value
    )
    var _data = resonse
    setbanner(_data.data.banner)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Right Agent Group"
            breadcrumbItem="Loans & Insurances"
          />
          {/* {permissioins.banner === true || roles === "admin" ? ( */}

          <Row>
            <Col md={12}>
              <Card>
                <CardHeader className="bg-white">
                  <CardTitle>Banners List</CardTitle>
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
                            <th>Page</th>
                            <th>Position</th>
                            <th> Name</th>
                            <th> Image</th>
                            <th>Link</th>
                            <th>Status</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <td>{(pageNumber - 1) * 5 + key + 6}</td>
                              <td>{data.page} </td>
                              <td>{data.position} </td>
                              <td>{data.name} </td>
                              <td>
                                <img
                                  style={{ width: "100px", height: "50px" }}
                                  src={imgUrl + data.image}
                                />
                              </td>
                              <td>{data.link}</td>
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
          isOpen={modal_small}
          toggle={() => {
            tog_small()
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Edit Banner
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
              <Row>
                <Col md="6">
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">
                      Page <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter Name"
                      required
                      disabled
                      name="page"
                      value={form1.page}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">
                    Position <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter Name"
                      required
                      disabled
                      name="position"
                      value={form1.position}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">
                    Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter Name"
                      required
                      name="name"
                      value={form1.name}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">
                    Link <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter Link"
                      required
                      name="link"
                      value={form1.link}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </div>
                </Col>
                <Col md="6">
                <div className="mb-3">
                <Label for="basicpill-firstname-input1">Image</Label> 
                <span>{form1.position == "horizontal" ?(
                    <span className="text-danger"> 820 × 100</span>
                ):(
                    <span className="text-danger"> 150 × 560</span>
                )}
                </span>
                <Input
                  type="file"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter image"
                  name="bannerImage"
                  // value={form1.bannerImage}
                  onChange={changeHandler1}
                />
              </div>
                </Col>
                <Col md="6">
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
                </Col>
              </Row>
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

export default Banners
