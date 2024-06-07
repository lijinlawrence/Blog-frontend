import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonApi"



export const registerApi=async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/api/users`,user,"")
}

export const loginApi = async (user)=>{
    return await commonAPI('POST',`${BASE_URL}/api/users/login`,user,"")
}

export const createPostApi = async (reqBody,reqHeader)=>{
    return await commonAPI('POST',`${BASE_URL}/api/posts`,reqBody,reqHeader)
}

export const userPostApi  = async (userId,reqHeader)=>{
    return await commonAPI('GET',`${BASE_URL}/api/posts/userPost/${userId}`,null,reqHeader)
}

export const userSinglePost = async (postId)=>{
    return await commonAPI("GET ",`${BASE_URL}/api/posts/${postId}`,null,"") 
}



