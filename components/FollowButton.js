import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { me, followLodding, unfollowLodding } = useSelector((state) => state.user);
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    const onFollow = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            })
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            })
        }
    }, [isFollowing])
    return (
        <div>
            <Button onClick={onFollow} loading={followLodding || unfollowLodding}>
                {isFollowing ? '언팔로우' : '팔로우'}
            </Button>
        </div>
    )
}
FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
}
export default FollowButton;
