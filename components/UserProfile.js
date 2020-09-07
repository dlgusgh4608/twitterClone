import React, {useCallback} from 'react';
import { Card, Avatar, Button} from 'antd';



const UserProfile = () => {
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
        <Button>로그아웃</Button>
    </Card>
}

export default UserProfile;