import { Fragment } from 'react'
import { Button, FormGroup, Row, Col, Input, Form, Label, CustomInput } from 'reactstrap'
import Select from 'react-select'
import { Check, X } from 'react-feather'
import {years, month, day} from '../../utility/Date'
import RepeatingForm from '../../components/RepeatingForm'
import Card from 'reactstrap/lib/Card'

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

const EditUser = () => {

  const submit = (e) => {
    e.preventDefault()
  }

    return (
      <Fragment>
        <div className='mb-2'>
          <h4>ویرایش فرد (علی اصغر شعبانی)</h4>
        </div>
        <Card className={'p-1'}>
          <Form>
            <Row>
              <Col sm='12'>
                <FormGroup>
                  <Label for='fileId'>شماره پرونده*</Label>
                  <Input type='text' disabled name='fileId' id='fileId' placeholder='شماره پرونده' />
                </FormGroup>
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
              <Col sm='12' className='mt-2'>
                <h6>سوابق کاری</h6>
                <RepeatingForm placeholder='سابقه کاری'/>
              </Col>
              <Col sm='12' className='mt-2'>
                <h6>مهارت ها</h6>
                <RepeatingForm placeholder='مهارت'/>
              </Col>
              <Col sm='12' className='mt-2'>
                <h6>نیازمندی ها</h6>
                <RepeatingForm placeholder='نیازمندی'/>
              </Col>
              <Col sm='12'>
                <div className='d-flex align-items-center mt-1'>
                  <Label className='mr-1 mb-0' for='icon-primary'>سرپرست خانوده:</Label>
                  <CustomInput type='switch' label={<CustomLabel />} id='icon-primary' name='icon-primary' inline defaultChecked />
                </div>
              </Col>
              <Col sm='12'>
                <FormGroup className='d-flex justify-content-center w-100 mb-0'>
                  <div className='mb-2 mt-3'>
                    <Button.Ripple color='primary' onClick={(e) => { submit(e) }}>
                      ویرایش
                    </Button.Ripple>
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Card>
      </Fragment>
    )
}
export default EditUser