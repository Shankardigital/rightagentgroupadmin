import React, { useEffect, useState } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import axios from "axios"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
// import { URL } from "Apiurls"
import toast, { Toaster } from 'react-hot-toast';
// import { ToastContainer, toast } from "react-toastify"
import { addData, updateData } from "Servicescalls"
import { imgUrl } from "Baseurls"

function PrivacyPolicy() {
  const [form, setform] = useState([])

  console.log(form)


  const getTerms = async() => {
    const resonse = await addData("companypolicy/getprivacypolicy")
    var _data = resonse
    setform(_data.data.policyResult)
  }

  
  useEffect(() => {
    getTerms()
  }, [])

  const [modal_small, setmodal_small] = useState(false)
  function tog_small() {
    setmodal_small(!modal_small)
    removeBodyCss()
  }

  const [text1, setText1] = useState([])
  const [text2, setText2] = useState([])

  const getpopup1 = (forms) => {
    setText1(forms)
    setText2(form._id)
    console.log
    tog_small()
  }

  const submibooking = e => {
    e.preventDefault()
    changstatus()
  }

  const changstatus = async() => {
    const bodydata = {
      privacyPolicy:text1
    }

    try {
      const resonse = await updateData("companypolicy/edit/" + text2, bodydata)
      var _data = resonse
      toast.success(_data.data.message)
            setmodal_small(false)
            getTerms()
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Right Agent Group" breadcrumbItem="Privacy Policy" />
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader className="bg-white"></CardHeader>

                <CardBody>
                  <div style={{ float: "right" }}>
               
                    <Button
                    style={{width:"70px"}}
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Edit Booking"
                      onClick={() => {
                        getpopup1(form.privacyPolicy)
                      }}
                      className="mr-5"
                      color="primary"
                      outline
                    >
                      <span>Edit</span>
                    </Button>
     

                  </div>
                  <div>
                    <div>
                      <div
                      className="mt-5"
                      dangerouslySetInnerHTML={{
                        __html: form.privacyPolicy,
                      }}
                    ></div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
   

          <Modal
            size="lg"
            isOpen={modal_small}
            toggle={() => {
              tog_small()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Edit Terms & Condition
              </h5><button
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

            <Form
              onSubmit={e => {
                submibooking(e)
              }}
            >
              <div className="modal-body">
                <CKEditor
                  editor={ClassicEditor}
                  id="header"
                  data={text1}
                  onReady={editor => {
                    console.log("Editor is ready to use!", editor)
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setText1(data)
                  }}
                />
              </div>

              <hr></hr>
              <div style={{ float: "right" }} className="m-2">
                <Button className="m-1" color="primary" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
                <Button
                  onClick={() => {
                    setmodal_small(false)
                  }}
                  color="danger"
                  type="button"
                >
                  Cancel <i className="fas fa-times-circle"></i>
                </Button>
              </div>
            </Form>
          </Modal>
        </Container>
        <Toaster />
      </div>
    </React.Fragment>
  )
}

export default PrivacyPolicy