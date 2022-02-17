import React, { Fragment, useState } from 'react'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronLeft, ChevronDown, Eye, Plus, Edit, Trash, X } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
  ModalFooter,
  Collapse
} from 'reactstrap'
import { useHistory } from 'react-router-dom'

// import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

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

const Users = () => {
  const [deleteModal, setDeleteModal] = useState(false)
  const history = useHistory()

  const [isOpen, setIsOpen] = useState({
    resume: false,
    skills: false,
    requirements: false
  })

  // ** States
  const [currentPage, setCurrentPage] = useState(0)

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={data.length / 7 || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
    />
  )

  //** Expandable table component
  const ExpandableTable = ({ data }) => {
    return (
      <div className='expandable-content px-2'>
        <div className='d-flex pt-1'>
          <div className='mr-1'>
            رشته تحصیلی:
          </div>
          <div>
            {data.fieldOfStudy}
          </div>
        </div>
        <div className='d-flex pt-1'>
          <div className='mr-1'>
            محل تحصیل:
          </div>
          <div>
            {data.educationPlace}
          </div>
        </div>
        <div className='d-flex flex-column pt-1'>
          <div className='mr-1 table-collapse-title' onClick={() => { setIsOpen({resume: !isOpen.resume}) }}>
            {isOpen.resume ? <ChevronDown size={13} className='table-collapse-icon'/> : <ChevronLeft size={13} className='table-collapse-icon'/> }
            سوابق کاری:
          </div>
          <Collapse className='table-collapse' isOpen={isOpen.resume}>
            {data.resume.map((item) => {
              return (
                <div className='mx-2 table-collapse-item d-flex align-items-center'>
                  <div className='table-dot'/>
                  {item.title}
                </div>
              )
            })}
          </Collapse>
        </div>
        <div className='d-flex flex-column pt-1' onClick={() => { setIsOpen({skills: !isOpen.skills}) }}>
          <div className='mr-1 table-collapse-title'>
            {isOpen.skills ? <ChevronDown size={13} className='table-collapse-icon'/> : <ChevronLeft size={13} className='table-collapse-icon'/> }
            مهارت ها :
          </div>
          <Collapse className='table-collapse' isOpen={isOpen.skills}>
            {data.skills.map((item) => {
              return (
                <div className='mx-2 table-collapse-item d-flex align-items-center'>
                  <div className='table-dot'/>
                  {item.title}
                </div>
              )
            })}
          </Collapse>
        </div>
        <div className='d-flex flex-column pt-1' onClick={() => { setIsOpen({requirements: !isOpen.requirements}) }}>
          <div className='mr-1 table-collapse-title'>
            {isOpen.requirements ? <ChevronDown size={13} className='table-collapse-icon'/> : <ChevronLeft size={13} className='table-collapse-icon'/> }
            نیاز مندی ها:
          </div>
          <Collapse className='table-collapse' isOpen={isOpen.requirements}>
            {data.requirements.map((item) => {
              return (
                <div className='mx-2 table-collapse-item d-flex align-items-center'>
                  <div className='table-dot'/>
                  {item.title}
                </div>
              )
            })}
          </Collapse>
        </div>
      </div>
    )
  }

  // ** Table Columns
  const columns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'پرونده',
      selector: 'fileId',
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
            <Eye className='ml-1' size={18} onClick={() => { history.push('/panel/viewUser/1') }}/>
            <Edit className='ml-1' size={18} onClick={() => { history.push('/panel/editUser/1') }}/>
            <Trash className='ml-1' size={18} onClick={() => { setDeleteModal(true) }}/>
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
          <CardTitle tag='h4'>لیست افراد</CardTitle>
        </CardHeader>
        <DataTable
          noHeader
          pagination
          data={data}
          expandableRows
          columns={columns}
          expandOnRowClicked
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          expandableRowsComponent={<ExpandableTable />}
          paginationRowsPerPageOptions={[7, 25, 50, 100]}
          paginationComponent={CustomPagination}
        />
      </Card>
    </Fragment>
  )
}

export default Users