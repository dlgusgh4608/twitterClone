import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostHashContent = ({ postData }) => ( //my first content #hashtag #express
    <div>
        {postData.split(/(#[^\s#]+)/g).map((v, i) => {
            if (v.match(/(#[^\s#]+)/g)) {
                return <Link href={`/hashtag/${v.slice[1]}`} key={i} ><a>{v}</a></Link>
            }
            return v;
        })}
    </div>
)

PostHashContent.propTypes = {
    postData: PropTypes.string.isRequired,
}

export default PostHashContent;
