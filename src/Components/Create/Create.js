import React, { Fragment, useContext, useReducer, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import CreateReducer from "./createReducer";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { AuthContext, FirebaseContext } from "../../Context/firebaseContext";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  // const [name, setName] = useState("");
  // const [category, setCategory] = useState("");
 

  const [image, setImage] = useState("");
  const {  db, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const [error, setError] = useState("");
  console.log(user);
  const [state, dispatch] = useReducer(CreateReducer, {
    name: "",
    category: "",
    price: "",
    image: "",
  });

  const handleSubmit = () => {
   
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!state.name || !state.category || !state.price || !image) {
      setError("Please fill all the fields.");
      return;
    }
    
   
    if (!validImageTypes.includes(image.type)) {
      setError("Please upload a valid image (JPEG, PNG).");
      return;
    }
  
   
    
    if (state.price<=0) {
      setError("Enter correct price");
      return;
    }
  
    const currDate = Date.now();
    const storageRef = ref(storage, `images/${currDate + image.name}`);
    
    uploadBytes(storageRef, image)
      .then(() => {
        getDownloadURL(storageRef)
          .then(async (url) => {
            console.log("Image URL:", url);
            const proid = uuidv4();
            await setDoc(doc(db, "products", proid), {
              id: proid,
              name: state.name,
              category: state.category,
              price: state.price,
              imageurl: url,
              created: new Date(currDate),
              userid: user.uid,
            });
            navigate('/', { replace: true });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={state.name}
            onChange={(e) => dispatch({ type: "name", value: e.target.value })}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={state.category}
            onChange={(e) =>
              dispatch({ type: "category", value: e.target.value })
            }
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={state.price}
            onChange={(e) => dispatch({ type: "price", value: e.target.value })}
          />
          <br />

          <br />
          {image ? (
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={image ? URL.createObjectURL(image) : ""}
            ></img>
          ) : (
            ""
          )}

          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>
            upload and Submit
          </button>
          <p style={{ color: 'red' }}>{error}</p>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
