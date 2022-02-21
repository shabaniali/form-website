import React, { Fragment, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Eye, Edit, Trash, X } from 'react-feather'
import { useHistory } from 'react-router-dom'
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

// ** Table Data
const data = [
  {
    id: 1,
    fileId: 3938,
    name: 'علی اصغر شعبانی',
    fatherName: 'غلامرضا',
    birthDay: '13/11/1376',
    nationalId: '2560383063',
    phoneNumber: '09332817811',
    headOfHouse: true,
    fieldOfStudy: 'مهندسی کامپیوتر',
    educationPlace: 'سیرجان',
    resume: [
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
    ],
    skills: [
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
    ],
    requirements: [
      {
        id: 1,
        title: 'نیارمندی 1'
      },
      {
        id: 2,
        title: 'نیارمندی 2'
      },
      {
        id: 3,
        title: 'نیارمندی 3'
      },
      {
        id: 4,
        title: 'نیارمندی 4'
      }
    ]
  }
]

const PersonsFileList = () => {
  const [deleteModal, setDeleteModal] = useState(false)
  const history = useHistory()

  // ** Table Columns
  const columns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'نام',
      selector: 'name',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'نام پدر',
      selector: 'fatherName',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'تاریخ تولد',
      selector: 'birthDay',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'کد ملی',
      selector: 'nationalId',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'شماره همراه',
      selector: 'phoneNumber',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'سرپرست خانواده',
      selector: 'headOfHouse',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <React.Fragment>
            {row.headOfHouse && 
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
            <Eye className='ml-1 cursor-pointer' size={18} onClick={() => { history.push('/panel/viewUser/1') }}/>
            <Edit className='ml-1 cursor-pointer' size={18} onClick={() => { history.push('/panel/editUser/1') }}/>
            <Trash className='ml-1 cursor-pointer' size={18} onClick={() => { setDeleteModal(true) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)}>
              <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>حذف {row.name}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف {row.name} اطمینان دارید؟</h4>
                </div>
              </ModalBody>
              <ModalFooter className="justify-content-center">
                <Button color='danger' onClick={() => setDeleteModal(!deleteModal)}>
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
      <Card>
        <CardHeader CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>لیست افراد مشمول پرونده</CardTitle>
        </CardHeader>
        <DataTable
          noHeader
          data={data}
          columns={columns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </Card>
    </Fragment>
  )
}

export default PersonsFileList