import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../Context/PostDetails';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { FirebaseContext } from '../../Context/firebaseContext';
import './View.css';

function View() {
  const { postDetail } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function getUser() {
      if (postDetail && postDetail.userid) {
        const q = query(collection(db, 'users'), where('id', '==', postDetail.userid));
        const udata = await getDocs(q);
        udata.forEach((userDoc) => {
          if (userDoc.id === postDetail.userid) {
            setUserDetails(userDoc.data());
          }
        });
      }
    }

    getUser();
  }, [postDetail, db]);

  if (!postDetail) {
    return <div>Loading...</div>; // Or any other placeholder
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetail.imageurl} alt={postDetail.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetail.price}</p>
          <span>{postDetail.name}</span>
          <p>{postDetail.category}</p>
          <span>{new Date(postDetail.created.seconds * 1000).toLocaleDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails ? (
            <>
              <p>{userDetails.name}</p>
              <p>{userDetails.phone}</p>
            </>
          ) : (
            <p>Loading seller details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
