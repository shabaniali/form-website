import { Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import { Card, Input, Label, Button, FormGroup, Row, Col, Spinner } from 'reactstrap'
import { PanelServices } from '../../services/panelService'
import { HandleErrors } from '../../utility/Utils'
import NewUser from '../users/NewUser'
import PersonsFileList from './PersonsFileList'

const NewFile = () => {
  // ** States
  const [data, setData] = useState({address: ''})
  const [created, setCreated] = useState(false)
  const [caseNumber, setCaseNumber] = useState()
  const [caseId, setCaseId] = useState()
  const [casePersons, setCasePersons] = useState([])
  const [spin, setSpin] = useState({
    addCase: false
  })
  
  // ** Function to get all person of case
  const getPersons = (id) => {
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
    getPersons(caseId)
  }

  // ** Function to create a case
  const createCase = () => {
    setSpin({...spin, addCase: true})
    const panelServices = new PanelServices
    panelServices.addCase(data)
    .then((res) => {
      setSpin({...spin, addCase: false})
      setCreated(true)
      setCaseNumber(res.data.number)
      setCaseId(res.data.id)
      toast.success(`پرونده با موفقیت ساخته شد!`, {
        autoClose: 2000
      })
      getPersons(res.data.id)
    })
    .catch((err) => {
      setSpin({...spin, addCase: false})
      HandleErrors(err)
    })
  }

  // add user to case
    return (
      <Fragment>
        <h4 className='mb-2'>افزودن پرونده</h4>
        <Card className='p-1'>
          <div className='form-label-group mt-2'>
            <Input onChange={(e) => { setData({...data, address: e.target.value}) }} value={data.address} type='textarea' name='text' id='exampleText' rows='3' placeholder='آدرس پرونده' />
            <Label>آدرس پرونده</Label>
          </div>
          {created && 
            <Fragment>
              {casePersons.length !== 0 ?
                <PersonsFileList getPersonsList={getPersons} data={casePersons} /> :
                <h5 className='mt-2 mb-3'>لیست افراد مشمول پرونده خالی است.</h5>
              }
              <div className='mb-1'>
                <NewUser caseId={caseId} getPersonsList={getPersonsList} caseNumber={caseNumber} />
              </div>
            </Fragment>
          }
          {!created &&
            <Row>
              <Col sm='12'>
                <FormGroup className='d-flex justify-content-center w-100 mb-0'>
                  <div className='mb-2 mt-2'>
                    <Button.Ripple disabled={spin.addCase} color='primary' onClick={(e) => { createCase(e) }}>
                      {spin.addCase ? <Spinner size={'sm'} /> : "افزودن پرونده"}
                    </Button.Ripple>
                  </div>
                </FormGroup>
              </Col>
            </Row>
          }
        </Card>
      </Fragment>
    )
}
export default NewFile