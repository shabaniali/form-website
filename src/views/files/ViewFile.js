import { Fragment } from 'react'
import { Card } from 'reactstrap'
import PersonsFileList from './PersonsFileList'

const ViewFile = () => {

    return (
      <Fragment>
        <h4 className='mb-2'>پرونده 3938</h4>
        <Card className='p-1'>
          <div className='d-flex align-items-center my-1'>
            <h5 className='mr-1 mb-0'>وضعیت پرونده:</h5>
            <h5 className='mb-0'>فعال</h5>
          </div>
          <div className='form-label-group mt-2 d-flex align-items-center'>
            <h5 className='mr-1 mb-0'>آدرس:</h5>
            <h5 className='mb-0'>آدرس تست</h5>
          </div>
          <PersonsFileList />
        </Card>
      </Fragment>
    )
}
export default ViewFile