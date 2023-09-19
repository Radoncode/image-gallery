
const Picture = (props) => {
    //const { image } = props.picture;
    console.log(props.picture)
    return (
        <div className="column is-3">
          <div className="card">
            <div className='card-image'>
              <img src={props.picture}  alt='logo gallery' />
            </div>
          </div>
        </div>
    )
}

export default Picture;