import styled from "@emotion/styled";
import imagen from "./cryptomoneda.png";
import Formulario from './componentes/Formulario';
import { React, useState, useEffect} from "react";
import axios from "axios";
import Cotizacion from "./componentes/Cotizacion";
import Spinner from './componentes/Spinner.js';


const Contenedror = styled.div`
max-width: 900px;
margin: 0 auto;
@media (min-width: 992px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;

}
`;

const Imagen = styled.img`
max-width: 100%;
margin-top: 5rem;
`;

const Heading = styled.h1`
font-family:coolvetica;
color: #FFF;
font-size: 44px;
text-align: left;
font-weight: 700;
margin-top: 80px;
margin-bottom: 50px;
width: 100%;
letter-spacing: 3px;

&::after {
  content: '';
  width: 100px;
  height: 6px;
  background-color: #03A6A6;
  display: block;
}
`;

function App() {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

useEffect(() => {

  const cotizarCriptomoneda = async () => {
    if(moneda === '') return;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const resultado = await axios.get(url);

    guardarCargando(true);

    setTimeout(() => {
      guardarCargando(false);
      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
  }, 3000);
}
  cotizarCriptomoneda();
}, [moneda, criptomoneda]);

   const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;


  return (
    <div>
    <Contenedror>
    <div>
    <Imagen 
      src={imagen} alt='' />
    </div>
    <div>
      <Heading>
        COTIZA CRIPTOMONEDA
      </Heading>
      <Formulario 
        guardarMoneda={guardarMoneda}
        guardarCriptomoneda={guardarCriptomoneda}
      />
      {componente}
      
    </div>
    
    </Contenedror>

    </div>
  );
}

export default App;
