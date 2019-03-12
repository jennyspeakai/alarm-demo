import React from 'react';
import styled from 'styled-components';

const DefaultText = styled.h1`
    height: 100%;
    text-align: center;
    color: white;
    font-size: 4vw;
`;

// Displays the returned tts response by defualt
const Default = props => {
  return (
      <DefaultText>{props.response}</DefaultText>
  );
}

export default Default;
