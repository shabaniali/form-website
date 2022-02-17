import { useState } from 'react'
import Repeater from '@components/repeater'
import { Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { X, Plus } from 'react-feather'

const RepeatingForm = (props) => {
  const [count, setCount] = useState(1)

  const increaseCount = () => {
    setCount(count + 1)
  }

  const deleteForm = e => {
    e.preventDefault()
    e.target.closest('form').remove()
  }

  return (

      <div className='mt-2'>
        <Repeater count={count}>
          {i => (
            <Form key={i}>
              <Row className='justify-content-start align-items-center'>
                <Col md={4}>
                  <FormGroup>
                    <Input type='text' id={`item-name-${i}`} placeholder={props.placeholder} />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <Button.Ripple size='sm' color='danger' className='text-nowrap mb-1 px-1' onClick={deleteForm} outline>
                    <X size={14} className='' />
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          )}
        </Repeater>
        <Button size='sm' className='s' color='primary' onClick={increaseCount}>
          <Plus size={14} />
          <span className='align-middle ml-25'>افزودن</span>
        </Button>
        <Row>
          <Col sm={12}>
            <hr />
          </Col>
        </Row>
      </div>
  )
}

export default RepeatingForm