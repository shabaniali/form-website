import { Fragment, useEffect, useState } from 'react'
import { Card, Input, Label, Button, FormGroup, Row, Col, Spinner } from 'reactstrap'
import NewUser from '../users/NewUser'
import PersonsFileList from './PersonsFileList'
import BlockUi from 'react-block-ui'
import 'react-block-ui/dist/style.css'
import { PanelServices } from '../../services/panelService'
import { HandleErrors } from '../../utility/Utils'
import { toast } from 'react-toastify'

const EditFile = (props) => {
  const id = props.match.params.id
  
  // ** States
  const [data, setData] = useState({})
  const [spin, setSpin] = useState({
    page: true,
    status: '',
    editCase: false
  })
  const [casePersons, setCasePersons] = useState([])

  // ** Function to get persons of case
  const getPersons = () => {
    const panelServices = new PanelServices
    panelServices.getAllCasePersons(id)
    .then((res) => {
      setCasePersons(res.data)
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  const getPersonsList = () => { 
    getPersons(data.id)
  }

  // ** Function to get case data
  const getCase = () => {
    const panelServices = new PanelServices
    panelServices.getCase(id)
    .then((res) => {
      setSpin({...spin, page: false})
      setData(res.data)
    })
    .catch((err) => {
      setSpin({...spin, page: false})
      HandleErrors(err)
    })
  }

  // ** Function to change case status
  const changeStatus = (id, type) => {
    setSpin({...spin, status: id})
    const panelServices = new PanelServices
    panelServices.changeStatus(id, type)
    .then((res) => {
      setSpin({...spin, status: ''})
      getCase()
    })
    .catch((err) => {
      setSpin({...spin, status: ''})
      HandleErrors(err)
    })
  }

  useEffect(() => {
    getCase()
    getPersons()
  }, [])

  // ** Function to edit case
  const EditCase = () => {
    setSpin({...spin, editCase: true})
    const panelServices = new PanelServices
    panelServices.updateCase(data)
    .then((res) => {
      setSpin({...spin, editCase: false})
      toast.success(`آدرس پرونده با موفقیت ویرایش شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      setSpin({...spin, editCase: false})
      HandleErrors(err)
    })
  }

  return (
    <Fragment>
      {!spin.page ? (
        <Fragment>
          <h4 className='mb-2'>ویرایش پرونده {data.number}</h4>
          <Card className='p-1'>
            <div className='d-flex align-items-center my-1'>
              <h5 className='mr-1 mb-0'>وضعیت پرونده:</h5>
              <Fragment>
                {data.active ? 
                  <Button.Ripple onClick={() => { changeStatus(data.id, 'deactivate') }} size={'sm'} color='success'>{spin.status === data.id ? <Spinner size={'sm'} /> : "فعال"}</Button.Ripple>
                  :
                  <Button.Ripple onClick={() => { changeStatus(data.id, 'activate') }} size={'sm'} color='danger'>{spin.status === data.id ? <Spinner size={'sm'} /> : "غیرفعال"}</Button.Ripple>
                }
              </Fragment>
            </div>
            <div className='form-label-group mt-2'>
              <Input value={data.address} onChange={(e) => { setData({...data, address: e.target.value}) }} type='textarea' name='text' id='exampleText' rows='3' placeholder='آدرس پرونده' />
              <Label>آدرس پرونده</Label>
            </div>
            <FormGroup className='d-flex justify-content-center w-100 mb-0'>
              <div className='mb-2 mt-1'>
                <Button.Ripple color='primary' onClick={() => { EditCase() }}>
                  {spin.editCase ? <Spinner size={'sm'} /> : "ویرایش"}
                </Button.Ripple>
              </div>
            </FormGroup>
            <Row>
              <Col className="mb-2" sm='12'>
                <PersonsFileList getPersonsList={getPersons} data={casePersons} />
                <div className='mb-1'>
                  <NewUser caseId={data.id} getPersonsList={getPersonsList} caseNumber={data.number} />
                </div>
              </Col>
            </Row>
          </Card>
        </Fragment>
      ) : (
        <BlockUi
          className="spinnerContainer"
          blocking={spin.page}
          loader={<Spinner color="primary" />}
        ></BlockUi>
      )}
    </Fragment>
  )
}
export default EditFile