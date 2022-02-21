import { Fragment, useState } from 'react'
import { Card, Input, Label, Button, FormGroup, Row, Col } from 'reactstrap'
import { PanelServices } from '../../services/panelService'
import { HandleErrors } from '../../utility/Utils'
import NewUser from '../users/NewUser'
import PersonsFileList from './PersonsFileList'

const NewFile = () => {
  // ** States
  const [data, setData] = useState({address: ''})
  const [created, setCreated] = useState(false) 

  // ** Function to create a case
  const createCase = () => {
    const panelServices = new PanelServices
    panelServices.addCase(data)
    .then((res) => {
      setCreated(true)
    })
    .catch((err) => {
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
            <PersonsFileList />
            {/* <h5 className='mt-2 mb-3'>لیست افراد مشمول پرونده خالی است.</h5> */}
            <div className='mb-1'>
              <NewUser />
            </div>
          </Fragment>
         }
          <Row>
            <Col sm='12'>
              <FormGroup className='d-flex justify-content-center w-100 mb-0'>
                <div className='mb-2 mt-2'>
                  <Button.Ripple color='primary' onClick={(e) => { createCase(e) }}>
                    افزودن پرونده
                  </Button.Ripple>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Card>
      </Fragment>
    )
}
export default NewFile