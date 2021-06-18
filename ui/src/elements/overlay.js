import React from 'react'

import styled from 'styled-components'

const BodyOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  background: rgba(39, 42, 43, 0.8);
  border-radius: 4px;
  width: 98%;
  height: 100%;
  min-height: 400px;
`;

export default function Overlay(props) {
  return (
    <BodyOverlay>
      {props.children}
    </BodyOverlay>
  )
}
