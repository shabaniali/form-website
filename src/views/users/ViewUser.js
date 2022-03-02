import moment from 'jalali-moment'
import React, { Fragment, useEffect, useState } from 'react'
import BlockUi from 'react-block-ui'
import 'react-block-ui/dist/style.css'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit, Trash, X } from 'react-feather'
import { Row, Col, Card, Badge, CardHeader, CardTitle, Button, Modal, ModalHeader, ModalBody, Spinner, Label, FormGroup, Input } from 'reactstrap'
import { PanelServices } from '../../services/panelService'
import { HandleErrors } from '../../utility/Utils'

const resumeData = [
  {
    id: 1,
    title: 'سابقه کاری 1',
    income: 'درآمد 1',
    location: 'محل کار 1'
  },
  {
    id: 2,
    title: 'سابقه کاری 2',
    income: 'درآمد 2',
    location: 'محل کار 2'
  },
  {
    id: 3,
    title: 'سابقه کاری 3',
    income: 'درآمد 3',
    location: 'محل کار 3'
  },
  {
    id: 4,
    title: 'سابقه کاری 4',
    income: 'درآمد 4',
    location: 'محل کار 4'
  }
]

const skillsData = [
  {
    id: 1,
    title: 'مهارت 1'
  },
  {
    id: 2,
    title: 'مهارت 2'
  },
  {
    id: 3,
    title: 'مهارت 3'
  },
  {
    id: 4,
    title: 'مهارت 4'
  }
]

const requirementsData = [
  {
    id: 1,
    title: 'نیازمندی 1'
  },
  {
    id: 2,
    title: 'نیازمندی 2'
  },
  {
    id: 3,
    title: 'نیازمندی 3'
  },
  {
    id: 4,
    title: 'نیازمندی 4'
  }
]

const ViewUser = (props) => {
  const id = props.match.params.id

  // ** States
  const [resumeDeleteModal, setResumeDeleteModal] = useState('')
  const [resumeEditModal, setResumeEditModal] = useState('')
  const [skillDeleteModal, setSkillDeleteModal] = useState('')
  const [skillEditModal, setSkillEditModal] = useState('')
  const [requirementDeleteModal, setRequirementDeleteModal] = useState('')
  const [requirementEditModal, setRequirementEditModal] = useState('')
  const [data, setData] = useState({})
  const [spin, setSpin] = useState({
    page: true
  })

  // ** Function to get person
  const GetPerson = () => {
    const panelServices = new PanelServices
    panelServices.getPerson(id)
    .then((res) => {
      setSpin({...spin, page: false})
      console.log(res.data)
      setData(res.data)
    })
    .catch((err) => {
      setSpin({...spin, page: false})
      HandleErrors(err)
    })
  }

  useEffect(() => {
    GetPerson()
  }, [])

  const resumeColumns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'عنوان',
      selector: 'title',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'درآمد',
      selector: 'income',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'محل کار',
      selector: 'location',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'عملیات',
      allowOverflow: true,
      minWidth: '140px',
      cell: row => {
        return (
          <React.Fragment>
            <Edit className='ml-1 cursor-pointer' size={18} onClick={() => { setResumeEditModal(row.id) }}/>
            <Modal modalClassName={'modal-primary'} isOpen={resumeEditModal === row.id} toggle={() => setResumeEditModal('')}>
              <ModalHeader toggle={() => setResumeEditModal('')}>ویرایش {row.title}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for='jobTitle'>عنوان کار</Label>
                      <Input type='text' name='jobTitle' id='jobTitle' placeholder='عنوان کار' />
                    </FormGroup>
                  </Col>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for='income'>درآمد</Label>
                      <Input type='text' name='income' id='income' placeholder='درآمد' />
                    </FormGroup>
                  </Col>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for='location'>محل کار</Label>
                      <Input type='text' name='location' id='location' placeholder='محل کار' />
                    </FormGroup>
                  </Col>
                </Row>
                <div className='d-flex justify-content-center'>
                  <Button className='my-1 mx-auto' color='primary' onClick={() => setResumeEditModal('')}>
                    ویرایش
                  </Button>
                </div>
              </ModalBody>
            </Modal>
            <Trash className='ml-1 cursor-pointer' size={18} onClick={() => { setResumeDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={resumeDeleteModal === row.id} toggle={() => setResumeDeleteModal('')}>
              <ModalHeader toggle={() => setResumeDeleteModal('')}>حذف {row.title}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.title} اطمینان دارید؟</h4>
                </div>
                <div className='d-flex justify-content-center'> 
                  <Button className="my-2" color='danger' onClick={() => setResumeDeleteModal('')}>
                    حذف
                  </Button>
                </div>
              </ModalBody>
            </Modal>
          </React.Fragment>
        )
      }
    }
  ]

  const skillsColumns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'عنوان',
      selector: 'title',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'عملیات',
      allowOverflow: true,
      minWidth: '140px',
      cell: row => {
        return (
          <React.Fragment>
            <Edit className='ml-1 cursor-pointer' size={18} onClick={() => { setSkillEditModal(row.id) }}/>
            <Modal modalClassName={'modal-primary'} isOpen={skillEditModal === row.id} toggle={() => setSkillEditModal('')}>
              <ModalHeader toggle={() => setSkillEditModal('')}>ویرایش {row.title}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for='skill'>عنوان مهارت</Label>
                      <Input type='text' name='skill' id='skill' placeholder='عنوان مهارت' />
                    </FormGroup>
                  </Col>
                </Row>
                <div className='d-flex justify-content-center'>
                  <Button className='my-1 mx-auto' color='primary' onClick={() => setSkillEditModal('')}>
                    ویرایش
                  </Button>
                </div>
              </ModalBody>
            </Modal>
            <Trash className='ml-1 cursor-pointer' size={18} onClick={() => { setSkillDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={skillDeleteModal === row.id} toggle={() => setSkillDeleteModal('')}>
              <ModalHeader toggle={() => setSkillDeleteModal('')}>حذف {row.title}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.title} اطمینان دارید؟</h4>
                </div>
              </ModalBody>
              <div className='d-flex justify-content-center'> 
                <Button className="my-2" color='danger' onClick={() => setSkillDeleteModal('')}>
                  حذف
                </Button>
              </div>
            </Modal>
          </React.Fragment>
        )
      }
    }
  ]

  const requirementsColumns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'عنوان',
      selector: 'title',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'عملیات',
      allowOverflow: true,
      minWidth: '140px',
      cell: row => {
        return (
          <React.Fragment>
            <Edit className='ml-1 cursor-pointer' size={18} onClick={() => { setRequirementEditModal(row.id) }}/>
            <Modal modalClassName={'modal-primary'} isOpen={requirementEditModal === row.id} toggle={() => setRequirementEditModal('')}>
              <ModalHeader toggle={() => setRequirementEditModal('')}>ویرایش {row.title}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for='Requirement'>عنوان نیازمندی</Label>
                      <Input type='text' name='Requirement' id='Requirement' placeholder='عنوان نیازمندی' />
                    </FormGroup>
                  </Col>
                </Row>
                <div className='d-flex justify-content-center'>
                  <Button className='my-1 mx-auto' color='primary' onClick={() => setRequirementEditModal('')}>
                    ویرایش
                  </Button>
                </div>
              </ModalBody>
            </Modal>
            <Trash className='ml-1 cursor-pointer' size={18} onClick={() => { setRequirementDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={requirementDeleteModal === row.id} toggle={() => setRequirementDeleteModal('')}>
              <ModalHeader toggle={() => setRequirementDeleteModal('')}>حذف {row.title}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.title} اطمینان دارید؟</h4>
                </div>
              </ModalBody>
              <div className='d-flex justify-content-center'>
                <Button className="my-2" color='danger' onClick={() => setRequirementDeleteModal('')}>
                  حذف
                </Button>
              </div>
            </Modal>
          </React.Fragment>
        )
      }
    }
  ]

  return (
    <Fragment>
      {!spin.page ? (
        <Fragment>
          <div className='mb-2'>
            <h4>مشخصات فرد ({data.first_name} {data.last_name})</h4>
          </div>
          <Card className={'p-1'}>
            <Row>
              {/* <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>شماره پرونده:</h6>
                  <span>3938</span>
                </div>
              </Col> */}
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>نام:</h6>
                  <span>{data.first_name}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>نام خانوادگی:</h6>
                  <span>{data.last_name}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>نام پدر:</h6>
                  <span>{data.father_name}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>تاریخ تولد:</h6>
                  <span>{data.birthday && moment(data.birthday, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>شماره ملی:</h6>
                  <span>{data.national_number}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>شماره همراه:</h6>
                  <span>{data.phone_number}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>رشته تحصیل:</h6>
                  <span>{data.education_field}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>محل تحصیل:</h6>
                  <span>{data.education_location}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>سرپرست خانواده:</h6>
                  <div>
                    {data.is_leader ? 
                      <Badge color='light-success'>
                        می باشد
                      </Badge>
                   :
                    <Badge color='light-danger'>
                      نمی باشد
                    </Badge>
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
              <CardTitle tag='h4'>سوابق کاری</CardTitle>
            </CardHeader>
            <DataTable
              noHeader
              data={resumeData}
              columns={resumeColumns}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
            />
          </Card>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
              <CardTitle tag='h4'>مهارت ها</CardTitle>
            </CardHeader>
            <DataTable
              noHeader
              data={skillsData}
              columns={skillsColumns}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
            />
          </Card>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
              <CardTitle tag='h4'>نیازمندی ها</CardTitle>
            </CardHeader>
            <DataTable
              noHeader
              data={requirementsData}
              columns={requirementsColumns}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
            />
          </Card>
        </Fragment>
      ) : (
          <BlockUi
            className="spinnerContainer"
            blocking={spin.page}
            loader={<Spinner color="primary" />}
          ></BlockUi>
        )
      }
    </Fragment>
  )
}
export default ViewUser