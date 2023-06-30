import { Modal } from 'antd'
import type { PropsWithChildren } from 'react'
import type React from 'react'

interface CreateFormProps {
  modalVisible: boolean
  onCancel: () => void
}

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel } = props

  return (
    <Modal
      destroyOnClose
      title="新建"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  )
}

export default CreateForm
