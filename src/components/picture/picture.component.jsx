
const Picture = (props) => {
    
    return (
        <div className="column is-3">
          <div className="card">
            <div className='card-image'>
              <img src={props.picture}  alt={props.picture ? props.picture : ''} />
            </div>
          </div>
        </div>
    )
}

export default Picture;