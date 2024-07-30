export default function CreateReducer(state,action){
    
    switch (action.type) {
        case "name":
            
           return{...state,name:action.value};
           case "category":
            
           return{...state,category:action.value};
           case "price":
            
           return{...state,price:action.value};
           case "image":
            
           console.log("Reducer: setting image", action.image);
           return { ...state, image: action.image };
    
        default:
            break;
    }
} 