import { PageContainer } from '@ant-design/pro-components'
import { Button } from 'antd'
import { useModel } from '@umijs/max'
import styles from './index.less'
import { trim } from '@/utils/format'
import Guide from '@/components/Guide'
import store from '@/store'

const HomePage: React.FC = () => {
  const { name } = useModel('global')
  const schemaStore = store.schemaStore(state => state)
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {schemaStore.bears}
        <Button onClick={schemaStore.increasePopulation}>add</Button>
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  )
}

export default HomePage
