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

const Basicdetails = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [banner, setbanner] = useState([])
  const [types, settypes] = useState([])
  const [form, setform] = useState({ productId: "", subProduct: "" })
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

  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }

  const [items, setItems] = useState([])
  const [userinfo, setuserinfo] = useState([])
  console.log(items.token)
  console.log(userinfo)

  // get all function

  const getAllbenners = async () => {
    const resonse = await addData("admin/contactus/get")
    var _data = resonse
    setform(_data.data.contactus)
  }

  useEffect(() => {
    getAllbenners()
  }, [])

  // Edit fuction
  const editbenners = async e => {
    e.preventDefault()
    const bodydata = {
        eamil: form.eamil,
        mobileNumber: form.mobileNumber,
        address: form.address,
        description: form.description,
        facebooklink: form.facebooklink,
        instagramlink: form.instagramlink,
        twitterlink: form.twitterlink,
        linkedinlink: form.linkedinlink,
    }
    try {
      const resonse = await addData(
        "admin/contactus/edit",
        bodydata
      )
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setform1({ productId: "", subProduct: "" })
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Right Agent Group"
            breadcrumbItem="Basic Details"
          />
          {/* {permissioins.banner === true || roles === "admin" ? ( */}

          <Row>
            <Col md={12}>
              <Card>
                <CardHeader className="bg-white">
                  
                </CardHeader>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                    editbenners(e)
                    }}
                  >
                    <CardTitle>Eidt Basic Details</CardTitle>
                    <Row>

                      <Col md="3">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                           Email id <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            onChange={e => {
                              handleChange(e)
                            }}
                            name="eamil"
                            required
                            placeholder="Enter Email id"
                            value={form.eamil}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                           Mobile <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            onChange={e => {
                              handleChange(e)
                            }}
                            name="mobileNumber"
                            required
                            placeholder="Enter Mobile"
                            value={form.mobileNumber}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                           Address <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            onChange={e => {
                              handleChange(e)
                            }}
                            name="address"
                            required
                            placeholder="Enter Address"
                            value={form.address}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                           Description <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            onChange={e => {
                              handleChange(e)
                            }}
                            name="description"
                            required
                            placeholder="Enter Description"
                            value={form.description}
                          />
                        </div>
                      </Col>
                    </Row>
                    <CardTitle>Eidt Social media</CardTitle>
                    <Row>

                      <Col md="3">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                           Facebook<span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            onChange={e => {
                              handleChange(e)
                            }}
                            name="facebooklink"
                            required
                            placeholder="Enter Facebook Link"
                            value={form.facebooklink}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                          Instagram <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            onChange={e => {
                              handleChange(e)
                            }}
                            name="instagramlink"
                            required
                            placeholder="Enter Instagram Link"
                            value={form.instagramlink}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                          Linkedin <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            onChange={e => {
                              handleChange(e)
                            }}
                            name="linkedinlink"
                            required
                            placeholder="Enter Linkedin Link"
                            value={form.linkedinlink}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                          Twitter <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            onChange={e => {
                              handleChange(e)
                            }}
                            name="twitterlink"
                            required
                            placeholder="Enter Twitter Link"
                            value={form.twitterlink}
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="mt-4" style={{ float: "right" }}>
                      <Button color="primary" type="submit">
                        Submit <i className="fas fa-check-circle"></i>
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Toaster />
      </div>
    </React.Fragment>
  )
}

export default Basicdetails
