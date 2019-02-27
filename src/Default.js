import React from 'react';
import styled from 'styled-components';

const DefaultText = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 4vw;
`;


const Default = props => {

  return (
      <DefaultText>{props.response}</DefaultText>
  );
}

export default Default;
