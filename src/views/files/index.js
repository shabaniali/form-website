import React, { Fragment, useEffect, useState } from 'react'
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
  ModalFooter,
  Spinner
} from 'reactstrap'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import NewUser from '../users/NewUser'
import { PanelServices } from '../../services/panelService'
import { HandleErrors } from '../../utility/Utils'
import BlockUi from 'react-block-ui'
import 'react-block-ui/dist/style.css'

const Files = () => {
  const history = useHistory()

  // ** States
  const [currentPage, setCurrentPage] = useState(0)
  const [deleteModal, setDeleteModal] = useState('')
  const [listData, setListData] = useState([])
  const [spin, setSpin] = useState({
    list: false,
    delete: false,
    status: ''
  })

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
      pageCount={listData.length / 7 || 1}
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

  // ** Function to get all cases
  const getCases = () => {
    const panelServices = new PanelServices
    panelServices.getAllCases()
    .then((res) => {
      setSpin({...spin, list: false})
      setListData(res.data)
    })
    .catch((err) => {
      setSpin({...spin, list: false})
      HandleErrors(err)
    })
  }

  useEffect(() => {
    setSpin({...spin, list: true})
    getCases()
  }, [])

  // ** Function to change case status
  const changeStatus = (id, type) => {
    setSpin({...spin, status: id})
    const panelServices = new PanelServices
    panelServices.changeStatus(id, type)
    .then((res) => {
      setSpin({...spin, status: ''})
      getCases()
    })
    .catch((err) => {
      setSpin({...spin, status: ''})
      HandleErrors(err)
    })
  }

  // ** Function to Delete a case
  const DeleteCase = (id) => {
    setDeleteModal('')
    setSpin({...spin, delete: true})
    const panelServices = new PanelServices
    panelServices.deleteCase(id)
    .then((res) => {
      setSpin({...spin, delete: false})
      toast.success(`پرونده با موفقیت حذف شد!`)
      getCases()

    })
    .catch((err) => {
      setSpin({...spin, delete: false})
      HandleErrors(err)
    })
  }

  // //** Expandable table component
  // const ExpandableTable = ({ data }) => {
  //   return (
  //     <div className='expandable-content px-2'>
  //       {data.users.map((item) => {
  //         return (
  //           <div className='pt-1 d-flex userSelect' onClick={() => { history.push('/panel/viewUser/1') }}>
  //             {item.name}
  //             {item.isHead === 1 && <div className='ml-1'>(سرپرست خانواده)</div>}
  //           </div>
  //         )
  //       })}
  //       <div className='mt-2'>
  //         <NewUser />
  //       </div>
  //     </div>
  //   )
  // }

  // ** Table Columns
  const columns = [
    {
      name: 'شماره پرونده',
      selector: 'number',
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
            className="d-flex align-items-center cursor-pointer"
            id={row.number} 
            onClick={() => { TextCopy(row.address) }}
          >
            <Copy size={15} className="mr-1"/>
            {row.address}
          </span>
        )
      }
    },
    {
      name: 'وضعیت',
      allowOverflow: true,
      minWidth: '140px',
      cell: row => {
        return (
          <React.Fragment>
            {row.active ? 
              <Button.Ripple onClick={() => { changeStatus(row.id, 'activate') }} size={'sm'} color='success'>{spin.status === row.id ? <Spinner size={'sm'} /> : "فعال"}</Button.Ripple>
              :
              <Button.Ripple onClick={() => { changeStatus(row.id, 'deactivate') }} size={'sm'} color='danger'>{spin.status === row.id ? <Spinner size={'sm'} /> : "غیرفعال"}</Button.Ripple>
            }
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
            <Eye className='ml-1 cursor-pointer' size={18} onClick={() => { history.push('/panel/viewFile/1') }}/>
            <Edit className='ml-1 cursor-pointer' size={18} onClick={() => { history.push('/panel/editFile/1') }}/>
            <Trash className='ml-1 cursor-pointer' size={18} onClick={() => { setDeleteModal(row.id) }}/>
            <Modal modalClassName={'modal-danger'} isOpen={deleteModal === row.id} toggle={() => setDeleteModal('')}>
              <ModalHeader toggle={() => setDeleteModal('')}>حذف پرونده {row.number}</ModalHeader>
              <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                  <div className='deleteModalIcon'>
                    <X size={39} strokeWidth={'1.5px'}/>
                  </div>
                  <h4 className='mt-2'>آیا از حذف پرونده {row.number} اطمینان دارید؟</h4>
                </div>

                <div className='d-flex justify-content-center my-2'>
                  <Button color='danger' onClick={(e) => DeleteCase(row.id)}>
                    حذف پرونده
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
   <React.Fragment>
    {!spin.list ? (
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
            data={listData}
            // expandableRows
            columns={columns}
            // expandOnRowClicked
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            // expandableRowsComponent={<ExpandableTable />}
            paginationRowsPerPageOptions={[7, 25, 50, 100]}
            paginationComponent={CustomPagination}
          />
        </Card>
      </Fragment>
    ) : (
      <BlockUi
        className="spinnerContainer"
        blocking={spin.list}
        loader={<Spinner color="primary" />}
      ></BlockUi>
    )}
   </React.Fragment>
  )
}

export default Files