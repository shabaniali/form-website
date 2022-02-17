import { Fragment } from 'react'
import { Card, Input, Label, Button, FormGroup, Row, Col } from 'reactstrap'
import NewUser from '../users/NewUser'
import PersonsFileList from './PersonsFileList'

const NewFile = () => {

    return (
      <Fragment>
        <h4 className='mb-2'>افزودن پرونده</h4>
        <Card className='p-1'>
          <div className='form-label-group mt-2'>
            <Input type='textarea' name='text' id='exampleText' rows='3' placeholder='آدرس پرونده' />
            <Label>آدرس پرونده</Label>
          </div>
          <PersonsFileList />
          {/* <h5 className='mt-2 mb-3'>لیست افراد مشمول پرونده خالی است.</h5> */}
          <div className='mb-1'>
            <NewUser />
          </div>
          <Row>
            <Col sm='12'>
              <FormGroup className='d-flex justify-content-center w-100 mb-0'>
                <div className='mb-2 mt-3'>
                  <Button.Ripple color='primary' onClick={(e) => { submit(e) }}>
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