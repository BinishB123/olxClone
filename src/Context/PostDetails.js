import { createContext, useState } from "react";


export const PostContext = createContext()

export default function PostContextDetail({children}){
  const [postDetail, setPostDetail] = useState(null)
    return(
        <PostContext.Provider value={{ postDetail, setPostDetail }}>
      {children}
    </PostContext.Provider>
    )
}