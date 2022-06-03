import React from 'react'
import styled from '@emotion/styled'

const MensajeError = styled.p`
background-color: transparent;
border: 1px solid #b7322c;
border-radius: 10px;
padding: 1rem;
color: #b7322c;
font-size: 20px;
font-family: Arial, Helvetica, sans-serif;
font-weight: 200;
text-align: center;
`;

const Error = ({mensaje}) => {
  return (
    <MensajeError>{mensaje}</MensajeError>
  );
}

export default Error