import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.ID_Usuario}>
            {usuario.Nombre} - {usuario.Email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaUsuarios;
