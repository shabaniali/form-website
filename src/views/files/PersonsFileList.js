import moment from 'jalali-moment'
import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Eye, Edit, Trash, X } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
  ModalFooter
} from 'reactstrap'
import Spinner from 'reactstrap/lib/Spinner'
import { PanelServices } from '../../services/panelService'
import { HandleErrors } from '../../utility/Utils'

const familyRole = {
  0: { title: 'پدر'},
  1: { title: 'مادر'},
  2: { title: 'فرزند'}, 
  3: { title: 'تعریف نسده'}
}

const PersonsFileList = (props) => {
  // ** States
  const [deleteModal, setDeleteModal] = useState(false)
  const history = useHistory()

  // ** Function to Delete a case
  const DeletePerson = (id) => {
    setDeleteModal('')
    const panelServices = new PanelServices
    panelServices.deletePerson(id)
    .then((res) => {
      toast.success(`فرد با موفقیت حذف شد!`)
      props.getPersonsList()
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }

  // ** Table Columns
  const columns = [
    {
      name: 'ID',
      sortable: true,
      minWidth: '70px',
      cell: (row, index) => {
        return (
          <span>{index + 1}</span>
        )
      }
    },
    {
      name: 'نام',
      sortable: true,
      minWidth: '140px',
      cell: (row) => {
        return (
          <span>{row.first_name} {row.last_name}</span>
        )
      }
    },
    {
      name: 'نام پدر',
      selector: 'father_name',
      sortable: true,
      minWidth: '130px'
    },
    {
      name: 'نسبت فامیلی',
      sortable: true,
      minWidth: '140px',
      cell: (row) => {
        return (
          <span>{familyRole[row.family_role].title}</span>
        )
      }
    },
    {
      name: 'تاریخ تولد',
      sortable: true,
      minWidth: '140px',
      cell: (row) => {
        return (
          <span>{moment(row.birthday, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</span>
        )
      }
    },
    {
      name: 'کد ملی',
      selector: 'national_number',
      sortable: true,
      minWidth: '120px'
    },
    {
      name: 'شماره همراه',
      selector: 'phone_number',
      sortable: true,
      minWidth: '125px'
    },
    {
      name: 'سرپرست خانواده',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <React.Fragment>
            {row.is_leader && 
            <Badge color={'light-success'} pill>
              سرپرست خانواده
            </Badge>}
          </React.Fragment>
        )
      }
    },
    {
      name: 'عملیات',
      allowOverflow: true,
      minWidth: '140px',
      cell: row => {
        return (
          <React.Fragment>
            <Eye className='ml-1 cursor-pointer' size={18} onClick={() => { history.push(`/panel/viewUser/${row.id}`) }}/>
            <Edit className='ml-1 cursor-pointer' size={18} onClick={() => { history.push(`/panel/editUser/${row.id}`) }}/>
            <Trash className='ml-1 cursor-pointer' size={18} onClick={() => { setDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={deleteModal === row.id} toggle={() => setDeleteModal('')}>
              <ModalHeader toggle={() => setDeleteModal('')}>حذف {row.first_name} {row.last_name}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.first_name} {row.last_name} اطمینان دارید؟</h4>
                </div>

                <div className='d-flex justify-content-center my-2'>
                  <Button color='danger' onClick={() => { DeletePerson(row.id) }}>
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
        <Fragment>
          <CardHeader CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
            <CardTitle tag='h4'>لیست افراد مشمول پرونده</CardTitle>
          </CardHeader>
          <DataTable
            noHeader
            data={props.data}
            columns={columns}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
          />
        </Fragment>
      </Card>
    </Fragment>
  )
}

export default PersonsFileList