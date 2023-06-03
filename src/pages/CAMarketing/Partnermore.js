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
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Input,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  Form,
  FormGroup,
} from "reactstrap"
import classnames from "classnames"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import toast, { Toaster } from "react-hot-toast"
import ReactPaginate from "react-paginate"
// import { URL } from "../../Apiurls";
import axios from "axios"
import Select from 'react-select'
import { useHistory, Link } from "react-router-dom"
import img3 from "../../assets/images/crypto/blog/img-3.jpg"
import { addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

function Partnermore() {
  const history = useHistory()
  const [activeTab, setactiveTab] = useState(1)
  const [passedSteps, setPassedSteps] = useState([1])
  const [show, setshow] = useState(false)

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  }

  const [inputList, setInputList] = useState([{ title: "", value: "" }])
  const [inputList1, setInputList1] = useState([{ title: "" }])
  console.log(inputList)
  console.log(inputList1)

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
    console.log(index)
  }
  const handleInputChange1 = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList1]
    list[index][name] = value
    setInputList1(list)
    console.log(index)
  }
  const handleRemoveClick = index => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }
  const handleRemoveClick1 = index => {
    const list = [...inputList1]
    list.splice(index, 1)
    setInputList1(list)
  }
  const handleAddClick = () => {
    setInputList([...inputList, { title: "", value: "" }])
  }
  const handleAddClick1 = () => {
    setInputList1([...inputList1, { title: "" }])
  }

  const [banner, setbanner] = useState([])
  const [banks, setbanks] = useState([])
  const [category, setcategory] = useState([])
  const [form, setform] = useState([])
  const [Files, setFiles] = useState({ flatImages: "" })
  const [Files1, setFiles1] = useState({ siteImage: "" })
  const [Files2, setFiles2] = useState({ image3d: "" })

  const changeHandler = e => {
    setFiles(e.target.files)
  }
  const changeHandler1 = e => {
    setFiles1(e.target.files)
  }
  const changeHandler2 = e => {
    setFiles2(e.target.files)
  }

  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }

  const handleChange2 = async () => {
    // let myUser = { ...form }
    // myUser[e.target.name] = e.target.value
    // setform(myUser)
    const bodydata = {
      productId: "6474557f4e900cde632eea93",
    }
    const resonse = await addData("admin/subproduct/getallactive", bodydata)
    var _data = resonse
    setcategory(_data.data.subProduct)
  }

  const [selectedMulti1, setselectedMulti1] = useState({ label: "", value: "" })

  console.log(selectedMulti1)
  function handleMulti(data) {
      setselectedMulti1(data)
  }

  const getAllbenners = async () => {
    const resonse = await addData("admin/realestate/getall")
    var _data = resonse
    setbanner(_data.data.realestate)
  }

  const getAllbanks = async () => {
    const resonse = await addData("admin/realestate/features/getallactive")
    var _data = resonse
    setbanks(_data.data.feature)
  }

  const banksid = banks.map((data) => (
    { value: data._id, label: data.title }
))

  useEffect(() => {
    handleChange2()
    getAllbanks()
    getAllbenners()
  }, [])

  const addbenners = async (e) => {
    e.preventDefault()
    const dataArray = new FormData()
    dataArray.append("title", form.title)
    dataArray.append("productId", "6474557f4e900cde632eea93")
    dataArray.append("subProductId", form.subProductId)
    dataArray.append("amount", form.amount)
    dataArray.append("description", form.description)
    dataArray.append("amenities", JSON.stringify(inputList))
    dataArray.append("highlights", JSON.stringify(inputList1))
    dataArray.append("features", JSON.stringify(selectedMulti1))

    for (let i = 0; i < Files.length; i++) {
      dataArray.append("flatImages", Files[i])
    }
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("siteImage", Files1[i])
    }
    for (let i = 0; i < Files2.length; i++) {
      dataArray.append("image3d", Files2[i])
    }

    try {
      const resonse = await addData("admin/realestate/add", dataArray)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      getAllbenners()
      setFiles({flatImages:""})
      setFiles1({siteImage:""})
      setFiles2({image3d:""})
      setInputList({ title: "", value: "" })
      setInputList1({ title: ""})
      setshow(false)
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

  // Search fuction
  const handleSearch = async e => {
    const resonse = await addData("admin/realestate/getall?searchQuery=" + e.target.value)
    var _data = resonse
    setbanner(_data.data.realestate)
  }


  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = banner.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(banner.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const editRedirect =(data)=>{
    sessionStorage.setItem("realestateid", data._id)
    history.push("/editrealestate")
  }

    // Delete fuction

    const deletebenners = async(data) => {
      try {
        const resonse = await deletedData(
          "admin/realestate/delete/" + data._id,
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
  

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Right Agent Group" breadcrumbItem="Real Estate" />

          <Row>
            <Col lg="12">
              {show == true ? (
                <Card>
                  <CardBody>
                    <h4 className="card-title mb-4">Add Real Estate</h4>
                    <form onSubmit={(e)=>{addbenners(e)}}>
                    <div className="wizard clearfix">
                      <div className="steps clearfix">
                        <ul>
                          <NavItem
                            className={classnames({ current: activeTab === 1 })}
                          >
                            <NavLink
                              className={classnames({
                                current: activeTab === 1,
                              })}
                              onClick={() => {
                                setactiveTab(1)
                              }}
                              disabled={!(passedSteps || []).includes(1)}
                            >
                              <span className="number">1.</span> Details
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTab === 2 })}
                          >
                            <NavLink
                              className={classnames({
                                active: activeTab === 2,
                              })}
                              onClick={() => {
                                setactiveTab(2)
                              }}
                              disabled={!(passedSteps || []).includes(2)}
                            >
                              <span className="number ms-2">02</span> Key
                              Features
                            </NavLink>
                          </NavItem>
                        </ul>
                      </div>
                      <div className="content clearfix mt-4">
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId={1}>
                            <div>
                              <Row>
                                <div className="col-lg-4 mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    Category{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <select
                                    onChange={e => {
                                      handleChange(e)
                                    }}
                                    required
                                    className="form-select"
                                    name="subProductId"
                                  >
                                    <option value="">Select</option>
                                    {category.map((data, key) => (
                                      <option key={key} value={data._id}>
                                        {data.subProduct}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-lg-4 mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    Name <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    onChange={e => {
                                      handleChange(e)
                                    }}
                                    required
                                    className="form-control"
                                    placeholder="Enter Name"
                                    name="title"
                                  />
                                </div>
                                <div className="col-lg-4 mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    Price <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    onChange={e => {
                                      handleChange(e)
                                    }}
                                    required
                                    className="form-control"
                                    placeholder="Enter Price"
                                    name="amount"
                                  />
                                </div>
                                <div className="col-lg-4 mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    Images{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="file"
                                    multiple
                                    onChange={changeHandler}
                                    required
                                    className="form-control"
                                    placeholder="Enter Price"
                                    name="flatImages"
                                  />
                                </div>
                                <div className="col-lg-4 mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    Site Map
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="file"
                                    onChange={changeHandler1}
                                    required
                                    className="form-control"
                                    placeholder="Enter Price"
                                    name="siteImage"
                                  />
                                </div>
                                <div className="col-lg-4 mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    3d Image
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    onChange={changeHandler2}
                                    type="file"
                                    required
                                    className="form-control"
                                    placeholder="Enter Price"
                                    name="image3d"
                                  />
                                </div>
                                <div className="col-lg-12 mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    Description{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <textarea
                                    type="file"
                                    onChange={e => {
                                      handleChange(e)
                                    }}
                                    required
                                    className="form-control"
                                    placeholder="Enter Description"
                                    name="description"
                                  />
                                </div>
                              </Row>
                            </div>
                          </TabPane>
                          <TabPane tabId={2}>
                            <div>
                              <div>
                                <h5>Amenities</h5>
                                <div className="row p-2 mb-3">
                                   <div className="col-lg-10">
                                   <Label for="name" style={{ color: "black" }}>
                                        Select Features : <span className="text-danger">*</span>
                                    </Label>
                                    <Select
                                        name="features"
                                        isMulti
                                        // onChange={ (e) => { handleChange1(e) } }
                                        value={selectedMulti1}
                                        onChange={handleMulti}
                                        options={banksid}
                                        required
                                    />
                                   </div>
                                </div>
                              </div>
                              <div>
                                <h5>Amenities</h5>
                                {inputList.map((x, i) => (
                                  <div key={i} className="box row p-3">
                                    <Col md={5}>
                                      <Label
                                        for="name"
                                        style={{ color: "black" }}
                                      >
                                        Title :{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        onChange={(e) => handleInputChange(e, i)}
                                        type="text"
                                        name="title"
                                        placeholder="Enter Title"
                                      />
                                    </Col>
                                    <Col md={5}>
                                      <Label
                                        for="name"
                                        style={{ color: "black" }}
                                      >
                                        Value :{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        onChange={(e) => handleInputChange(e, i)}
                                        type="text"
                                        name="value"
                                        placeholder="Enter Value"
                                      />
                                    </Col>
                                    <Col sm="2" style={{ marginTop: "30px" }}>
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
                                    </Col>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <h5>Highlights</h5>
                                {inputList1.map((x, i) => (
                                  <div key={i} className="box row p-3">
                                    <Col md={10}>
                                      <Label
                                        for="name"
                                        style={{ color: "black" }}
                                      >
                                        Title :{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        onChange={e => handleInputChange1(e, i)}
                                        type="text"
                                        name="title"
                                        placeholder="Enter Title"
                                      />
                                    </Col>
                                    <Col sm="2" style={{ marginTop: "30px" }}>
                                      <div className="btn-box">
                                        {inputList1.length !== 1 && (
                                          <button
                                            className="mr10 btn btn-outline-danger text-end btn-sm"
                                            style={{ float: "right" }}
                                            onClick={() =>
                                              handleRemoveClick1(i)
                                            }
                                          >
                                            Remove
                                          </button>
                                        )}
                                        {inputList1.length - 1 === i && (
                                          <button
                                            className="btn btn-outline-info btn-sm w-50"
                                            onClick={handleAddClick1}
                                          >
                                            Add
                                          </button>
                                        )}
                                      </div>
                                    </Col>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                      <div className="actions clearfix">
                        <ul>
                          <li>
                            <Button
                              color="danger"
                              onClick={() => {
                                setshow(!show)
                              }}
                            >
                              Cancel
                            </Button>
                          </li>
                          <li
                            className={
                              activeTab === 1 ? "previous disabled" : "previous"
                            }
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                toggleTab(activeTab - 1)
                              }}
                            >
                              Previous
                            </Link>
                          </li>
                          <li
                            className={activeTab === 2 ? "next d-none" : "next"}
                          >
                            <Link
                              to="#"
                              type="submit"
                              onClick={() => {
                                toggleTab(activeTab + 1)
                              }}
                            >
                              Next
                            </Link>
                          </li>
                          <li
                            className={activeTab !== 2 ? "next d-none" : "next"}
                          >
                            <Button
                              type="submit"
                              color="success"
                              // onClick={() => {
                              //   toggleTab(activeTab + 1)
                              // }}
                            >
                              Submit
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </div>
                      </form>
                  </CardBody>
                </Card>
              ) : (
                ""
              )}

              <Card>
                <CardBody>
                  <div>
                    <div className="table-responsive">
                      <Row>
                        <Col md="6">
                          {/* {permissioins.customerAdd === true || roles === "admin" ? ( */}
                          <Button
                            onClick={() => {
                              setshow(!show)
                            }}
                            color="primary"
                          >
                            Add New <i className="fas fa-plus-circle"></i>
                          </Button>
                        </Col>
                        <Col md="6">
                          <div style={{ float: "right" }}>
                            <Input
                              type="text"
                              name="search"
                              onChange={handleSearch}
                              className="form-control"
                              placeholder="Search..."
                            />
                          </div>
                        </Col>
                      </Row>

                      <Table className="table table-bordered mb-4 mt-5">
                        <thead>
                          <tr>
                            <th>S No</th>
                            <th> Category Name</th>
                            <th> Name</th>
                            <th> Image</th>
                            <th> Amount</th>

                            <th>Status</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <td>{(pageNumber - 1) * 5 + key + 6}</td>
                              <td>{data.subProduct} </td>
                              <td>{data.title}</td>

                              <td>
                                <img
                                  style={{ width: "100px" }}
                                  src={imgUrl + data.flatImages[0]}
                                />
                              </td>
                              <td>₹ {data.amount} </td>
                              <td>{data.status}</td>
                              <td>
                                  <Button
                                    onClick={() => {
                                      editRedirect(data)
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
          <Toaster/>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Partnermore
