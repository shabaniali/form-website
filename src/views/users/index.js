import React, { Fragment, useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Eye, Edit, Trash, X } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { HandleErrors } from '../../utility/Utils'
import { PanelServices } from '../../services/panelService'
import BlockUi from 'react-block-ui'
import 'react-block-ui/dist/style.css'
import moment from 'jalali-moment'
import { toast } from 'react-toastify'

const familyRole = {
  0: { title: 'پدر'},
  1: { title: 'مادر'},
  2: { title: 'فرزند'}, 
  3: { title: 'تعریف نسده'}
}

const Users = () => {
  const history = useHistory()

  // ** States
  const [deleteModal, setDeleteModal] = useState(false)
  const [data, setData] = useState()
  const [spin, setSpin] = useState({
    list: true,
    status: ''
  })

  // ** Function to get all cases
  const getPersons = () => {
    const panelServices = new PanelServices
    panelServices.getAllPerson()
    .then((res) => {
      setSpin({...spin, list: false})
      setData(res.data)
    })
    .catch((err) => {
      setSpin({...spin, list: false})
      HandleErrors(err)
    })
  }

  useEffect(() => {
    getPersons()
  }, [])

  // ** Function to toggle leader
  const Toggleleader = (id, type) => {
    setSpin({...spin, status: id})
    const panelServices = new PanelServices
    panelServices.toggleLeader(id, type)
    .then((res) => {
      setSpin({...spin, status: ''})
      toast.success(`وضعیت سرپرست خانواده تغییر کرد!`, {
        autoClose: 2000
      })
      getPersons()
    })
    .catch((err) => {
      setSpin({...spin, status: ''})
      HandleErrors(err)
    })
  }

  // ** Function to Delete a case
  const DeletePerson = (id) => {
    setDeleteModal('')
    const panelServices = new PanelServices 
    panelServices.deletePerson(id)
    .then((res) => {
      toast.success(`فرد با موفقیت حذف شد!`, {
        autoClose: 2000
      })
      getPersons()
    })
    .catch((err) => {
      HandleErrors(err)
    })
  }


  //** Expandable table component
  const ExpandableTable = ({ data }) => {
    return (
      <div className='expandable-content px-2'>
        <div className='d-flex pt-1'>
          <div className='mr-1'>
            توضیحات:
          </div>
          <div>
            {data.description}
          </div>
        </div>
        <div className='d-flex pt-1'>
          <div className='mr-1'>
            رشته تحصیلی:
          </div>
          <div>
            {data.education_field}
          </div>
        </div>
        <div className='d-flex pt-1 pb-2'>
          <div className='mr-1'>
            محل تحصیل:
          </div>
          <div>
            {data.education_location}
          </div>
        </div>
      </div>
    )
  }

  // ** Table Columns
  const columns = [
    {
      name: '#',
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
          <Fragment>
            {row.is_leader ? 
              <Button.Ripple onClick={() => { Toggleleader(row.id, 'clear-leader') }} size={'sm'} color='success'>{spin.status === row.id ? <Spinner size={'sm'} /> : "می باشد."}</Button.Ripple>
              :
              <Button.Ripple onClick={() => { Toggleleader(row.id, 'set-leader') }} size={'sm'} color='danger'>{spin.status === row.id ? <Spinner size={'sm'} /> : "نمی باشد."}</Button.Ripple>
            }
          </Fragment>
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
      {!spin.list ? (
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>لیست افراد</CardTitle>
        </CardHeader>
        <DataTable
          noHeader
          data={data}
          expandableRows
          columns={columns}
          expandOnRowClicked
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          expandableRowsComponent={<ExpandableTable />}
        />
      </Card>
      ) : (
        <BlockUi
          className="spinnerContainer"
          blocking={spin.list}
          loader={<Spinner color="primary" />}
        ></BlockUi>
      )}
    </Fragment>
  )
}

export default Users