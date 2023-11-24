import { NoteModel } from "../models/note";
import { UserModel } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)
    if (response.ok) {
        return response
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error 
        throw Error(errorMessage)
    }
}

export async function getLoggedInUser():Promise<UserModel> {
    const response = await fetchData("api/users", { method: "GET"})
    return response.json();
}

export interface SingUpCredentials {
    username: string,
    password: string,
    email: string,
}

export async function signUp(credentials:SingUpCredentials):Promise<UserModel> {
    const response = await fetchData("api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login (credentials:LoginCredentials): Promise<UserModel>{
    const response = await fetchData("api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export async function logout(){
    await fetchData("api/users/logout", { method: "POST" })
}

export async function fetchNotes():Promise<NoteModel[]> {
    const response = await fetchData("/api/notes")
    return response.json();
} 

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note:NoteInput):Promise<NoteModel> {
    const response = await fetchData("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    return response.json();
} 

export async function updateNote(noteId: string, note: NoteInput): Promise<NoteModel> {
    const response = await fetchData("/api/notes/"+noteId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });
    return response.json();
} 

export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/"+noteId, {method: "DELETE"})
} 
