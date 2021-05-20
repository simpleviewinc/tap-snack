import './root.css'
import { SnackContainer } from './snack'
import { Header } from '../header'

export const RootContainer = () => {
  return  (
    <div className='root-container-main container-fluid overflow-hidden' >
      <Header />
      <SnackContainer />
    </div>
  )
}