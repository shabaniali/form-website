import React, { Fragment, useEffect, useState } from 'react'
import 'react-block-ui/dist/style.css'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit, Plus, Trash, X } from 'react-feather'
import { toast } from 'react-toastify'
import { Row, Col, Card, CardHeader, CardTitle, Button, Modal, ModalHeader, ModalBody, Label, FormGroup, Input, Spinner } from 'reactstrap'
import { PanelServices } from '../services/panelService'
import { HandleErrors } from '../utility/Utils'


const JobsList = (props) => {

  // ** States
  const [resumeDeleteModal, setResumeDeleteModal] = useState('')
  const [resumeEditModal, setResumeEditModal] = useState('')
  const [allJobs, setAllJobs] = useState([])
  const [job, setJob] = useState({
    person_id: '',
    title: '',
    income: '',
    location: ''
  })
  const [spin, setSpin] = useState({
    job: false
  })
  const [updateData, setUpdateData] = useState({
    title: '',
    location: '',
    person_id: '',
    id: null,
    income: ''
  })

  // ** Function to get all jobs
  const getJobs = (id) => {
    const panelServices = new PanelServices
    panelServices.getAllJobs(id)
    .then((res) => {
      setAllJobs(res.data)
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  useEffect(() => {
    if (props.personId !== undefined) {
      getJobs(props.personId)
      setJob({...job, person_id: props.personId})
    }
  }, [props.personId])

  // ** Function to delete a job
  const deleteJob = (id, personId) => {
    const panelServices = new PanelServices
    panelServices.deleteJob(id)
    .then((res) => {
      setResumeDeleteModal('')
      getJobs(personId)
      toast.success(`سابقه کاری با موفقیت حذف شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  // ** Function to add new job
  const newJob = () => {
    if (job.title === "") {
      toast.error(`عنوان شغل را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (job.income === "") {
      toast.error(`درآمد را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (job.location === "") {
      toast.error(`محل کار را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    setSpin({...spin, job: true})
    const panelServices = new PanelServices
    panelServices.addJob(job)
    .then((res) => {
      setSpin({...spin, job: false})
      getJobs(res.data.person_id)
      toast.success(`سابقه کاری با موفقیت اضافه شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      setSpin({...spin, job: false})
      HandleErrors(err)
    })
  }

  // ** Function to update a job
  const UpdateJob = () => {
    if (updateData.title === "") {
      toast.error(`عنوان شغل را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (updateData.income === "") {
      toast.error(`درآمد را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    if (updateData.location === "") {
      toast.error(`محل کار را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    const panelServices = new PanelServices
    panelServices.updateJob(updateData)
    .then((res) => {
      getJobs(updateData.person_id)
      setResumeEditModal('')
      toast.success(`سابقه کاری با موفقیت ویرایش شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  const openEditModal = (row) => {
    setResumeEditModal(row.id)
    const data = {
      title: row.title,
      location: row.location,
      person_id: row.person_id,
      id: row.id,
      income: row.income
    }
    setUpdateData(data)
  }

  const resumeColumns = [
    {
      name: '#',
      sortable: true,
      minWidth: '70px',
      cell: (row, idx) => {
        return (
          <span>{idx + 1}</span>
        )
      }
    },
    {
      name: 'عنوان',
      selector: 'title',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'درآمد',
      selector: 'income',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'محل کار',
      selector: 'location',
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
            <Edit className='ml-1 cursor-pointer' size={18} onClick={() => { openEditModal(row) }}/>
            <Trash className='ml-1 cursor-pointer' size={18} onClick={() => { setResumeDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={resumeDeleteModal === row.id} toggle={() => setResumeDeleteModal('')}>
              <ModalHeader toggle={() => setResumeDeleteModal('')}>حذف {row.title}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.title} اطمینان دارید؟</h4>
                </div>
                <div className='d-flex justify-content-center'> 
                  <Button className="my-2" color='danger' onClick={() => deleteJob(row.id, row.person_id)}>
                    حذف
                  </Button>
                </div>
              </ModalBody>
            </Modal>
          </React.Fragment>
        )
      }
    }
  ]

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>سوابق کاری</CardTitle>
        </CardHeader>
        <DataTable
          noHeader
          data={allJobs}
          columns={resumeColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
        <div className='p-2'>
          <Row>
            <Col xs={12} md={4}>
              <FormGroup>
                <Label for='jobTitle'>عنوان شغل</Label>
                <Input value={job.title} onChange={(e) => { setJob({...job, title: e.target.value}) }} type='text' name='jobTitle' id='jobTitle' placeholder='عنوان شغل' />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup>
                <Label for='income'>درآمد</Label>
                <Input onChange={(e) => { setJob({...job, income: parseInt(e.target.value)}) }} type='number' name='income' id='income' placeholder='درآمد' />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup>
                <Label for='location'>محل کار</Label>
                <Input value={job.location} onChange={(e) => { setJob({...job, location: e.target.value}) }} type='text' name='location' id='location' placeholder='محل کار' />
              </FormGroup>
            </Col>
          </Row>
          <Button.Ripple disabled={spin.job} onClick={() => { newJob() }} size="sm" color='primary'>
            {spin.job ? 
            <Spinner size={'sm'} />
            :
            <Fragment>
              <Plus size={14} /> {" "}
              <span className='align-middle ms-25'>افزودن سابقه کار</span>
            </Fragment>
            }
          </Button.Ripple>
        </div>
      </Card>
      <Modal modalClassName={'modal-primary'} isOpen={resumeEditModal === updateData.id} toggle={() => setResumeEditModal('')}>
        <ModalHeader toggle={() => setResumeEditModal('')}>ویرایش سابقه کاری</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Label for='jobTitle'>عنوان کار</Label>
                <Input value={updateData.title} onChange={(e) => { setUpdateData({...updateData, title: e.target.value}) }} type='text' name='jobTitle' id='jobTitle' placeholder='عنوان کار' />
              </FormGroup>
            </Col>
            <Col xs={12}>
              <FormGroup>
                <Label for='income'>درآمد</Label>
                <Input value={updateData.income} onChange={(e) => { setUpdateData({...updateData, income: parseInt(e.target.value)}) }} type='number' name='income' id='income' placeholder='درآمد' />
              </FormGroup>
            </Col>
            <Col xs={12}>
              <FormGroup>
                <Label for='location'>محل کار</Label>
                <Input value={updateData.location} onChange={(e) => { setUpdateData({...updateData, location: e.target.value}) }} type='text' name='location' id='location' placeholder='محل کار' />
              </FormGroup>
            </Col>
          </Row>
          <div className='d-flex justify-content-center'>
            <Button className='my-1 mx-auto' color='primary' onClick={() => UpdateJob()}>
              ویرایش
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}
export default JobsList