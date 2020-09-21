import React, { useCallback, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const ErrorMessage = styled.div`
    color:red;    
`;

const Signup = () => {
    const { signUpLodding } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [email, onChangeEmail] = useInput('');
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
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname }
        })
        console.log(email, nickname, password);
    }, [password, passwordCheck, term]);

    return (
        <>
            <Head>
                <title>twitter | signup</title>
            </Head>
            <AppLayout>
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor='user-email'>이메일</label>
                        <br />
                        <Input name='user-email' placeholder='이메일을 입력해주세요.' required value={email} onChange={onChangeEmail} />
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
                        <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>ㄹㅇㅋㅋ</Checkbox>
                        {termError && <ErrorMessage>약관에 동의해주세요.</ErrorMessage>}
                    </div>
                    <div>
                        <Button type='primary' htmlType='submit' loading={signUpLodding}>가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
};

export default Signup;