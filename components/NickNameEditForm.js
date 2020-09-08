import React from 'react';
import {Form, Input } from 'antd';
import styled from 'styled-components';

const NicknameEditForm = () => {
    const SearchForm = styled(Form)`
        margin-button:20px;
        border:1px solid #d9d9d9;
        padding:20px;
    `;
    return(
        <SearchForm>
            <Input.Search addonBefore='닉네임' enterButton='수정' />
        </SearchForm>
    )
}

export default NicknameEditForm;