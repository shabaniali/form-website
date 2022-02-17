import React, { Fragment, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Trash, X } from 'react-feather'
import { Row, Col, Card, Badge, CardHeader, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const resumeData = [
  {
    id: 1,
    title: 'سابقه کاری 1'
  },
  {
    id: 2,
    title: 'سابقه کاری 2'
  },
  {
    id: 3,
    title: 'سابقه کاری 3'
  },
  {
    id: 4,
    title: 'سابقه کاری 4'
  }
]

const skillsData = [
  {
    id: 1,
    title: 'مهارت 1'
  },
  {
    id: 2,
    title: 'مهارت 2'
  },
  {
    id: 3,
    title: 'مهارت 3'
  },
  {
    id: 4,
    title: 'مهارت 4'
  }
]

const requirementsData = [
  {
    id: 1,
    title: 'نیازمندی 1'
  },
  {
    id: 2,
    title: 'نیازمندی 2'
  },
  {
    id: 3,
    title: 'نیازمندی 3'
  },
  {
    id: 4,
    title: 'نیازمندی 4'
  }
]

const ViewUser = () => {
  const [resumeDeleteModal, setResumeDeleteModal] = useState(0)
  const [skillDeleteModal, setSkillDeleteModal] = useState(0)
  const [requirementDeleteModal, setRequirementDeleteModal] = useState(0)

  const resumeColumns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'عنوان',
      selector: 'title',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'عملیات',
      allowOverflow: true,
      minWidth: '140px',
      cell: row => {
        return (
          <React.Fragment>
            <Trash className='ml-1 cursor' size={18} onClick={() => { setResumeDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={resumeDeleteModal === row.id} toggle={() => setResumeDeleteModal(0)}>
              <ModalHeader toggle={() => setResumeDeleteModal(0)}>حذف {row.title}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.title} اطمینان دارید؟</h4>
                </div>
              </ModalBody>
              <ModalFooter className="justify-content-center">
                <Button color='danger' onClick={() => setResumeDeleteModal(0)}>
                  حذف
                </Button>
              </ModalFooter>
            </Modal>
          </React.Fragment>
        )
      }
    }
  ]

  const skillsColumns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'عنوان',
      selector: 'title',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'عملیات',
      allowOverflow: true,
      minWidth: '140px',
      cell: row => {
        return (
          <React.Fragment>
            <Trash className='ml-1 cursor' size={18} onClick={() => { setSkillDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={skillDeleteModal === row.id} toggle={() => setSkillDeleteModal(0)}>
              <ModalHeader toggle={() => setSkillDeleteModal(0)}>حذف {row.title}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.title} اطمینان دارید؟</h4>
                </div>
              </ModalBody>
              <ModalFooter className="justify-content-center">
                <Button color='danger' onClick={() => setSkillDeleteModal(0)}>
                  حذف
                </Button>
              </ModalFooter>
            </Modal>
          </React.Fragment>
        )
      }
    }
  ]

  const requirementsColumns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'عنوان',
      selector: 'title',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'عملیات',
      allowOverflow: true,
      minWidth: '140px',
      cell: row => {
        return (
          <React.Fragment>
            <Trash className='ml-1 cursor' size={18} onClick={() => { setRequirementDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={requirementDeleteModal === row.id} toggle={() => setRequirementDeleteModal(0)}>
              <ModalHeader toggle={() => setRequirementDeleteModal(0)}>حذف {row.title}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.title} اطمینان دارید؟</h4>
                </div>
              </ModalBody>
              <ModalFooter className="justify-content-center">
                <Button color='danger' onClick={() => setRequirementDeleteModal(0)}>
                  حذف
                </Button>
              </ModalFooter>
            </Modal>
          </React.Fragment>
        )
      }
    }
  ]

  return (
    <Fragment>
      <div className='mb-2'>
        <h4>مشخصات فرد (علی اصغر شعبانی)</h4>
      </div>
      <Card className={'p-1'}>
        <Row>
          <Col md='4' sm='12'>
            <div className='d-flex flex-column mb-2'>
              <h6>شماره پرونده:</h6>
              <span>3938</span>
            </div>
          </Col>
          <Col md='4' sm='12'>
            <div className='d-flex flex-column mb-2'>
              <h6>نام:</h6>
              <span>علی اصغر</span>
            </div>
          </Col>
          <Col md='4' sm='12'>
            <div className='d-flex flex-column mb-2'>
              <h6>نام خانوادگی:</h6>
              <span>شعبانی</span>
            </div>
          </Col>
          <Col md='4' sm='12'>
            <div className='d-flex flex-column mb-2'>
              <h6>نام پدر:</h6>
              <span>غلامرضا</span>
            </div>
          </Col>
          <Col md='4' sm='12'>
            <div className='d-flex flex-column mb-2'>
              <h6>تاریخ تولد:</h6>
              <span>13/11/1376</span>
            </div>
          </Col>
          <Col md='4' sm='12'>
            <div className='d-flex flex-column mb-2'>
              <h6>شماره ملی:</h6>
              <span>2560383063</span>
            </div>
          </Col>
          <Col md='4' sm='12'>
            <div className='d-flex flex-column mb-2'>
              <h6>شماره همراه:</h6>
              <span>09332817811</span>
            </div>
          </Col>
          <Col md='4' sm='12'>
            <div className='d-flex flex-column mb-2'>
              <h6>رشته تحصیل:</h6>
              <span>مهندسی کامپیوتر</span>
            </div>
          </Col>
          <Col md='4' sm='12'>
            <div className='d-flex flex-column mb-2'>
              <h6>محل تحصیل:</h6>
              <span>سیرجان</span>
            </div>
          </Col>
          <Col md='4' sm='12'>
            <div className='d-flex flex-column mb-2'>
              <h6>سرپرست خانواده:</h6>
              <div>
                <Badge color='light-success'>
                  هست
                </Badge>
                {/* <Badge color='light-danger'>
                  نیست
                </Badge> */}
              </div>
            </div>
          </Col>
        </Row>
      </Card>
      <Card>
        <CardHeader CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>سوابق کاری</CardTitle>
        </CardHeader>
        <DataTable
          noHeader
          data={resumeData}
          columns={resumeColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </Card>
      <Card>
        <CardHeader CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>مهارت ها</CardTitle>
        </CardHeader>
        <DataTable
          noHeader
          data={skillsData}
          columns={skillsColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </Card>
      <Card>
        <CardHeader CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>نیازمندی ها</CardTitle>
        </CardHeader>
        <DataTable
          noHeader
          data={requirementsData}
          columns={requirementsColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </Card>
    </Fragment>
  )
}
export default ViewUser