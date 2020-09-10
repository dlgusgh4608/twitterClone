import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';



const UserProfile = () => {

    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(logoutAction());
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">내 게시글</div>,
                <div key="following">팔로잉</div>,
                <div key="following">팔로워</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>삥뽕</Avatar>}
                title="ㄹㅇㅋㅋ"

            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    )
}



export default UserProfile;