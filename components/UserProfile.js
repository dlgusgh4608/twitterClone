import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Button } from 'antd';



const UserProfile = ({setIsLogin}) => {
    const onLogout = useCallback(() => {
        setIsLogin(false);
    },[]);

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

UserProfile.propTypes = {
    setIsLogin:PropTypes.func.isRequired,
}


export default UserProfile;