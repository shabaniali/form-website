import { Fragment, useEffect, useState } from 'react'
import { Button, Modal, ModalBody, FormGroup, Row, Col, Input, Form, Label, Spinner, Badge } from 'reactstrap'
import Select from 'react-select'
import { Plus, X } from 'react-feather'
import {years, month, day} from '../../utility/Date'
import { PanelServices } from '../../services/panelService'
import { toast } from 'react-toastify'
import { HandleErrors } from '../../utility/Utils'
import jalaali from 'jalaali-js'
import moment from 'jalali-moment'

const familyRole = [
  { value: 3, label: 'تعریف نشده' },
  { value: 0, label: 'پدر' },
  { value: 1, label: 'مادر' },
  { value: 2, label: 'فرزند' }
]

const NewUser = (props) => {
  // ** States
  const [modal, setModal] = useState(null)
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    father_name: '',
    birthday: '',
    national_number: '',
    phone_number: '',
    is_leader: true,
    education_field: '',
    education_location: '',
    case_id: '',
    description: '',
    family_role: null
  })
  const [date, setDate] = useState({
    y: years[0],
    m: month[0],
    d: day[0]
  })
  const [created, setCreated] = useState(false)
  const [addBtnDisable, setAddBtnDisable] = useState()
  const [personId, setPersonId] = useState()
  const [spin, setSpin] = useState({
    add: false,
    job: false,
    skill: false,
    requirement: false
  })
  const [job, setJob] = useState({
    person_id: '',
    title: '',
    income: '',
    location: ''
  })
  const [skill, setSkill] = useState('')
  const [requirement, setRequirement] = useState('')

  const toggleModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    const caseID = props.caseId
    setData({...data, case_id: caseID})
  }, [data.first_name])

  // ** Function to add person to case
  const addPerson = () => {
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
    setSpin({...spin, add: true})
    const panelServices = new PanelServices
    panelServices.addPersonToCase(data)
    .then((res) => {
      setSpin({...spin, add: false})
      setPersonId(res.data.id)
      setJob({...job, person_id: res.data.id})
      toast.success(`فرد با موفقیت اضافه شد!`, {
        autoClose: 2000
      })
      console.log(props.caseId)
      props.getPersonsList(props.caseId)
      setCreated(true)
    })
    .catch((err) => {
      setSpin({...spin, add: false})
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
      setAddBtnDisable(false)
    } else {
      setAddBtnDisable(true)
      toast('تاریخ وارد شده معتبر نمیباشد!', {
        type: 'error',
        position: 'top-center',
        autoClose: 4000
      })
    }
  }

  // ** Function to clear states
  const newPerson = () => {
    setData({
      first_name: '',
      last_name: '',
      father_name: '',
      birthday: '',
      national_number: '',
      phone_number: '',
      is_leader: true,
      education_field: '',
      education_location: '',
      case_id: '',
      description: '',
      family_role: null
    })
    setDate({
      y: years[0],
      m: month[0],
      d: day[0]
    })
    setCreated(false)
    setJob({
      person_id: '',
      title: '',
      income: null,
      location: ''
    })
    setSkill('')
    setRequirement('')
  }

  // ** Function to get all jobs
  const getJobs = () => {
    const panelServices = new PanelServices
    panelServices.getAllJobs(personId)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  // ** Function to add new job
  const newJob = () => {
    if (job.title === "") {
      toast.error(`عنوان شغل را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (job.income === "") {
      toast.error(`درآمد را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (job.location === "") {
      toast.error(`محل کار را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    console.log(job)
    setSpin({...spin, job: true})
    const panelServices = new PanelServices
    panelServices.addJob(job)
    .then((res) => {
      setSpin({...spin, job: false})
      getJobs()
      toast.success(`سابقه کاری با موفقیت اضافه شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      setSpin({...spin, job: false})
      HandleErrors(err)
    })
  }

  // ** Function to get all skills
  const getSkills = () => {
    const panelServices = new PanelServices
    panelServices.getAllSkills(personId)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  // ** Function to add new skill
  const newSkill = () => {
    if (skill === "") {
      toast.error(`عنوان مهارت را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    const data = {
      person_id: personId,
      skill
    }
    setSpin({...spin, skill: true})
    const panelServices = new PanelServices
    panelServices.addSkill(data)
    .then((res) => {
      setSpin({...spin, skill: false})
      getSkills()
      toast.success(`مهارت جدید با موفقیت اضافه شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      setSpin({...spin, skill: false})
      HandleErrors(err)
    })
  }

  // ** Function to get all requirements
  const getRequirements = () => {
    const panelServices = new PanelServices
    panelServices.getAllRequirements(personId)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  // ** Function to add new requirement
  const newRequirement = () => {
    if (requirement === "") {
      toast.error(`عنوان نیازمندی را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    const data = {
      person_id: personId,
      description: requirement
    }
    setSpin({...spin, requirement: true})
    const panelServices = new PanelServices
    panelServices.addRequirement(data)
    .then((res) => {
      setSpin({...spin, requirement: false})
      getRequirements()
      toast.success(`نیازمندی جدید با موفقیت اضافه شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      setSpin({...spin, requirement: false})
      HandleErrors(err)
    })
  }

    return (
      <Fragment>
        <Button size={'sm'} color='primary' onClick={() => toggleModal()}>
          <Plus size={15} />
          <span className='align-middle ml-50'>عضو جدید</span>
        </Button>
        <Modal
          isOpen={modal}
          toggle={() => toggleModal()}
          className='modal-dialog-centered modal-lg'
        >
          <ModalBody>
            <div className='d-flex flex-column align-items-center mt-3 mb-2'>
              <h4>افزودن فرد به پرونده {props.caseNumber}</h4>
              <p>ابتدا مشخصات فرد را وارد کنید سپس آن را به پرونده اضافه کنید.</p>
            </div>
            <Form>
              <Row>
                <Col sm='12'>
                  <FormGroup>
                    <Label for='fileId'>شماره پرونده*</Label>
                    <Input type='text' disabled name='fileId' id='fileId' placeholder={props.caseNumber} />
                  </FormGroup>
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
                    <Label for='CountryMulti'>تاریخ تولد*</Label>
                      <Row justify={'center'}>
                        <Col xs={4}>
                          <Select
                            className="react-select"
                            classNamePrefix="select"
                            placeholder="سال"
                            value={date.y}
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
                            className="react-select"
                            classNamePrefix="select"
                            placeholder="ماه"
                            value={date.m}
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
                            className="react-select"
                            classNamePrefix="select"
                            placeholder="روز"
                            value={date.d}
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
                    <Label for='fieldOfStudy'>رشته تحصیلی</Label>
                    <Input value={data.education_field} onChange={(e) => { setData({...data, education_field: e.target.value}) }} type='text' name='fieldOfStudy' id='fieldOfStudy' placeholder='رشته تحصیلی' />
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
                  <Label>نسبت فامیلی</Label>
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
                  <div className='d-flex align-items-center mt-1'>
                    <FormGroup check inline>
                      <Input onChange={() => { setData({...data, is_leader: !data.is_leader}) }} type='checkbox' defaultChecked id='basic-cb-checked' />
                      <Label for='basic-cb-checked' check>
                        سرپرست خانواده
                      </Label>
                    </FormGroup>
                  </div>
                </Col>
                {!created ?
                  <Col sm='12'>
                    <FormGroup className='d-flex justify-content-center w-100 mb-0'>
                      <div className='mb-2 mt-2'>
                        <Button.Ripple disabled={addBtnDisable} color='primary' onClick={() => { addPerson() }}>
                          {spin.add ? <Spinner size={'sm'} /> : "افزودن فرد به پرونده"}
                        </Button.Ripple>
                      </div>
                    </FormGroup>
                  </Col>
                  :
                  <Col sm='12'>
                    <FormGroup className='d-flex justify-content-center w-100 mb-0'>
                      <div className='mb-2 mt-2'>
                        <Button.Ripple color='primary' onClick={() => { newPerson() }}>
                          افزودن فرد جدید
                        </Button.Ripple>
                      </div>
                    </FormGroup>
                  </Col>
                }
                {created && 
                <Fragment>
                  <Col sm='12' className='my-2'>
                    <div> 
                      <h6 className='mb-1'>سوابق کاری</h6>
                      <div className='d-flex align-items-start flex-column'>
                        <Badge color='primary' className="mb-1">
                          <X size={12} className='align-middle cursor-pointer me-25' />
                          {" "}
                          <span className='align-middle'>عنوان: سابقه کار</span>
                        </Badge>
                      </div>
                      <Row>
                        <Col xs={12} md={4}>
                          <FormGroup>
                            <Label for='jobTitle'>عنوان شغل</Label>
                            <Input value={job.title} onChange={(e) => { setJob({...job, title: e.target.value}) }} type='text' name='jobTitle' id='jobTitle' placeholder='عنوان شغل' />
                          </FormGroup>
                        </Col>
                        <Col xs={12} md={4}>
                          <FormGroup>
                            <Label for='income'>درآمد</Label>
                            <Input value={job.income} onChange={(e) => { setJob({...job, income: parseInt(e.target.value)}) }} type='text' name='income' id='income' placeholder='درآمد' />
                          </FormGroup>
                        </Col>
                        <Col xs={12} md={4}>
                          <FormGroup>
                            <Label for='location'>محل کار</Label>
                            <Input value={job.location} onChange={(e) => { setJob({...job, location: e.target.value}) }} type='text' name='location' id='location' placeholder='محل کار' />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button.Ripple disabled={spin.job} onClick={() => { newJob() }} size="sm" color='primary'>
                        {spin.job ? 
                        <Spinner size={'sm'} />
                        :
                        <Fragment>
                          <Plus size={14} /> {" "}
                          <span className='align-middle ms-25'>افزودن سابقه کار</span>
                        </Fragment>
                        }
                      </Button.Ripple>
                    </div>
                  </Col>
                  <Col sm='12' className='my-2'>
                    <div> 
                      <h6 className='mb-1'>مهارت ها</h6>
                      <div className='d-flex align-items-start flex-column'>
                        <Badge color='warning' className="mb-1">
                          <X size={12} className='align-middle cursor-pointer me-25' />
                          {" "}
                          <span className='align-middle'>عنوان: مهارت 1</span>
                        </Badge>
                      </div>
                      <Row>
                        <Col xs={12} md={4}>
                          <FormGroup>
                            <Label for='skillTitle'>عنوان مهارت</Label>
                            <Input value={skill} onChange={(e) => { setSkill(e.target.value) }} type='text' name='skillTitle' id='skillTitle' placeholder='عنوان مهارت' />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button.Ripple disabled={spin.skill} onClick={() => { newSkill() }} size="sm" color='warning'>
                        {spin.skill ? 
                        <Spinner size={'sm'} />
                        :
                        <Fragment>
                          <Plus size={14} /> {" "}
                          <span className='align-middle ms-25'>افزودن مهارت</span>
                        </Fragment>
                        }
                      </Button.Ripple>
                    </div>
                  </Col>
                  <Col sm='12' className='my-2'>
                    <div> 
                      <h6 className='mb-1'>نیازمندی ها</h6>
                      <div className='d-flex align-items-start flex-column'>
                        <Badge color='success' className="mb-1">
                          <X size={12} className='align-middle cursor-pointer me-25' />
                          {" "}
                          <span className='align-middle'>عنوان: نیازمندی 1</span>
                        </Badge>
                      </div>
                      <Row>
                        <Col xs={12} md={4}>
                          <FormGroup>
                            <Label for='requirementTitle'>عنوان نیازمندی</Label>
                            <Input value={requirement} onChange={(e) => { setRequirement(e.target.value) }} type='text' name='requirementTitle' id='requirementTitle' placeholder='عنوان نیازمندی' />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button.Ripple disabled={spin.requirement} onClick={() => { newRequirement() }} size="sm" color='success'>
                        {spin.requirement ? 
                        <Spinner size={'sm'} />
                        :
                        <Fragment>
                          <Plus size={14} /> {" "}
                          <span className='align-middle ms-25'>افزودن نیازمندی</span>
                        </Fragment>
                        }
                      </Button.Ripple>
                    </div>
                  </Col>
                </Fragment>            
                }
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    )
}
export default NewUser