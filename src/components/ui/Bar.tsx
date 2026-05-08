"use client";

import React, {ComponentProps} from "react";
import styled from "styled-components";

type Props = ComponentProps<"div"> & { children?: React.ReactNode };
const Bar = ({children}: Props) => {
    return (
        <StyledWrapper>
            <div className="button-container">
                {children}
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .button-container {
        display: flex;
        background-color: #805BA6;
        width: fit-content;
        height: 40px;
        align-items: center;
        justify-content: space-around;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0 5px 10px,
        rgba(128, 91, 166, 0.5) 5px 10px 15px;
        padding: 5px;
        gap: 8px;
    }

    .button {
        outline: 0 !important;
        border: 0 !important;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #F2F2F2;
        transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        padding: 0 10px;
    }

    .button:hover {
        width: 130px;
        background-color: rgba(255, 255, 255, 0.1);
    }

    .icon {
        font-size: 20px;
        flex-shrink: 0;
        margin-right: 10px;
        z-index: 1;
    }

    .title {
        display: inline-block;
        white-space: nowrap;
        transform: translateX(100%);
        opacity: 0;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        z-index: 1;
        font-size: 15px;
        font-family: "Arial", sans-serif;
    }

    .button:hover .title {
        transform: translateX(0);
        opacity: 1;
    }
`

export default Bar;
