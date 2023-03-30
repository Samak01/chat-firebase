import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../server/firebase';



const  LogIn = () => {
  const navigate = useNavigate()
  const [ err, setErr ] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        try{
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/")
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
                <p>Вход</p>
            </div>
    
    
                <form onSubmit={handleSubmit}>
                    <input 
                      type="email" 
                      placeholder='Email'
                    />
                    <input 
                        type="password" 
                        placeholder='Пароль'
                    />
                    
                      <button>Войти</button>
                      {err && <span style={{color: "red"}}>Что-то пошло не так!</span>}
                </form>
                <p>У вас нет аккаунта? <Link to='/register'>Регистрация</Link></p>
            
        </div>
      </div>
      )
      }    


export default LogIn