import './App.css';
import logo from './gallery-image-logo.svg';
import Picture from './components/picture/picture.component';
import { useEffect, useState } from 'react';

function App() {

  const [ search, setSearch] = useState('');
  const [ formData, setFormData ] = useState('');
  const [images, setImages] = useState([]);



    console.log(images);  
    const onChangeHandler = (event) => {
    const querySearch = event.target.value;
    setSearch(querySearch);
    
  }
  
  // firstly I fetch the images according to the query, secondly I empty the query
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    //console.log(search)
    setFormData(search);
    setSearch('');

    const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${formData}&client_id=7JuVGIWoo9CP4LANK_gcp0FFVY06RrsAj-XK6QXNGYk`);
    const images = await response.json();
    const datas = images.results;
    setImages(datas)
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
                <input className="input" type="text" placeholder="Find a repository" onChange={onChangeHandler} value={search}/>
              </p>
              <p className="control">
                <button className="button is-primary">search</button>
              </p>
          </div>
      </form>
      <div className="columns is-multiline is-mobile">     
      {
        images && images.map((image) => <Picture key={image.id} picture={image.urls.small}/>)
      }
        <Picture />
      </div>
    </div>
  );
}

export default App;
