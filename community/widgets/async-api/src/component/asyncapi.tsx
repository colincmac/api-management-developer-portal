// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react'
import styled from 'styled-components';
import AsyncApiComponent, { ConfigInterface } from "@asyncapi/react-component";
import { AsyncApiProps } from './asyncapi.types';
import "@asyncapi/react-component/styles/default.min.css";

const StyledAsyncApi = styled.div<AsyncApiProps>`
  color: #000;
`;



const AsyncApi: React.FC<AsyncApiProps> = ({ ...props }) => {
  console.log(props)
    return(
        <StyledAsyncApi data-testid="asyncApiTestId">
            <AsyncApiComponent {...props.componentProps} />
        </StyledAsyncApi>
    );
};

export default AsyncApi;