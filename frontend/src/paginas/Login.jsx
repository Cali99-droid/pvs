

export default function Login() {
  return (
    <> 
            <div>
                <h1 className="text-indigo-600 font-black text-6xl  ">Inicia Sesion y administra tus <span className="text-black">pacientes</span> </h1>
            </div>
            <div>
                <form action="">
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Email</label>
                        <input type="email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="Email de registro"/>
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Password</label>
                        <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="Tu passord"/>
                    </div>

                    <input type="submit" value='Iniciar sesion' className="bg-indigo-700 w-full py-3 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10"/>
                </form>
            </div>
      
    </>
  )
}
