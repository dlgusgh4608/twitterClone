import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

import NicknameEditForm from '../components/NickNameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { me } = useSelector((state) => state.user);

    return (
        <>
            <Head>
                <title>twitter | profile </title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header='팔로잉 목록' data={me.Followings} />
                <FollowList header='팔로워 목록' data={me.Follwers} />
            </AppLayout>
        </>
    )
}
export default Profile;