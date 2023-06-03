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
import { useHistory, Link } from "react-router-dom"
import img3 from "../../assets/images/crypto/blog/img-3.jpg"
import { addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Loans = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [banner, setbanner] = useState([])
  const [form, setform] = useState([])
  const [form1, setform1] = useState([])
  const [types, settypes] = useState([])
  console.log(form1)
  const [form2, setform2] = useState([])
  const [Files, setFiles] = useState({image:""})
  const [Files1, setFiles1] = useState({image:""})

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

  const [items, setItems] = useState([])
  const [userinfo, setuserinfo] = useState([])
  console.log(items.token)
  console.log(userinfo)

  // get all function

  const getAllbenners = async () => {
    const resonse = await addData("admin/loanpartner/getall")
    var _data = resonse
    setbanner(_data.data.loanPartner)
  }
    // get all function

    const getAlltypes = async () => {
      const resonse = await addData("admin/product/getactive", {})
      var _data = resonse
      settypes(_data.data.productResult)
    }

  useEffect(() => {
    getAlltypes()
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
    const dataArray = new FormData()
    dataArray.append("name", form.name)
    dataArray.append("productId", form.productId)
    dataArray.append("percentage", form.percentage)
    dataArray.append("year", form.year)
    for (let i = 0; i < Files.length; i++) {
      dataArray.append("image", Files[i])
    }
    try {
      const resonse = await addData("admin/loanpartner/add", dataArray)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
     setform({
      name:"",
      productId:"",
      percentage:"",
      year:"",
     })
     setFiles({image:""})
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
    const dataArray = new FormData()
    dataArray.append("name", form1.name)
    dataArray.append("productId", form1.productId)
    dataArray.append("percentage", form1.percentage)
    dataArray.append("year", form1.year)
    dataArray.append("status", form1.status)
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("image", Files1[i])
    }
    try {
      const resonse = await updateData("admin/loanpartner/edit/" + form1._id, dataArray)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setform1({
        name:"",
        productId:"",
        percentage:"",
        year:"",
       })
       setFiles1({image:""})
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
      const resonse = await deletedData(
        "admin/loanpartner/delete/" + data._id,
        {}
      )
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

  const [forms, setforms] = useState([])
  console.log(forms)

  // Search fuction
  const handleSearch = async e => {
    const resonse = await addData("admin/loanpartner/getall?searchQuery=" + e.target.value)
    var _data = resonse
    setbanner(_data.data.loanPartner)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Right Agent Group"
            breadcrumbItem="Banks"
          />
          {/* {permissioins.banner === true || roles === "admin" ? ( */}

          <Row>
            <Col md={4}>
              <Card>
                <CardHeader className="bg-white">
                  <CardTitle>Add Bank</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form
                    onSubmit={e => {
                      addbenners(e)
                    }}
                  >
                       <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Category <span className="text-danger">*</span>
                      </Label>
                      <select
                      name="productId"
                      value={form.productId}
                        onChange={e => {
                          handleChange(e)
                        }}
                        required
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {types.map((data, key)=>(
                        <option key={key} value={data._id}>{data.product}</option>
                        ))}
                      </select>
                    </div>
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
                        value={form.name}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Image <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="file"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter image"
                        required
                        name="image"
                        value={Files.image}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Percentage <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Percentage"
                        required
                        name="percentage"
                        value={form.percentage}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Years <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Years"
                        required
                        name="year"
                        value={form.year}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
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
                  <CardTitle>Banks</CardTitle>
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
                            <th> Name</th>
                            <th> Image</th>
                            <th> Percentage</th>
                            <th> Years</th>
                            <th>Status</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <td>{(pageNumber - 1) * 5 + key + 6}</td>
                              <td>{data.name} </td>
                              <td>
                                <img
                                  style={{ width: "100px" }}
                                  src={imgUrl + data.image}
                                />
                              </td>
                              <td>{data.percentage} </td>
                              <td>{data.year}</td>
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
                                {/* <Link to="/partnermore">
                                <Button
                            
                                  className="mr-2"
                                  style={{ padding: "6px", margin: "3px" }}
                                  color="warning"
                                  outline
                                >
                                  <i className="bx bx-info-circle"></i>
                                </Button>
                                </Link> */}
                              
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
              Edit Bank
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
                        Category <span className="text-danger">*</span>
                      </Label>
                      <select
                      name="productId"
                      value={form1.productId}
                        onChange={e => {
                          handleChange1(e)
                        }}
                        required
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {types.map((data, key)=>(
                        <option key={key} value={data._id}>{data.product}</option>
                        ))}
                      </select>
                    </div>
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">
                   Name <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter  Name"
                  required
                  name="name"
                  value={form1.name}
                  onChange={e => {
                    handleChange1(e)
                  }}
                />
              </div>
              <div className="mb-3">
                <Label for="basicpill-firstname-input1"> Image</Label>
                <Input
                  type="file"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter image"
                  name="image"
                  // value={form1.bannerImage}
                  onChange={changeHandler1}
                />
              </div>
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">
                  Percentage <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter Percentage"
                  required
                  name="percentage"
                  value={form1.percentage}
                  onChange={e => {
                    handleChange1(e)
                  }}
                />
              </div>
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">
                  Years <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter Years"
                  required
                  name="year"
                  value={form1.year}
                  onChange={e => {
                    handleChange1(e)
                  }}
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

export default Loans
