import moment from 'jalali-moment'
import React, { Fragment, useEffect, useState } from 'react'
import BlockUi from 'react-block-ui'
import 'react-block-ui/dist/style.css'
import { Row, Col, Card, Badge, Spinner } from 'reactstrap'
import JobsList from '../../components/JobsList'
import RequirementsList from '../../components/RequirementsList'
import SkillsList from '../../components/SkillsList'
import { PanelServices } from '../../services/panelService'
import { HandleErrors } from '../../utility/Utils'

const ViewUser = (props) => {
  const id = props.match.params.id

  // ** States
  const [data, setData] = useState({})
  const [spin, setSpin] = useState({
    page: true
  })

  // ** Function to get person
  const GetPerson = () => {
    const panelServices = new PanelServices
    panelServices.getPerson(id)
    .then((res) => {
      setSpin({...spin, page: false})
      console.log(res.data)
      setData(res.data)
    })
    .catch((err) => {
      setSpin({...spin, page: false})
      HandleErrors(err)
    })
  }

  useEffect(() => {
    GetPerson()
  }, [])

  return (
    <Fragment>
      {!spin.page ? (
        <Fragment>
          <div className='mb-2'>
            <h4>مشخصات فرد ({data.first_name} {data.last_name})</h4>
          </div>
          <Card className={'p-1'}>
            <Row>
              {/* <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>شماره پرونده:</h6>
                  <span>3938</span>
                </div>
              </Col> */}
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>نام:</h6>
                  <span>{data.first_name}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>نام خانوادگی:</h6>
                  <span>{data.last_name}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>نام پدر:</h6>
                  <span>{data.father_name}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>تاریخ تولد:</h6>
                  <span>{data.birthday && moment(data.birthday, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>شماره ملی:</h6>
                  <span>{data.national_number}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>شماره همراه:</h6>
                  <span>{data.phone_number}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>رشته تحصیل:</h6>
                  <span>{data.education_field}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>محل تحصیل:</h6>
                  <span>{data.education_location}</span>
                </div>
              </Col>
              <Col md='4' sm='12'>
                <div className='d-flex flex-column mb-2'>
                  <h6>سرپرست خانواده:</h6>
                  <div>
                    {data.is_leader ? 
                      <Badge color='light-success'>
                        می باشد
                      </Badge>
                   :
                    <Badge color='light-danger'>
                      نمی باشد
                    </Badge>
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
          <JobsList personId={id} />
          <SkillsList personId={id} />
          <RequirementsList personId={id}/>
        </Fragment>
      ) : (
          <BlockUi
            className="spinnerContainer"
            blocking={spin.page}
            loader={<Spinner color="primary" />}
          ></BlockUi>
        )
      }
    </Fragment>
  )
}
export default ViewUser