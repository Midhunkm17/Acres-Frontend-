import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


//signUp
export const signUpApi=async (body)=>{
    return await commonApi('POST',`${BASE_URL}/user/signup`,body,"")
}

//login
export const loginApi=async (body)=>{
    return await commonApi('POST',`${BASE_URL}/user/login`,body,"")
}

//profileUpdate
export const profileUpdateApi=async (body,headers,id)=>{
    return await commonApi('PUT',`${BASE_URL}/user/update-profile/${id}`,body,headers)
}


//add property
export const addPropertyApi=async(body,headers)=>{
    return await commonApi('POST',`${BASE_URL}/user/add-property`,body,headers)
}

//user property
export const userPropertyApi=async(headers,id)=>{
    return await commonApi('GET',`${BASE_URL}/user/my-properties/${id}`,"",headers)
}

//all properties
export const allPropertyApi=async(searchData)=>{
    return await commonApi('GET',`${BASE_URL}/user/all-properties?search=${searchData}`,"","")
}

//get some random properties
export const homePropertyApi=async()=>{
    return await commonApi('GET',`${BASE_URL}/home/home-properties`,"","")
}

//update Property
export const updatePropertyApi=async(body,headers,id)=>{
    return await commonApi('PUT',`${BASE_URL}/user/edit-properties/${id}`,body,headers)
}

//delete property
export const deletePropertyApi=async(headers,id)=>{
    return await commonApi('DELETE',`${BASE_URL}/user/delete-property/${id}`,{},headers)
}

//get specified property
export const specifiedPropertyApi=async(headers,id)=>{
    return await commonApi('GET',`${BASE_URL}/user/view-property/${id}`,"",headers)
}

