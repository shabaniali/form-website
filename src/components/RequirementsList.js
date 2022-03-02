import React, { Fragment, useEffect, useState } from 'react'
import 'react-block-ui/dist/style.css'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit, Plus, Trash, X } from 'react-feather'
import { toast } from 'react-toastify'
import { Row, Col, Card, CardHeader, CardTitle, Button, Modal, ModalHeader, ModalBody, Label, FormGroup, Input, Spinner } from 'reactstrap'
import { PanelServices } from '../services/panelService'
import { HandleErrors } from '../utility/Utils'


const RequirementsList = (props) => {

  // ** States
  const [requirementDeleteModal, setRequirementDeleteModal] = useState('')
  const [requirementEditModal, setRequirementEditModal] = useState('')
  const [allrequirements, setAllRequirements] = useState([])
  const [requirement, setRequirement] = useState({
    person_id: '',
    description: ''
  })
  const [spin, setSpin] = useState({
    requirement: false
  })
  const [updateData, setUpdateData] = useState({
    person_id: '',
    id: null,
    description: ''
  })

  // ** Function to get all requirements
  const getRequirements = (id) => {
    const panelServices = new PanelServices
    panelServices.getAllRequirements(id)
    .then((res) => {
      setAllRequirements(res.data)
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  useEffect(() => {
    if (props.personId !== undefined) {
      getRequirements(props.personId)
      setRequirement({...requirement, person_id: props.personId})
    }
  }, [props.personId])

  // ** Function to delete a requirement
  const deleteRequirement = (id, personId) => {
    const panelServices = new PanelServices
    panelServices.deleteRequirement(id)
    .then((res) => {
      setRequirementDeleteModal('')
      getRequirements(personId)
      toast.success(`نیازمندی شخص با موفقیت حذف شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  // ** Function to add new requirement
  const newRequirement = () => {
    if (requirement === "") {
      toast.error(`عنوان نیازمندی را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    setSpin({...spin, requirement: true})
    const panelServices = new PanelServices
    panelServices.addRequirement(requirement)
    .then((res) => {
      setSpin({...spin, requirement: false})
      getRequirements(res.data.person_id)
      toast.success(`نیازمندی جدید با موفقیت اضافه شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      setSpin({...spin, requirement: false})
      HandleErrors(err)
    })
  } 

  // ** Function to update a requirement
  const UpdateRequirement = () => {
    if (updateData.description === "") {
      toast.error(`عنوان نیازمندی را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    const panelServices = new PanelServices
    panelServices.updateRequirement(updateData)
    .then((res) => {
      getRequirements(updateData.person_id)
      setRequirementEditModal('')
      toast.success(`نیازمندی با موفقیت ویرایش شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  const openEditModal = (row) => {
    setRequirementEditModal(row.id)
    const data = {
      description: row.description,
      person_id: row.person_id,
      id: row.id
    }
    setUpdateData(data)
  }

  const RequirementColumns = [
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
      name: 'نیازمندی',
      selector: 'description',
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
            <Trash className='ml-1 cursor-pointer' size={18} onClick={() => { setRequirementDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={requirementDeleteModal === row.id} toggle={() => setRequirementDeleteModal('')}>
              <ModalHeader toggle={() => setRequirementDeleteModal('')}>حذف {row.description}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.description} اطمینان دارید؟</h4>
                </div>
                <div className='d-flex justify-content-center'> 
                  <Button className="my-2" color='danger' onClick={() => deleteRequirement(row.id, row.person_id)}>
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
          <CardTitle tag='h4'>نیازمندی ها</CardTitle>
        </CardHeader>
        <DataTable
          noHeader
          data={allrequirements}
          columns={RequirementColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
        <div className='p-2'>
          <Row>
            <Col xs={12} md={4}>
              <FormGroup>
                <Label for='RequirementTitle'>عنوان نیازمندی</Label>
                <Input value={requirement.description} onChange={(e) => { setRequirement({...requirement, description: e.target.value}) }} type='text' name='RequirementTitle' id='RequirementTitle' placeholder='عنوان نیازمندی' />
              </FormGroup>
            </Col>
          </Row>
          <Button.Ripple disabled={spin.requirement} onClick={() => { newRequirement() }} size="sm" color='primary'>
            {spin.requirement ? 
            <Spinner size={'sm'} />
            :
            <Fragment>
              <Plus size={14} /> {" "}
              <span className='align-middle ms-25'>افزودن نیازمندی</span>
            </Fragment>
            }
          </Button.Ripple>
        </div>
      </Card>
      <Modal modalClassName={'modal-primary'} isOpen={requirementEditModal === updateData.id} toggle={() => setRequirementEditModal('')}>
        <ModalHeader toggle={() => setRequirementEditModal('')}>ویرایش نیازمندی فرد</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Label for='RequirementTitle'>عنوان نیازمندی</Label>
                <Input value={updateData.description} onChange={(e) => { setUpdateData({...updateData, description: e.target.value}) }} type='text' name='RequirementTitle' id='RequirementTitle' placeholder='عنوان نیازمندی' />
              </FormGroup>
            </Col>
          </Row>
          <div className='d-flex justify-content-center'>
            <Button className='my-1 mx-auto' color='primary' onClick={() => UpdateRequirement()}>
              ویرایش
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}
export default RequirementsList