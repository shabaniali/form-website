import { Fragment, useEffect, useState } from 'react'
import { Button, FormGroup, Row, Col, Input, Form, Label, CustomInput, Spinner } from 'reactstrap'
import Select from 'react-select'
import { Check, X } from 'react-feather'
import {years, month, day} from '../../utility/Date'
import RepeatingForm from '../../components/RepeatingForm'
import Card from 'reactstrap/lib/Card'
import { PanelServices } from '../../services/panelService'
import { HandleErrors } from '../../utility/Utils'

const CustomLabel = () => (
  <Fragment>
    <span className='switch-icon-left'>
      <Check size={14} />
    </span>
    <span className='switch-icon-right'>
      <X size={14} />
    </span>
  </Fragment>
)

const EditUser = (props) => {
  const id = props.match.params.id

  // ** States
  const [data, setData] = useState({})
  const [spin, setSpin] = useState({
    page: true,
    status: false,
    editPerson: false
  })

  const submit = (e) => {
    e.preventDefault()
  }

  // ** Function to toggle leader
  const Toggleleader = (id, type) => {
    setSpin({...spin, status: true})
    const panelServices = new PanelServices
    panelServices.toggleLeader(id, type)
    .then((res) => {
      setSpin({...spin, status: false})
      setData({...data, is_leader: !data.is_leader})
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
    })
    .catch((err) => {
      setSpin({...spin, page: false})
      HandleErrors(err)
    })
  }

  useEffect(() => {
    GetPerson()
  }, [])

    return (
      <Fragment>
        <div className='mb-2'>
          <h4>ویرایش فرد (علی اصغر شعبانی)</h4>
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
                  <Input type='text' name='name' id='nameMulti' placeholder='نام' />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label for='lastNameMulti'>نام خانوادگی*</Label>
                  <Input type='text' name='lastname' id='lastNameMulti' placeholder='نام خانوادگی' />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label for='fatherName'>نام پدر*</Label>
                  <Input type='text' name='fatherName' id='fatherName' placeholder='نام پدر' />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label for='CountryMulti'>تاریخ تولد*</Label>
                    <Row justify={'center'}>
                      <Col xs={4}>
                        <Select
                          className='react-select'
                          classNamePrefix='select'
                          placeholder="سال"
                          options={years}
                          isClearable={false}
                        />
                      </Col>
                      <Col xs={4}>
                        <Select
                          className='react-select'
                          classNamePrefix='select'
                          placeholder="ماه"
                          options={month}
                          isClearable={false}
                        />
                      </Col>
                      <Col xs={4}>
                        <Select
                          className='react-select'
                          classNamePrefix='select'
                          placeholder="روز"
                          options={day}
                          isClearable={false}
                        />
                      </Col>
                    </Row>
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label for='nationalId'>شماره ملی*</Label>
                  <Input type='text' name='nationalId' id='nationalId' placeholder='شماره ملی' />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label for='phoneNumber'>شماره همراه*</Label>
                  <Input type='text' name='phoneNumber' id='phoneNumber' placeholder='شماره همراه' />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label for='fieldOfStudy'>رشته تحصیل</Label>
                  <Input type='text' name='fieldOfStudy' id='fieldOfStudy' placeholder='رشته تحصیل' />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label for='educationPlace'>محل تحصیل</Label>
                  <Input type='text' name='educationPlace' id='educationPlace' placeholder='محل تحصیل' />
                </FormGroup>
              </Col>
              <Col sm='12'>
                <FormGroup className='d-flex justify-content-center w-100 mb-0'>
                  <div className='my-2'>
                    <Button.Ripple color='primary' onClick={(e) => { submit(e) }}>
                      ویرایش
                    </Button.Ripple>
                  </div>
                </FormGroup>
              </Col>
              <Col sm='12' className='mb-2'>
                <h6>سوابق کاری</h6>
                <RepeatingForm placeholder='سابقه کاری'/>
              </Col>
              <Col sm='12' className='mt-3 mb-2'>
                <h6>مهارت ها</h6>
                <RepeatingForm placeholder='مهارت'/>
              </Col>
              <Col sm='12' className='mt-3 mb-2'>
                <h6>نیازمندی ها</h6>
                <RepeatingForm placeholder='نیازمندی'/>
              </Col>
            </Row>
          </Form>
        </Card>
      </Fragment>
    )
}
export default EditUser