import React, { Fragment, useState } from 'react'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Eye, Copy, Plus, Edit, Trash, X } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import NewUser from '../users/NewUser'

// ** Table Data
const data = [
  {
    id: 3938,
    address: 'دهقان - کوکاکولا، اصغر نجف پور، امیر محمودی، قبل از نصیری، پلاک 13 ، واحد 1',
    headOfHouse: 'علی اصغر شعبانی',
    users: [
      {
        id: 1,
        name: 'علی اصغر شعبانی',
        isHead: 1
      },
      {
        id: 2,
        name: 'حمید رضا کاوه پیشقدم',
        isHead: 0
      },
      {
        id: 3,
        name: 'متین رضاخانی',
        isHead: 0
      },
      {
        id: 4,
        name: 'قاعم امیدی',
        isHead: 0
      },
      {
        id: 5,
        name: 'وحید حسنی',
        isHead: 0
      }
    ]
  }
]

const Files = () => {
  const [deleteModal, setDeleteModal] = useState(false)
  const history = useHistory()

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

  // ** Function to copy transaction hash
  const TextCopy = (text) => {
    navigator.clipboard.writeText(text)
    toast.success("کپی شد!")
  }

  //** Expandable table component
  const ExpandableTable = ({ data }) => {
    return (
      <div className='expandable-content px-2'>
        {data.users.map((item) => {
          return (
            <div className='pt-1 d-flex userSelect' onClick={() => { history.push('/panel/viewUser/1') }}>
              {item.name}
              {item.isHead === 1 && <div className='ml-1'>(سرپرست خانواده)</div>}
            </div>
          )
        })}
        <div className='mt-2'>
          <NewUser />
        </div>
      </div>
    )
  }

  // ** Table Columns
  const columns = [
    {
      name: 'شماره پرونده',
      selector: 'id',
      sortable: true,
      minWidth: '140px'
    },
    {
      name: 'آدرس',
      selector: 'address',
      sortable: true,
      minWidth: '550px',
      cell: row => {
        return (
          <span 
            className="d-flex align-items-center"
            id={row.public_key} 
            onClick={() => { TextCopy(row.address) }}
          >
            <Copy size={15} className="mr-1"/>
            {row.address}
          </span>
        )
      }
    },
    {
      name: 'سرپرست خانواده',
      selector: 'headOfHouse',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'وضعیت',
      allowOverflow: true,
      minWidth: '140px',
      cell: row => {
        return (
          <Button.Ripple size={'sm'} color='success'>فعال</Button.Ripple>
          // <Button.Ripple size={'sm'} color='danger'>غیرقعال</Button.Ripple>
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
            <Eye className='ml-1' size={18} onClick={() => { history.push('/panel/viewFile/1') }}/>
            <Edit className='ml-1' size={18} onClick={() => { history.push('/panel/editFile/1') }}/>
            <Trash className='ml-1' size={18} onClick={() => { setDeleteModal(true) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)}>
              <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>حذف پرونده {row.id}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف پرونده {row.id} اطمینان دارید؟</h4>
                </div>
              </ModalBody>
              <ModalFooter className="justify-content-center">
                <Button color='danger' onClick={() => setDeleteModal(!deleteModal)}>
                  حذف پرونده
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
          <CardTitle tag='h4'>لیست پرونده ها</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button color='primary' onClick={() => { history.push('/panel/newfile') }}>
              <Plus size={15} />
              <span className='align-middle ml-50'>افزودن پرونده</span>
            </Button>
          </div>
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

export default Files