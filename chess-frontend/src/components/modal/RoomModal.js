import React from 'react';
import styled, { css } from 'styled-components';
import GridLayout from '../common/GridLayout';
import SubmitForm from '../common/SubmitForm';

const RoomModalBackgroundBlock = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0, 0.5);
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition: 1s;

    ${props => props.open && css`
        opacity: 1;
        visibility: visible;
    `}
`;
const RoomModalBlock = styled.div`
    position: fixed;
    top: 20%;
    left: 20%;
    height: 60%;
    width: 60%;
    padding: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(245,245,245, 0.8);
    box-shadow: 10px 10px 10px;
    z-index: 100;
`;



const RoomModal = ({ onBackgroundClick, onContentClick, ...rest }) => {
    return (
        <RoomModalBackgroundBlock
            {...rest}
            onClick={onBackgroundClick}
        >
            <RoomModalBlock
                onClick={onContentClick}
            >
                <GridLayout />
                <SubmitForm />
            </RoomModalBlock>
        </RoomModalBackgroundBlock>
    )
};

export default React.memo(RoomModal);