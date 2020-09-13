import React, { useCallback } from 'react';
import { Form, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import {useSelector} from 'react-redux';

const CommentForm = ({ post }) => {
    const id = useSelector((state) => state.user.me?.id)
    const [commentText, onChangeCommentText] = useInput('');
    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
    }, [commentText])
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position:'relative', margin:0}}>
                <Input.TextArea
                    rows={4}
                    onChange={onChangeCommentText}
                    value={commentText}
                />
                <Button type='primary' htmlType='submit' style={{float:'right' }}>올리기</Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm
