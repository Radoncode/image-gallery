import './App.css';
import logo from './gallery-image-logo.svg';
import Picture from './components/picture/picture.component';
import { useEffect, useReducer } from 'react';

const PICTURE_ACTION_TYPES = {
  'STORE_NAME_PICTURE': 'STORE_NAME_PICTURE',
  'CHANGE_NAME_PICTURE': 'CHANGE_NAME_PICTURE',
  'FETCH_PICTURES': 'FETCH_PICTURES',
  'DISPLAY_PICTURES': 'DISPLAY_PICTURES',
  'SELECT_PICTURE': 'SELECT_PICTURE',
  'OPEN_MODAL': 'OPEN_MODAL'
}

const pictureReducer = (state, action) => {

  const {type, payload} = action;

  switch(type) {
    case PICTURE_ACTION_TYPES.STORE_NAME_PICTURE:
      return {
        ...state,
        search: state.search
      };
    case PICTURE_ACTION_TYPES.CHANGE_NAME_PICTURE:
       return {
        ...state,
        search: payload
      };
    case PICTURE_ACTION_TYPES.FETCH_PICTURES:
      return {
        ...state,
        search: '',
        formData: payload
      }
    case PICTURE_ACTION_TYPES.DISPLAY_PICTURES:
      return {
        ...state,
        images: payload
      }
    case PICTURE_ACTION_TYPES.SELECT_PICTURE:
      return {
        ...state,
        selectedPicture: payload
      }
    case PICTURE_ACTION_TYPES.OPEN_MODAL:
      return {
        ...state,
        openModal: payload
      }
    default:
      throw new Error(`Unknown action ${type}`);
  }
}

const INITIAL_STATE = {
  search: '',
  formData: '',
  images: [],
  selectedPicture: '',
  openModal: false
}

function App() {

  const[ state, dispatch] = useReducer(pictureReducer, INITIAL_STATE);
   
  const onChangeHandler = (event) => {
    dispatch({type: 'CHANGE_NAME_PICTURE', payload: event.target.value})
  }
  
  //when formData is updated , I start the useEffect function
  useEffect(() => {
    const fetchImages =  async () => {
      const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${state.formData}&client_id=7JuVGIWoo9CP4LANK_gcp0FFVY06RrsAj-XK6QXNGYk`);
      const images = await response.json();
      const datas = images.results;
      dispatch({type: 'DISPLAY_PICTURES', payload: datas})
    }
    fetchImages();

  }, [state.formData])


  const onSubmitHandler =  (event) => {
    event.preventDefault();
    dispatch({type: 'STORE_NAME_PICTURE'})
    dispatch({type: 'FETCH_PICTURES', payload: state.search })
  }

  const onZoom = (picture) => {
    dispatch({type: 'SELECT_PICTURE', payload: picture})
    dispatch({type: 'OPEN_MODAL', payload: true})
  }

  const inZoom = () => {
    dispatch({type: 'SELECT_PICTURE'})
    dispatch({type: 'OPEN_MODAL', payload: false})
  }
  
  // create new array with only the Urls , I retrieve the index of the picture using useState 
  // for changing the state according to the new index
  const onMoveLeft = (picture) => {
    const imagesUrls = state.images.map(image => image.urls.small);
    const indexUrlPicture = imagesUrls.indexOf(picture);
    dispatch({type: 'SELECT_PICTURE', payload:imagesUrls[indexUrlPicture + 1]});
    if(typeof(imagesUrls[indexUrlPicture + 1]) === 'undefined'){
      dispatch({type: 'SELECT_PICTURE', payload: ''})
      dispatch({type: 'OPEN_MODAL', payload: false})
    }

  }
  const onMoveRight = (picture) => {
    const imagesUrls = state.images.map(image => image.urls.small);
    const indexUrlPicture = imagesUrls.indexOf(picture);
    dispatch({type: 'SELECT_PICTURE', payload:imagesUrls[indexUrlPicture - 1]})
    if(typeof(imagesUrls[indexUrlPicture - 1]) === 'undefined'){
      dispatch({type: 'SELECT_PICTURE', payload: ''})
      dispatch({type: 'OPEN_MODAL', payload: false})
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
                <input className="input" type="text" placeholder="Find a photo" onChange={onChangeHandler} value={state.search}/>
              </p>
              <p className="control">
                <button className="button is-primary">search</button>
              </p>
          </div>
      </form>
      <div className="columns is-multiline is-mobile">     
      {
        state.images && state.images.map(
          (image) => <Picture 
                        key={image.id} 
                        picture={image.urls.small} 
                        onZoom={onZoom}
                      />)
      }
      </div>
      <div className={`modal ${state.openModal ? 'is-active' : ''}`} >
        <div className="modal-background"></div>
          <div className="modal-content slide">
              <div className="arrow left" onClick={() => onMoveLeft(state.selectedPicture)} />
              <img className='image' src={state.selectedPicture} alt="" onClick={inZoom}/>
              <div className="arrow right" onClick={() => onMoveRight(state.selectedPicture)}/>
          </div>
        </div>
      </div>
  );
}

export default App;
