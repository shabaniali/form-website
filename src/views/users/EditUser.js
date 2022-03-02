import React, { Fragment, useEffect, useState } from 'react'
import { Button, FormGroup, Row, Col, Input, Form, Label, Spinner, CardHeader, CardTitle, Modal, ModalHeader, ModalBody } from 'reactstrap'
import Select from 'react-select'
import {years, month, day} from '../../utility/Date'
import jalaali from 'jalaali-js'
import Card from 'reactstrap/lib/Card'
import { PanelServices } from '../../services/panelService'
import { HandleErrors } from '../../utility/Utils'
import BlockUi from 'react-block-ui'
import 'react-block-ui/dist/style.css'
import DataTable from 'react-data-table-component'
import moment from 'jalali-moment'
import { toast } from 'react-toastify'
import { ChevronDown, ChevronsDown, Edit, Trash, X } from 'react-feather'

const familyRole = [
  { value: 3, label: 'تعریف نشده' },
  { value: 0, label: 'پدر' },
  { value: 1, label: 'مادر' },
  { value: 2, label: 'فرزند' }
]

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

const EditUser = (props) => {
  const id = props.match.params.id

  // ** States
  const [data, setData] = useState({})
  const [editBtnDisable, setEdiBtnDisable] = useState()
  const [name, setName] = useState({
    firstName: '',
    lastName: ''
  })
  const [spin, setSpin] = useState({
    page: true,
    status: false,
    editPerson: false
  })
  const [date, setDate] = useState({
    y: years[0],
    m: month[0],
    d: day[0]
  })

  const [resumeDeleteModal, setResumeDeleteModal] = useState('')
  const [resumeEditModal, setResumeEditModal] = useState('')
  const [skillDeleteModal, setSkillDeleteModal] = useState('')
  const [skillEditModal, setSkillEditModal] = useState('')
  const [requirementDeleteModal, setRequirementDeleteModal] = useState('')
  const [requirementEditModal, setRequirementEditModal] = useState('')

  // ** Function to toggle leader
  const Toggleleader = (id, type) => {
    setSpin({...spin, status: true})
    const panelServices = new PanelServices
    panelServices.toggleLeader(id, type)
    .then((res) => {
      setSpin({...spin, status: false})
      setData({...data, is_leader: !data.is_leader})
      toast.success(`وضعیت سرپرست خانواده تغییر کرد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      setSpin({...spin, status: false})
      HandleErrors(err)
    })
  }

  // ** Function to get person
  const GetPerson = () => {
    const panelServices = new PanelServices
    panelServices.getPerson(id)
    .then((res) => {
      setSpin({...spin, page: false})
      console.log(res.data)
      setData(res.data)
      setName({firstName:res.data.first_name, lastName: res.data.last_name})
    })
    .catch((err) => {
      setSpin({...spin, page: false})
      HandleErrors(err)
    })
  }

  useEffect(() => {
    GetPerson()
  }, [])

  // ** Function to update person
  const UpdatePerson = () => {
    console.log(data)
    if (data.first_name === "") {
      toast.error(`نام فرد را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (data.last_name === "") {
      toast.error(`نام خانوادگی فرد را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (data.father_name === "") {
      toast.error(`نام پدر را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (data.birthday === "") {
      toast.error(`تاریخ تولد را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (data.national_number === "") {
      toast.error(`کدملی را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (data.phone_number === "") {
      toast.error(`شماره همراه را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (data.family_role === null) {
      toast.error(`نسبت فامیلی را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    setSpin({...spin, editPerson: true})
    const panelServices = new PanelServices
    panelServices.updatePerson(data)
    .then((res) => {
      setSpin({...spin, editPerson: false})
      toast.success(`فرد با موفقیت ویرایش شد!`, {
        autoClose: 2000
      })
      GetPerson()
    })
    .catch((err) => {
      setSpin({...spin, editPerson: false})
      HandleErrors(err)
    })
  }

  // ** Function to convert Date
  const DateConvert = (year, month, day) => {
    const isValid = jalaali.isValidJalaaliDate(year, month, day)
    if (isValid) {
      const Date = moment(
        `${year}/${month}/${day}`,
        'jYYYY/jMM/jDD'
      ).format('YYYY-MM-DD')
      setData({
        ...data,
        birthday: Date
      })
      setEdiBtnDisable(false)
    } else {
      setEdiBtnDisable(true)
      toast('تاریخ وارد شده معتبر نمیباشد!', {
        type: 'error',
        autoClose: 2000
      })
    }
  }


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
              <h4>ویرایش فرد ({name.firstName} {name.lastName})</h4>
            </div>
            <Card className={'p-1'}>
              <Form>
                <Row>
                  {/* <Col sm='12'>
                    <FormGroup>
                      <Label for='fileId'>شماره پرونده*</Label>
                      <Input type='text' disabled name='fileId' id='fileId' placeholder='شماره پرونده' />
                    </FormGroup>
                  </Col> */}
                  <Col sm='12'>
                    <div className='d-flex align-items-center mb-2 mt-1'>
                      <Label className='mr-1 mb-0' for='icon-primary'>سرپرست خانوده:</Label>
                      <Fragment>
                        {data.is_leader ? 
                          <Button.Ripple onClick={() => { Toggleleader(data.id, 'clear-leader') }} size={'sm'} color='success'>{spin.status ? <Spinner size={'sm'} /> : "می باشد."}</Button.Ripple>
                          :
                          <Button.Ripple onClick={() => { Toggleleader(data.id, 'set-leader') }} size={'sm'} color='danger'>{spin.status ? <Spinner size={'sm'} /> : "نمی باشد."}</Button.Ripple>
                        }
                      </Fragment>
                    </div>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='nameMulti'>نام*</Label>
                      <Input value={data.first_name} onChange={(e) => { setData({...data, first_name: e.target.value}) }} type='text' name='name' id='nameMulti' placeholder='نام' />
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='lastNameMulti'>نام خانوادگی*</Label>
                      <Input value={data.last_name} onChange={(e) => { setData({...data, last_name: e.target.value}) }} type='text' name='lastname' id='lastNameMulti' placeholder='نام خانوادگی' />
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='fatherName'>نام پدر*</Label>
                      <Input value={data.father_name} onChange={(e) => { setData({...data, father_name: e.target.value}) }} type='text' name='fatherName' id='fatherName' placeholder='نام پدر' />
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='CountryMulti'>تاریخ تولد* ({data.birthday && moment(data.birthday, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')})</Label>
                        <Row justify={'center'}>
                          <Col xs={4}>
                            <Select
                              className='react-select'
                              classNamePrefix='select'
                              placeholder="سال"
                              options={years}
                              isClearable={false}
                              onChange={(year) => {
                                setDate({ ...date, y: year })
                                DateConvert(
                                  year.value,
                                  date.m.value,
                                  date.d.value
                                )
                              }}
                            />
                          </Col>
                          <Col xs={4}>
                            <Select
                              className='react-select'
                              classNamePrefix='select'
                              placeholder="ماه"
                              options={month}
                              isClearable={false}
                              onChange={(month) => {
                                setDate({ ...date, m: month })
                                DateConvert(
                                  date.y.value,
                                  month.value,
                                  date.d.value
                                )
                              }}
                            />
                          </Col>
                          <Col xs={4}>
                            <Select
                              className='react-select'
                              classNamePrefix='select'
                              placeholder="روز"
                              options={day}
                              isClearable={false}
                              onChange={(day) => {
                                setDate({ ...date, d: day })
                                DateConvert(
                                  date.y.value,
                                  date.m.value,
                                  day.value
                                )
                              }}
                            />
                          </Col>
                        </Row>
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='nationalId'>شماره ملی*</Label>
                      <Input value={data.national_number} onChange={(e) => { setData({...data, national_number: e.target.value}) }} type='text' name='nationalId' id='nationalId' placeholder='شماره ملی' />
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='phoneNumber'>شماره همراه*</Label>
                      <Input value={data.phone_number} onChange={(e) => { setData({...data, phone_number: e.target.value}) }} type='text' name='phoneNumber' id='phoneNumber' placeholder='شماره همراه' />
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='fieldOfStudy'>رشته تحصیل</Label>
                      <Input value={data.education_field} onChange={(e) => { setData({...data, education_field: e.target.value}) }} type='text' name='fieldOfStudy' id='fieldOfStudy' placeholder='رشته تحصیل' />
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='educationPlace'>محل تحصیل</Label>
                      <Input value={data.education_location} onChange={(e) => { setData({...data, education_location: e.target.value}) }} type='text' name='educationPlace' id='educationPlace' placeholder='محل تحصیل' />
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='educationPlace'>توضیحات</Label>
                      <Input value={data.description} onChange={(e) => { setData({...data, description: e.target.value}) }} type='text' name='educationPlace' id='educationPlace' placeholder='توضیحات' />
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                  <Label>نسبت فامیلی ({
                      familyRole.map((item) => {
                          if (item.value === data.family_role) {
                            return (
                              item.label
                            ) 
                          }
                        }) 
                      })
                    </Label>
                    <Select
                      placeholder="نسبت فامیلی"
                      className='react-select'
                      classNamePrefix='select'
                      onChange={(e) => { setData({...data, family_role: e.value}) }}
                      options={familyRole}
                      isClearable={false}
                    />
                  </Col>
                  <Col sm='12'>
                    <FormGroup className='d-flex justify-content-center w-100 mb-0'>
                      <div className='mb-2 mt-2'>
                        <Button.Ripple disabled={editBtnDisable} color='primary' onClick={() => { UpdatePerson() }}>
                          {spin.editPerson ? <Spinner size={'sm'} /> : "ویرایش فرد"}
                        </Button.Ripple>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
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
                sortIcon={<ChevronsDown size={10} />}
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
export default EditUser