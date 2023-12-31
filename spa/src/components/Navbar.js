
function Navbar({ setPage }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-brand nav-link" href="/" onClick={() => setPage("home")}>Mon E-commerce</button>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link" aria-current="page" href="/" onClick={() => setPage("home")}>Accueil</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => setPage("products")}>Produits</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
