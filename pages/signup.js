import React, { useCallback, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
    color:red;    
`;

const Signup = () => {

    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [nickname, onChangeNickname] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, []);

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return passwordError(true);
        }
        if (!term) {
            return termError(true);
        }
        console.log(id, nickname, password);
    }, [password, passwordCheck, term]);

    return (
        <>
            <Head>
                <title>twitter | signup</title>
            </Head>
            <AppLayout>
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor='user-id'>아이디</label>
                        <br />
                        <Input.Search name='user-id' placeholder='아이디를 입력해주세요.' enterButton='중복확인' required value={id} onChange={onChangeId} />
                    </div>
                    <div>
                        <label htmlFor='user-nickname'>닉네임</label>
                        <br />
                        <Input name='user-nickname' placeholder='닉네임을 입력해주세요.' required value={nickname} onChange={onChangeNickname} />
                    </div>
                    <div>
                        <label htmlFor='user-passsord'>비밀번호</label>
                        <br />
                        <Input.Password name='user-password' placeholder='비밀번호를 입력해주세요.' required value={password} onChange={onChangePassword} />
                    </div>
                    <div>
                        <label htmlFor='user-password-check'>비밀번호 확인</label>
                        <br />
                        <Input.Password name='user-password-check' placeholder='비밀번호를 한번 더 입력해주세요.' required value={passwordCheck} onChange={onChangePasswordCheck} />
                        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </div>
                    <div>
                        <Checkbox name='user-term' checked={term} onChange={onChangeTerm} >더 콰트로치즈와퍼가 맛있는것에 동의하십니까? ㅇㅇ 동의</Checkbox>
                        {termError && <ErrorMessage>약관에 동의해주세요.</ErrorMessage>}
                    </div>
                    <div>
                        <Button type='primary' htmlType='submit'>가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
};

export default Signup;