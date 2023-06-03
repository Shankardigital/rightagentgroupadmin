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
import axios from "axios"
import { useHistory } from "react-router-dom"
import img3 from "../../assets/images/crypto/blog/img-3.jpg"
import { addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Cities = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [cities, setCities] = useState([])
  const [form, setform] = useState({ stateId: "", city: "" })
  const [form1, setform1] = useState([])
  console.log(form1)
  const [form2, setform2] = useState([])
  const [Files, setFiles] = useState("")
  const [Files1, setFiles1] = useState("")

  const history = useHistory()

  const changeHandler = e => {
    setFiles(e.target.files)
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

  const [states, setState] = useState([])

  const getAllStates = async () => {
    const resonse = await addData("state/getallactive")
    var _data = resonse
    setState(_data.data.activeStateResult)
  }
  // get all cities

  const getAllCities = async () => {
    const resonse = await addData("city/getall")
    var _data = resonse
    setCities(_data.data.citysResult)
  }

  useEffect(() => {
    getAllStates()
    getAllCities()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = cities.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(cities.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  // Add function

  const handleSubmit = async e => {
    e.preventDefault()
    const bodydata = {
      stateId: form.stateId,
      city: form.city,
    }
    try {
      const resonse = await addData("city/add", bodydata)
      var _data = resonse
      setform({ stateId: "", city: "" });
      toast.success(_data.data.message)
      getAllCities()
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
  }

  // edit function
  const getpopup = data => {
    setform1(data)
    tog_small()
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault()
    const bodydata = {
      stateId: form1.stateId,
      city: form1.city,
    }
    try {
      const resonse = await updateData("city/edit/" + form1._id, bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setmodal_small(false)
      getAllCities()
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
  }

  // search fuctions
  const citiesSearch = async e => {
    const resonse = await addData("city/getall?searchQuery=" + e.target.value)
    var _data = resonse
    setCities(_data.data.citysResult)
  }

  const deletecities = async(data) => {
    try {
        const resonse = await deletedData("city/delete/"+ data._id, {})
        var _data = resonse
        console.log(_data)
        toast.success(_data.data.message)
        getAllCities()
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message)
        } else {
        //   toast.error("An error occurred. Please try again.")
        }
      }
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Delete?")
    if (confirmBox === true) {
        deletecities(data)
    }
  }

  const clearForm = () => {
    setform({
      stateId: "",
      city: "",
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Right Agent Group" breadcrumbItem="States & Cities" />

          <Row>
            <Col md={4}>
              <Card>
                <CardHeader className="bg-white">
                  <CardTitle>Add City</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form
                    onSubmit={e => {
                      handleSubmit(e)
                    }}
                  >
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        States <span className="text-danger">*</span>
                      </Label>
                      <select
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter State Name"
                        required
                        name="stateId"
                        onChange={e => {
                          handleChange(e)
                        }}
                      >
                        <option value="">Select</option>
                        {states.map((data, key) => (
                          <option key={key} value={data._id}>
                            {data.stateName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        City <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter City name"
                        required
                        name="city"
                        onChange={(e) => {
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
                  <CardTitle>State & Cities </CardTitle>
                </CardHeader>

                <CardBody>
                  <div>
                    <div className="table-responsive">
                      <div style={{ float: "right" }}>
                        <Input
                          type="text"
                          name="search"
                          onChange={citiesSearch}
                          className="form-control"
                          placeholder="Search.."
                        />
                      </div>
                      <Table className="table table-bordered mb-4 mt-5">
                        <thead>
                          <tr>
                            <th>S No</th>
                            <th>State Name</th>
                            <th>City Name</th>
                            <th>Status</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <td> {(pageNumber - 1) * 10 + key + 11}</td>
                              <td>{data.state} </td>
                              <td>{data.city} </td>
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
              Edit Cities
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
                handleSubmit1(e)
              }}
            >
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">
                  States <span className="text-danger">*</span>
                </Label>
                <select
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter State Name"
                  required
                  name="stateId"
                  value={form1.stateId}
                  onChange={e => {
                    handleChange1(e)
                  }}
                >
                  <option value="">Select</option>
                  {states.map((data, key) => (
                    <option key={key} value={data._id}>
                      {data.stateName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">
                  City <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter City name"
                  required
                  name="city"
                  value={form1.city}
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

export default Cities
