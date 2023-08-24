import React,{ useEffect, useState } from 'react';
import { useParams,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '../components/Layout';
import userPofileApi from '../api/userPofileApi';
import { BASE_URL } from '../utils/constants';


const ProfilePage = () => {

  const { user,isAuthenticated,loading } = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);

  const param = useParams();
  const email = param.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userPofileApi(email);
        setProfile(data.profile_user)
        setPosts(data.profile_posts);
      } catch (error) {
        console.error(error);
      }
    };  
    fetchData();
  }, [email]);

  if(!isAuthenticated && !loading && user === null){
    return <Navigate to='/' />
  }

  return (
    <Layout title="Postbox | Profile" content="Profile page">
       
<section className="pt-16 bg-blueGray-50">
<div className="w-full lg:w-11/12 px-4 mx-auto">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-[0_0_15px_-3px_rgba(0,0,0,0.17),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-lg mt-16">
    <div className="px-6">
      <div className="flex flex-wrap justify-center">
        {/* <div className="w-full px-4 flex justify-center"> */}
          <div className="relative rounded-full align-middle border-none -m-16 -ml-20 lg:-ml-16 max-w-150-px  w-48 h-48">
            <img  src={`${BASE_URL}${profile?.display_pic}`} className="shadow-lg rounded-full h-auto align-middle border-none absolute max-w-150-px  w-48" alt="profile_pic"/>
            {profile?.email === user?.email ?(
              <div className='flex justify-center items-center rounded-full w-10 h-10 bg-white border-2 absolute bottom-0 right-0'>
                <span class="material-symbols-outlined">edit</span>
              </div>
            ):''}
          </div>
        {/* </div> */}
        
        <div className="w-full px-4 text-center mt-16">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                22
              </span>
              <span className="text-sm text-blueGray-400">Followers</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                10
              </span>
              <span className="text-sm text-blueGray-400">Following</span>
            </div>
            <div className="lg:mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {profile?.id ?? "0"}
              </span>
              <span className="text-sm text-blueGray-400">Posts</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 ">
          {profile?.first_name ?? ""} {profile?.last_name ?? ""}
        </h3>
        <div className="mb-2 text-blueGray-600 mt-4">
          <span class="material-symbols-outlined mr-2 align-middle text-xl text-blueGray-400">mail</span>
          {profile?.email ?? ""}
        </div>
        <div className="mb-2 text-blueGray-600">
        <span class="material-symbols-outlined mr-2  align-middle text-xl text-blueGray-400">person </span>
          {profile?.username ?? ""}
        </div>
      </div>
      <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div className="flex flex-wrap justify-center">
          
          {posts ? (
                    posts.map((post) => (
                      <div
                        key={post.id}
                        className="p-2 border-b border-blueGray-200 text-center m-2 transition-transform transform-gpu hover:scale-110"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                      >
                        <div
                          style={{
                            width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center',
                          }}
                        >
                          <img
                            src={`${BASE_URL}${post.img}`}
                            alt="post"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            className='rounded-md cursor-pointer'
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No posts available.</p>
                  )}
        </div>
      </div>
    </div>
  </div>
</div>
</section>


    </Layout>
  );
}

export default ProfilePage
