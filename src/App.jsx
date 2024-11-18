import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [lenght, setLength] = useState(5)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setpassword] = useState('')


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllow) string += "0123456789"
    if (charAllow) string += "@#$%&*"


    for (let i = 0; i <= lenght; i++) {

      let char = Math.floor(Math.random() * string.length)
      pass += string.charAt(char)
    }

    setpassword(pass)
  },
    [lenght, numAllow, charAllow, setpassword])

  useEffect(() => {

    passwordGenerator()

  }, [numAllow, charAllow, passwordGenerator])

  const passwordRef = useRef(null)

  const copyPass = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password]);

  return (
    <div className='bg-black h-dvh flex flex-col items-center justify-center'>
      <div className='w-full max-w-lg mx-auto  shadow-md rounded-lg px-4 py-4  text-blue-600 bg-gray-200 min-h-36'>
        <h1 className='font-semibold text-center text-2xl'>Password Generator</h1>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3 my-5'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />

        <div className='text-sm flex gap-x-5 flex-wrap'>
          <div className='flex gap-x-1 items-center'>
            <label className='font-medium'>Length : {lenght}</label>
            <input type="range"
              min={5}
              max={20}
              value={lenght}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />

          </div>

          <div className='flex gap-x-1 items-center'>
            <input type="checkbox"
              defaultChecked={numAllow}
              id='numberInput'
              className='cursor-pointer'
              onChange={() => setNumAllow((prev) => !prev)}
            />
            <label className='font-medium'>Numbers</label>
          </div>

          <div className='flex gap-x-1 items-center'>
            <input type="checkbox"
              defaultChecked={charAllow}
              id='charInput'
              className='cursor-pointer'
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label className='font-medium'>Characters</label>
          </div>

          <button className='bg-blue-600 text-white px-3 py-1 rounded-lg  shrink-0 font-medium' onClick={copyPass}>Copy</button>
        </div>



      </div>

    </div>

  )
}

export default App
