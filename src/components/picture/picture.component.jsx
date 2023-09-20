
const Picture = ({picture, onZoom}) => {
    

    const onZoomImageHandler = (picture) => onZoom(picture);

    return (
        <div className="column is-3">
          <div className="card">
            <div className='card-image'>
              <img 
                src={picture}  
                alt={picture ? picture : ''} 
                onClick={() => onZoomImageHandler(picture)} 
                style={{ cursor: "pointer"}} />
            </div>
          </div>
        </div>
    )
}

export default Picture;