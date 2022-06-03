import { React, Fragment, useState } from 'react'
import styled from '@emotion/styled';

const Label = styled.label`
font-family: Arial, Helvetica, sans-serif;
color: #FFF;
font-weight: 200;
font-size: 1.5rem;
margin-top: 2rem;
display:block;
padding-bottom: 0.5rem;
`
const Select = styled.select`
width: 100%;
display: block;
padding: 1rem;
-webkit-appearance: none;
border-radius: 10px;
border:none;
`



const useMoneda = (label, stateInicial, opciones) => {
  
  const [state, setState] = useState(stateInicial);

  const Seleccionar = () => (
    <Fragment>
        <Label>{label}</Label>
        <Select onChange={e => setState(e.target.value)}
        value={state}>
               <option value="">Seleccione</option>  
               {opciones.map(opcion => (
                 <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
        </Select>         
    </Fragment>
  )
  

  //retornar state, interfaz y fn que modifica el state
  return [state, Seleccionar, setState];

};

export default useMoneda;