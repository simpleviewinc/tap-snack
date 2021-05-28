import './root.css'
import { SnackContainer } from './snack'
import { Header } from '../header'
import CssBaseline from '@material-ui/core/CssBaseline'
import NoSsr from '@material-ui/core/NoSsr'
import Container from '@material-ui/core/Container'

export const RootContainer = () => {
  return  (
    <NoSsr>
      <Container className='root-container-main' maxWidth="xl" >
        <CssBaseline />
        <Header />
        <SnackContainer />
      </Container>
    </NoSsr>
  )
}