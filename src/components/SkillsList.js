import React, { Fragment, useEffect, useState } from 'react'
import 'react-block-ui/dist/style.css'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit, Plus, Trash, X } from 'react-feather'
import { toast } from 'react-toastify'
import { Row, Col, Card, CardHeader, CardTitle, Button, Modal, ModalHeader, ModalBody, Label, FormGroup, Input, Spinner } from 'reactstrap'
import { PanelServices } from '../services/panelService'
import { HandleErrors } from '../utility/Utils'


const SkillList = (props) => {

  // ** States
  const [skillDeleteModal, setSkillDeleteModal] = useState('')
  const [skillEditModal, setSkillEditModal] = useState('')
  const [allSkills, setAllSkills] = useState([])
  const [skill, setSkill] = useState({
    person_id: '',
    skill: ''
  })
  const [spin, setSpin] = useState({
    skill: false
  })
  const [updateData, setUpdateData] = useState({
    person_id: '',
    id: null,
    skill: ''
  })

  // ** Function to get all skills
  const getSkills = (id) => {
    const panelServices = new PanelServices
    panelServices.getAllSkills(id)
    .then((res) => {
      setAllSkills(res.data)
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  useEffect(() => {
    if (props.personId !== undefined) {
      getSkills(props.personId)
      setSkill({...skill, person_id: props.personId})
    }
  }, [props.personId])

  // ** Function to delete a skill
  const deleteSkill = (id, personId) => {
    const panelServices = new PanelServices
    panelServices.deleteSkill(id)
    .then((res) => {
      setSkillDeleteModal('')
      getSkills(personId)
      toast.success(`مهارت با موفقیت حذف شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  // ** Function to add new skill
  const newSkill = () => {
    if (skill === "") {
      toast.error(`عنوان مهارت را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    setSpin({...spin, skill: true})
    const panelServices = new PanelServices
    panelServices.addSkill(skill)
    .then((res) => {
      setSpin({...spin, skill: false})
      getSkills(res.data.person_id)
      toast.success(`مهارت جدید با موفقیت اضافه شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      setSpin({...spin, skill: false})
      HandleErrors(err)
    })
  }

  // ** Function to update a skill
  const UpdateSkill = () => {
    if (updateData.skill === "") {
      toast.error(`عنوان مهارت را وارد کنید!`, {
        autoClose: 2000
      })
      return
    }
    const panelServices = new PanelServices
    panelServices.updateSkill(updateData)
    .then((res) => {
      getSkills(updateData.person_id)
      setSkillEditModal('')
      toast.success(`مهارت با موفقیت ویرایش شد!`, {
        autoClose: 2000
      })
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  const openEditModal = (row) => {
    setSkillEditModal(row.id)
    const data = {
      skill: row.skill,
      person_id: row.person_id,
      id: row.id
    }
    setUpdateData(data)
  }

  const SkillColumns = [
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
      name: 'مهارت',
      selector: 'skill',
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
            <Trash className='ml-1 cursor-pointer' size={18} onClick={() => { setSkillDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={skillDeleteModal === row.id} toggle={() => setSkillDeleteModal('')}>
              <ModalHeader toggle={() => setSkillDeleteModal('')}>حذف {row.skill}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.skill} اطمینان دارید؟</h4>
                </div>
                <div className='d-flex justify-content-center'> 
                  <Button className="my-2" color='danger' onClick={() => deleteSkill(row.id, row.person_id)}>
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
          <CardTitle tag='h4'>مهارت ها</CardTitle>
        </CardHeader>
        <DataTable
          noHeader
          data={allSkills}
          columns={SkillColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
        <div className='p-2'>
          <Row>
            <Col xs={12} md={4}>
              <FormGroup>
                <Label for='SkillTitle'>عنوان مهارت</Label>
                <Input value={skill.skill} onChange={(e) => { setSkill({...skill, skill: e.target.value}) }} type='text' name='SkillTitle' id='SkillTitle' placeholder='عنوان مهارت' />
              </FormGroup>
            </Col>
          </Row>
          <Button.Ripple disabled={spin.skill} onClick={() => { newSkill() }} size="sm" color='primary'>
            {spin.skill ? 
            <Spinner size={'sm'} />
            :
            <Fragment>
              <Plus size={14} /> {" "}
              <span className='align-middle ms-25'>افزودن مهارت</span>
            </Fragment>
            }
          </Button.Ripple>
        </div>
      </Card>
      <Modal modalClassName={'modal-primary'} isOpen={skillEditModal === updateData.id} toggle={() => setSkillEditModal('')}>
        <ModalHeader toggle={() => setSkillEditModal('')}>ویرایش مهارت فرد</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Label for='SkillTitle'>عنوان مهارت</Label>
                <Input value={updateData.skill} onChange={(e) => { setUpdateData({...updateData, skill: e.target.value}) }} type='text' name='SkillTitle' id='SkillTitle' placeholder='عنوان مهارت' />
              </FormGroup>
            </Col>
          </Row>
          <div className='d-flex justify-content-center'>
            <Button className='my-1 mx-auto' color='primary' onClick={() => UpdateSkill()}>
              ویرایش
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}
export default SkillList