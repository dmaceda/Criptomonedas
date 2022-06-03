import {React, useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCripto from '../hooks/useCripto'
import axios from 'axios'
import Error from './Error'



const Boton = styled.input`
margin-top: 20px;
font-weight: 200;
font-size: 20px;
padding: 10px;
background-color: #03A6A6;
border:none;
width: 100%;
border-radius: 10px;
color: #FFF;
transition: background-color .3s ease;


&:hover {
    background-color: #30D9C8;
    cursor: pointer;
}
`

const Formulario = ({guardarCriptomoneda, guardarMoneda}) => {
   
  const [listaCripto, setListaCripto] = useState([]);
  const [error, setError] = useState(false);


  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar' },
    { codigo: 'ARG', nombre: 'Peso Argentino' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'BRL', nombre: 'Real' },
  ]

    const [moneda, SelectMonedas, setState ] = useMoneda('Selecciona Moneda', '', MONEDAS);
    
    const [cripto, SelectCripto] = useCripto('Selecciona Criptomoneda', '', listaCripto);
    
    useEffect (() => {
      const consultarAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        const resultado = await axios.get(url);
        setListaCripto(resultado.data.Data);
      }
      consultarAPI();
    }, []);

    const cotizarMoneda = e => {
      e.preventDefault();
      if(moneda === '' || cripto === ''){
        setError(true);
        return;
      }

      setError(false);
      guardarMoneda(moneda);
      guardarCriptomoneda(cripto);
      
    }
  return (
    <form
      onSubmit={cotizarMoneda}
    >
      {error? <Error mensaje='Todos los campos son obligatorios'/>: null}
        <SelectMonedas />
        <SelectCripto />
        <Boton type='submit' value='Calcular'/>
    </form>
  )
}

export default Formulario;