import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp, FieldValue } from 'firebase/firestore'
import { db } from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

interface FormData {
  name: string
  email: string
  password: string
  timestamp?: FieldValue
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: name,
        })

        const { password, ...formDataCopy } = formData
        formDataCopy.timestamp = serverTimestamp()

        await setDoc(doc(db, 'users', user.uid), formDataCopy)

        navigate('/')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Create an account</p>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          className='nameInput'
          placeholder='Name'
          id='name'
          value={name}
          onChange={onChange}
        />
        <input
          type='email'
          className='emailInput'
          placeholder='Email'
          id='email'
          value={email}
          onChange={onChange}
        />
        <div className='passwordInputDiv'>
          <input
            type={showPassword ? 'text' : 'password'}
            className='passwordInput'
            placeholder='Password'
            id='password'
            value={password}
            onChange={onChange}
          />
          <img
            src={visibilityIcon}
            alt='Show password'
            className='showPassword'
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </div>
        <Link to='/forgot-password' className='forgotPasswordLink'>
          Forgot Password
        </Link>
        <div className='signUpBar'>
          <p className='signUpText'>Sign Up</p>
          <button className='signUpButton'>
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
          </button>
        </div>
      </form>
      <OAuth />
      <Link to='/sign-in' className='registerLink'>
        Already have an account? Sign In
      </Link>
    </div>
  )
}

export default SignUp
