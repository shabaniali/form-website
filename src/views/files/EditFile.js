import { Fragment } from 'react'
import { Card, Input, Label, Button, FormGroup, Row, Col } from 'reactstrap'
import NewUser from '../users/NewUser'
import PersonsFileList from './PersonsFileList'

const EditFile = () => {

    return (
      <Fragment>
        <h4 className='mb-2'>ویرایش پرونده 3938</h4>
        <Card className='p-1'>
          <div className='d-flex align-items-center my-1'>
            <h5 className='mr-1 mb-0'>وضعیت پرونده:</h5>
            <Button.Ripple size={'sm'} color='success'>فعال</Button.Ripple>
            {/* <Button.Ripple size={'sm'} color='danger'>غیرفعال</Button.Ripple> */}
          </div>
          <div className='form-label-group mt-2'>
            <Input defaultvlue={'آدرس تست'} type='textarea' name='text' id='exampleText' rows='3' placeholder='آدرس پرونده' />
            <Label>آدرس پرونده</Label>
          </div>
          <PersonsFileList />
          <div className='mb-1'>
            <NewUser />
          </div>
          <Row>
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
        </Card>
      </Fragment>
    )
}
export default EditFile