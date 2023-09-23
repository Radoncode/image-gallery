import './App.css';
import logo from './gallery-image-logo.svg';
import Picture from './components/picture/picture.component';
import { useEffect, useState } from 'react';

function App() {

  const [ search, setSearch] = useState('');
  const [ formData, setFormData ] = useState('');
  const [images, setImages] = useState([]);

  const [selectedPicture, setSelectedPicture] = useState('');
  const [openModal, setOpenModal] = useState(false);


   
  const onChangeHandler = (event) => {
  const querySearch = event.target.value;
  setSearch(querySearch);
  }
  
  //when formData is updated , I start the useEffect function
  useEffect(() => {

    const fetchImages =  async () => {
      const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${formData}&client_id=7JuVGIWoo9CP4LANK_gcp0FFVY06RrsAj-XK6QXNGYk`);
      const images = await response.json();
      const datas = images.results;
      setImages(datas)
    }
    fetchImages();

  }, [formData])


  const onSubmitHandler =  (event) => {
    event.preventDefault();
    setFormData(search);
    setSearch('');  
  }

  const onZoom = (picture) => {
    setSelectedPicture(picture);
    setOpenModal(true);
  }

  const inZoom = () => {
    setSelectedPicture('');
    setOpenModal(false);
  }
  
  // create new array with only the Urls , I retrieve the index of the picture using useState 
  // for changing the state according to the new index
  const onMoveLeft = (picture) => {
    const imagesUrls = images.map(image => image.urls.small);
    const indexUrlPicture = imagesUrls.indexOf(picture);
    setSelectedPicture(imagesUrls[indexUrlPicture + 1]);
    if(typeof(imagesUrls[indexUrlPicture + 1]) === 'undefined'){
      setSelectedPicture('');
      setOpenModal(false);
    }

  }
  const onMoveRight = (picture) => {
    const imagesUrls = images.map(image => image.urls.small);
    const indexUrlPicture = imagesUrls.indexOf(picture);
    setSelectedPicture(imagesUrls[indexUrlPicture - 1]);
    if(typeof(imagesUrls[indexUrlPicture - 1]) === 'undefined'){
      setSelectedPicture('');
      setOpenModal(false);
    }
  }

  

  return (
    <div className='container-is-widescreen'>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <img src={logo} alt="logo  gallery" width="112" height="112" />
        </div> 
      </nav>
      <form className='columns is-centered' onSubmit={onSubmitHandler}>
          <div className="field is-grouped mt-6">
              <p className="control is-expanded">
                <input className="input" type="text" placeholder="Find a photo" onChange={onChangeHandler} value={search}/>
              </p>
              <p className="control">
                <button className="button is-primary">search</button>
              </p>
          </div>
      </form>
      <div className="columns is-multiline is-mobile">     
      {
        images && images.map(
          (image) => <Picture 
                        key={image.id} 
                        picture={image.urls.small} 
                        onZoom={onZoom}
                      />)
      }
      </div>
      <div className={`modal ${openModal ? 'is-active' : ''}`} >
        <div className="modal-background"></div>
          <div className="modal-content slide">
              <div className="arrow left" onClick={() => onMoveLeft(selectedPicture)} />
              <img className='image' src={selectedPicture} alt="" onClick={inZoom}/>
              <div className="arrow right" onClick={() => onMoveRight(selectedPicture)}/>
          </div>
        </div>
      </div>
  );
}

export default App;
