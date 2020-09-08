import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

import NicknameEditForm from '../components/NickNameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
    const followerList = [{ nickname: 'leehyun' }, { nickname: 'hyunho' }, { nickname: 'leeho' },{nickname:'zzfnQLdQHd'}];
    const followingList = [{ nickname: 'leehyun' }, { nickname: 'hyunho' }, { nickname: 'leeho' }];


    return (
        <>
            <Head>
                <title>twitter | profile </title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header='팔로잉 목록' data={followingList} />
                <FollowList header='팔로워 목록' data={followerList} />
            </AppLayout>
        </>
    )
}
export default Profile;