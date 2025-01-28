import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Menu from './Menu';
import Slider from 'react-slick';
import './Home.css';

// Importa las imágenes locales
import imagen1 from '../images/m1.png';
import imagen2 from '../images/m2.png';
import imagen3 from '../images/m3.png';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home">
      {/* Menú de navegación */}
      <Menu />

      {/* Carrusel de imágenes con imágenes locales */}
      <Slider {...settings} className="carousel">
        <div>
          <img src={imagen1} alt="Imagen 1" />
        </div>
        <div>
          <img src={imagen2} alt="Imagen 2" />
        </div>
        <div>
          <img src={imagen3} alt="Imagen 3" />
        </div>
      </Slider>

      <h2>Cine GT, el cine más chapín que el pescadito Ruiz 🐟⚽</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Home;
