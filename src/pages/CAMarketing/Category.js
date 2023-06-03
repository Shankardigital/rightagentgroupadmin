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

const Loans = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [banner, setbanner] = useState([])
  const [types, settypes] = useState([])
  const [form, setform] = useState({productId:"", subProduct:"" })
  const [form1, setform1] = useState([])
  console.log(form1)
  const [form2, setform2] = useState([])
  const [Files, setFiles] = useState("")
  const [Files1, setFiles1] = useState("")

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

  const handleChange = (e) => {
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
    const resonse = await addData("admin/subproduct/getall")
    var _data = resonse
    setbanner(_data.data.subProduct)
  }
  // get all function

  const getAlltypes = async () => {
    const resonse = await addData("admin/product/getactive", {})
    var _data = resonse
    settypes(_data.data.productResult)
  }

  useEffect(() => {
    getAllbenners()
    getAlltypes()
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
      productId:form.productId,
      subProduct:form.subProduct,
    }
 
    try {
      const resonse = await addData("admin/subproduct/add", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setform({productId:"", subProduct:"" })
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
  const editbenners = async (e) => {
    e.preventDefault()
    const bodydata = {
      productId:form1.productId,
      subProduct:form1.subProduct,
      status:form1.status,
    }
    try {
      const resonse = await addData("admin/subproduct/edit/" + form1._id, bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setform1({productId:"", subProduct:"" })
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
        "admin/subproduct/delete/" + data._id,
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

  const clearForm = () => {
    setform({
      name: "",
      bannerImage: "",
    })
  }

  const getpopup = data => {
    setform1(data)
    tog_small()
  }

  const [forms, setforms] = useState([])
  console.log(forms)

  // Search fuction
  const handleSearch = async e => {
    const resonse = await addData("admin/subproduct/getall?searchQuery=" + e.target.value)
    var _data = resonse
    setbanner(_data.data.subProduct)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Right Agent Group" breadcrumbItem="Category" />
          {/* {permissioins.banner === true || roles === "admin" ? ( */}

          <Row>
            <Col md={4}>
              <Card>
                <CardHeader className="bg-white">
                  <CardTitle>Add  Category</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form
                    onSubmit={e => {
                      addbenners(e)
                    }}
                  >
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                         Type <span className="text-danger">*</span>
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
                         Category Name <span className="text-danger">*</span>
                      </Label>
                    <Input type="text"
                     onChange={e => {
                      handleChange(e)
                    }}
                    name="subProduct" required placeholder="Enter Category Name" value={form.subProduct} />
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
                  <CardTitle>Category List </CardTitle>
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
                              <td>{data.product} </td>
                              <td>{data.subProduct}</td>
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
              Edit Category
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
                         Type <span className="text-danger">*</span>
                      </Label>
                      <select
                      name="productId"
                        onChange={e => {
                          handleChange1(e)
                        }}
                        value={form1.productId}
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
                        Category <span className="text-danger">*</span>
                      </Label>
                    <Input type="text"
                     onChange={e => {
                      handleChange1(e)
                    }}
                    name="subProduct" placeholder="Enter Category Name" value={form1.subProduct} />
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
