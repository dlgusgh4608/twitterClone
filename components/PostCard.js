import React from 'react';
import { Card, Button, Popover } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, } from '@ant-design/icons';

const PostCard = ({ post }) => {
    return (
        <div>
            <Card
                // cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined />,
                    <HeartOutlined />,
                    <MessageOutlined />,
                    <Popover content={[
                        <Button.Group>
                            <Button>수정</Button>
                            <Button>삭제</Button>
                            <Button>신고</Button>
                        </Button.Group>
                    ]}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                {/* <Image />
                <Content />
                <Button></Button> */}
            </Card>
            {/* <CommentForm />
            <Comments /> */}
        </div>
    )
}

export default PostCard
