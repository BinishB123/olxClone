import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import firebase from 'firebase/compat/app';
import { getDocs,collection} from "firebase/firestore"
import { snapshotEqual } from 'firebase/firestore';
import { FirebaseContext } from '../../Context/firebaseContext';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../Context/PostDetails';

function Posts() {
  const [post ,setPosts] = useState([])
  const {db} = useContext(FirebaseContext)
   const {postDetail, setPostDetail}= useContext(PostContext)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allPosts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
   
  },[] );
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        
        <div className="cards">
          {post.map(post => (
            <div key={post.id} className="card"  onClick={()=>{
              setPostDetail(post)
              navigate('/view')}}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={post.imageurl} alt={post.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {post.price}</p>
                <span className="kilometer">{post.category}</span>
                <p className="name">{post.name}</p>
              </div>
              <div className="date">
                <span>{new Date(post.created.seconds * 1000).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {post.map(post => (
            <div key={post.id} className="card" onClick={()=>{
              setPostDetail(post)
              navigate('/view')}}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={post.imageurl} alt={post.name} />
              </div>
              <div className="content">
                <h2 className="rate">&#x20B9; {post.price}</h2>
                <h3 className="kilometer">{post.category}</h3>
                <h3 className="name">{post.name}</h3>
              </div>
              <div className="date">
                <h4>created at : </h4>
                <span>{new Date(post.created.seconds * 1000).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
