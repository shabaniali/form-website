import { Fragment, useState } from 'react'
import { Button, Modal, ModalBody, FormGroup, Row, Col, Input, Form, Label, CustomInput } from 'reactstrap'
import Select from 'react-select'
import { Check, Plus, X } from 'react-feather'
import {years, month, day} from '../../utility/Date'
import RepeatingForm from '../../components/RepeatingForm'

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

const NewUser = () => {
  const [modal, setModal] = useState(null)

  const toggleModal = () => {
    setModal(!modal)
  }

  const submit = (e) => {
    e.preventDefault()
    toggleModal()
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
              <h4>افزودن فرد به پرونده</h4>
              <p>ابتدا مشخصات فرد را وارد کنید سپس آن را به پرونده اضافه کنید.</p>
            </div>
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
                        افزودن به پرونده
                      </Button.Ripple>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    )
}
export default NewUser