import { useAppetizeUrl } from '../../hooks'

const NoPublicKey = () => {
  return (
    <div className="apt-no-key-main" >
      <p className="apt-no-key-text" >
        Missing required Appetize publicKey prop
      </p>
    </div>
  )
}

const AppetizeFrame = props => {
  const {
    height='800px',
    width='378px',
    url
  } = props

  return (
    <div className='apt-iframe-main' >
      <iframe
        className='apt-iframe-frame'
        title='Appetize Tap Snack'
        src={url}
        width={width}
        height={height}
        frameBorder="0"
        scrolling="no"
      />
    </div>
  )
}

export const Appetize = props => {
  const [appetizeUrl] = useAppetizeUrl(props)

  return (
    <div className='apt-main' >
      { appetizeUrl ? <AppetizeFrame url={appetizeUrl} /> : <NoPublicKey /> }
    </div>
  )

}