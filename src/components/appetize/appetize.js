import './appetize.css'

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
    height,
    width,
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

export const Appetize = ({ url }) => {
  return (
    <div className='apt-main' >
      { url ? <AppetizeFrame url={url} /> : <NoPublicKey /> }
    </div>
  )

}