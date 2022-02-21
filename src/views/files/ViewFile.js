import { Fragment, useEffect, useState } from 'react'
import { Card, Spinner } from 'reactstrap'
import { PanelServices } from '../../services/panelService'
import { HandleErrors } from '../../utility/Utils'
import PersonsFileList from './PersonsFileList'
import BlockUi from 'react-block-ui'
import 'react-block-ui/dist/style.css'

const ViewFile = (props) => {
  const id = props.match.params.id
  
  // ** States
  const [data, setData] = useState({})
  const [spin, setSpin] = useState(true)

  // ** Function to get case data
  const getCase = () => {
    const panelServices = new PanelServices
    panelServices.getCase(id)
    .then((res) => {
      setSpin(false)
      setData(res.data)
    })
    .catch((err) => {
      setSpin(false)
      HandleErrors(err)
    })
  }

  useEffect(() => {
    getCase()
  }, [])


  return (
    <Fragment>
      {!spin ? (
        <Fragment>
          <h4 className='mb-2'>پرونده {data.number}</h4>
          <Card className='p-1'>
            <div className='d-flex align-items-center my-1'>
              <h5 className='mr-1 mb-0'>وضعیت پرونده:</h5>
              <h5 className='mb-0'>{data.active ? "فعال" : "غبرفعال"}</h5>
            </div>
            <div className='d-flex align-items-center my-1'>
              <h5 className='mr-1 mb-0'>تاریخ ثبت پرونده:</h5>
              <h5 className='mb-0'>{data.registration_date}</h5>
            </div>
            <div className='form-label-group mt-1 mb-2 d-flex align-items-center'>
              <h5 className='mr-1 mb-0'>آدرس:</h5>
              <h5 className='mb-0'>{data.address}</h5>
            </div>
            <PersonsFileList />
          </Card>
        </Fragment>
      ) : (
        <BlockUi
          className="spinnerContainer"
          blocking={spin}
          loader={<Spinner color="primary" />}
        ></BlockUi>
      )}
    </Fragment>
  )
}
export default ViewFile