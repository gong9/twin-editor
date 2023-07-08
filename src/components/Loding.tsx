import type { FC } from 'react'
import ReactLoading from 'react-loading'

interface LodingProps {
  type?: string
  color?: string
}

const Loding: FC<LodingProps> = () => {
  return (
    <div className='flex justify-center items-center' style={{ width: '100%', height: '100%', backgroundColor: '#000000' }}>
      <ReactLoading type='spokes' color='#fff' height={'30px'} width={'30px'} />
    </div>
  )
}

export default Loding
