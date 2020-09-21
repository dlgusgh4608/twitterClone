import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Popover, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostHashContent from './PostHashContent';
import { POST_DELETE_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const { deletePostLodding } = useSelector((state) => state.post);

    const [liked, setLiked] = useState(false);
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);

    const [commentFormOpen, setCommentFormOpen] = useState(false);
    const onToggleComment = useCallback(() => {
        setCommentFormOpen((prev) => !prev);
    }, []);

    const onPostDelete = useCallback(() => {
        dispatch({
            type: POST_DELETE_REQUEST,
            data: post.id
        });
    }, [])
    return (
        <div style={{ marginBottom: 20 }}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key='retweet' />,
                    liked
                        ? <HeartFilled style={{ color: '#FF0080' }} onClick={onToggleLike} />
                        : <HeartOutlined key='heart' onClick={onToggleLike} />,
                    <MessageOutlined key='comment' onClick={onToggleComment} />,
                    <Popover key='more' content={(
                        <Button.Group>
                            {id && post.User.id === id
                                ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type='danger' onClick={onPostDelete} loading={deletePostLodding}>삭제</Button>
                                    </>
                                ) : <Button>신고</Button>}

                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostHashContent postData={post.content} />}
                >

                </Card.Meta>
                <Button></Button>
            </Card>
            {commentFormOpen && (
                <div>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout='horizontal'
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    author={item.User.nickname}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
        </div >
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.shape({
            id: PropTypes.number,
            nickname: PropTypes.string
        }),
        content: PropTypes.string,
        Images: PropTypes.arrayOf(PropTypes.object),
        Comments: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard
