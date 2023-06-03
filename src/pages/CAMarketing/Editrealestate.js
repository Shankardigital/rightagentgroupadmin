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
import Select from 'react-select'
import axios from "axios"
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

//   const [form, setbanner] = useState([])
  const [category, setcategory] = useState([])
  const [form, setform] = useState([])
  const [banks, setbanks] = useState([])
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

  const getAllbanks = async () => {
    const resonse = await addData("admin/realestate/features/getallactive")
    var _data = resonse
    setbanks(_data.data.feature)
  }

  const banksid = banks.map((data) => (
    { value: data._id, label: data.title }
))

  const getAllbenners = async () => {
    const bodydata = {
        id:sessionStorage.getItem("realestateid")
    }
    const resonse = await addData("admin/realestate/getbyid", bodydata)
    var _data = resonse
    setform(_data.data.realestate)
    setInputList(_data.data.realestate.amenities)
    setInputList1(_data.data.realestate.highlights)
    setselectedMulti1(_data.data.realestate.features.map((data) => ({ label: data.title, value: data._id })));

    // const selectedOptions = _data.data.realestate.features.map((data) => ({
    //   label: data.title,
    //   value: data._id
    // }));
    // setselectedMulti1(selectedOptions);
    // console.log(selectedOptions)

    // setselectedMulti1(_data.realestate.features.map((data) => ({ label: data.title, value: data._id })));

  }


  const [selectedMulti1, setselectedMulti1] = useState([])
  console.log(selectedMulti1)

  function handleMulti(data) {
      setselectedMulti1(data)
  }


  useEffect(() => {
    getAllbanks()
    handleChange2()
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
      const resonse = await addData("/admin/realestate/edit/" + sessionStorage.getItem("realestateid"), dataArray)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      getAllbenners()
      setFiles({flatImages:""})
      setFiles1({siteImage:""})
      setFiles2({image3d:""})
      setInputList({ title: "", value: "" })
      setInputList1({ title: ""})
     history.push("/realestate")
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Right Agent Group" breadcrumbItem="Real Estate" />

          <Row>
            <Col lg="12">
           
                <Card>
                  <CardBody>
                    <h4 className="card-title mb-4">Edit Real Estate</h4>
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
                                    value={form.subProductId}
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
                                    value={form.title}
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
                                    value={form.amount}
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
                                    value={form.description}
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
                                        value={x.title}
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
                                        value={x.value}
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
                                        value={x.title}
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
                            <Link className="bg-danger text-white" to="/realestate">
                   
                              
                            {/* //   onClick={() => {
                            //     setshow(!show)
                            //   }}
                            > */}
                              Cancel
                           
                            </Link>
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
            </Col>
          </Row>
          <Toaster/>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Partnermore
