import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import errorImg from '@src/assets/images/pages/404.svg'

import '@styles/base/pages/page-misc.scss'

const Error = () => {
  return (
    <div className='misc-wrapper'>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center d-flex flex-column'>
          <h2 className='mb-1'>404</h2>
          <p className='mb-2'>صفحه مورد نظر یافت نشد</p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
            بازگشت به صفحه اصلی
          </Button>
          <img className='img-fluid image-404'  src={errorImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default Error
