import './App.css';
import logo from './gallery-image-logo.svg';

function App() {

  return (
    <div className='container-is-widescreen'>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a href="https://bulma.io">
            <img src={logo} alt="logo  gallery" width="112" height="112" />
          </a>
        </div> 
      </nav>
      <div className="columns">
        <div className="column">
        <div className="card">
        <p>ici image</p>
      </div>
        </div>
        <div className="column">
          Second column
        </div>
        <div className="column">
          Third column
        </div>
        <div className="column">
          Fourth column
        </div>
      </div>
    </div>
  );
}

export default App;
