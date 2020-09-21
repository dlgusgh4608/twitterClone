import React, { useCallback, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
    const dispatch = useDispatch();

    const id = useSelector((state) => state.user.me?.id)
    const { addCommentDone, addCommentLodding } = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');
    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone])
    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id }
        })
    }, [commentText, id])
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0 }}>
                <Input.TextArea
                    rows={4}
                    onChange={onChangeCommentText}
                    value={commentText}
                />
                <Button type='primary' htmlType='submit' style={{ float: 'right' }} loading={addCommentLodding}>올리기</Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm
