/** @format */

import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostFetch, getUserFetch } from './actions';
function App() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  // const [post, setPost] = useState([]);
  // const users = useSelector((state) => state.users.users);
  // const posts = useSelector((state) => state.posts.posts);
  // useEffect(() => {
  //   if (posts === undefined) return;
  //   setPost(posts);
  // });
  return (
    <div className='flex justify-center mt-16'>
      <div class='w-full max-w-xs'>
        <form class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h1 className='p-5 text-center'>Are you Stupid</h1>
          <div class='flex items-center justify-between'>
            <button
              onMouseEnter={() => {
                setShow(true);
              }}
              onMouseLeave={() => {
                setShow(false);
              }}
              class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'>
              Yes
            </button>
            {show === true ? (
              <button
                onMouseEnter={() => {
                  setShow(true);
                }}
                onMouseLeave={() => {
                  setShow(false);
                }}
                class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'>
                Yes your are 😂😂😂😂😂
              </button>
            ) : (
              <button
                onMouseEnter={() => {
                  setShow(true);
                }}
                class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'>
                no
              </button>
            )}
          </div>
        </form>
        <p class='text-center text-gray-500 text-xs'>
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
      {/* <button
        onClick={() => {
          dispatch(getUserFetch());
        }}>
        fetch
      </button>
      <button
        onClick={() => {
          dispatch(getPostFetch());
        }}>
        product
      </button>
      <div>
        posts:
        {post?.map((post) => {
          return (
            <>
              <h1>{post.name}</h1>
            </>
          );
        })}
      </div>
      <div>
        users:
        {users?.map((user) => {
          return (
            <>
              <h1>{user.name}</h1>
            </>
          );
        })}
      </div> */}
    </div>
  );
}

export default App;
