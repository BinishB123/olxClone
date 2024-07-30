

function SignupReducer(state,action){
     switch (action.type) {
        case "name":
            return {...state,name:action.value};
        case "email":
            return {...state,email:action.value};
        case "phone":
            return {...state,phone:action.value}
        case "password":
            return {...state,password:action.value}
     
        default:    
            break;
     }
}

export default SignupReducer