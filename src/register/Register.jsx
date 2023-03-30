import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gallery_logo from "../img/gallery.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from '../server/firebase';
import { doc, setDoc } from "firebase/firestore";

const Register = () =>  {
    const [ err, setErr ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
    
        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);
      
            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
      
            await uploadBytesResumable(storageRef, file).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                  //Update profile
                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                  });
                  //create user on firestore
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  });
      
                  //create empty user chats on firestore
                  await setDoc(doc(db, "userChats", res.user.uid), {});
                  navigate("/");
                } catch (err) {
                  console.log(err);
                  setErr(true);
                  setLoading(false);
                }
              });
            });
        } 
        catch (err) {
            setErr(true)
        }
    }    
          
           





    return (
    <div className='form_register'>
        <div className="form_container">
            <div className="form_header">
                <h1>React Chat</h1>
                <p>Регистрация</p>
            </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Имя и фамилия'/>
                    <input type="email" placeholder='Email'/>
                    <input type="password" placeholder='Пароль'/>
                    <input type="file" id='file' className='file'/>
                        <label htmlFor="file">
                            <img src={ gallery_logo } />
                            <span>Добавить аватар</span>
                        </label>

                        <button>Регистрация</button>
                        {loading && "Загрузка..."}
                        {err && <span style={{color: "red"}}>Что-то пошло не так!</span>}
                </form>
                <p>У вас есть аккаунт? <Link to="/login">Вход</Link></p>
            
        </div>
    </div>
  )
}   

export default Register