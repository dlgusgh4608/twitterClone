import React, { useCallback, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { addPostRequest } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
    const dispatch = useDispatch();
    const { imagePaths, addPostDone, addPostLodding } = useSelector((state) => state.post);
    const [text, onChangeText, setText] = useInput('');

    useEffect(() => {
        if (addPostDone) {
            setText('');
        }
    }, [addPostDone])

    const onSubmit = useCallback(() => {
        dispatch(addPostRequest(text));
    }, [text]);
    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current])
    return (
        <Form style={{ margin: '10px 0 20px' }} encType='multipart/form-data' onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder='what today'
            />
            <div>
                <input type='file' multipart hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type='primary' style={{ float: 'right' }} htmlType='submit' loading={addPostLodding}>쨱짹</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={v} style={{ width: '200px' }} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default PostForm
