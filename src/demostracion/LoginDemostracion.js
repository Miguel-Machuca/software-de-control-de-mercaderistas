import React from "react";


import FooterSmall from "components/Footers/FooterSmall.js";

// views

import LoginDominio from "dominio/LoginDominio";

export default function LoginDemostracion() {
  return (
    <LoginDominio>
      {({
      handleSubmit,
      handleChange    }) => (
          <>      
          <main>
            <section className="relative w-full h-full py-40 min-h-screen">
              <div
                className="absolute top-0 w-full h-full bg-lightBlue-400 bg-no-repeat bg-full"
                style={{
                  backgroundImage:
                    "url(" + require("assets/img/register_bg_2.png").default + ")",
                }}
              ></div>
                <div className="container mx-auto px-4 h-full">
                  <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                          <div className="text-center mb-3">
                            <h6 className="text-blueGray-500 text-sm font-bold">
                              Iniciar Sessión
                            </h6>
                          </div>

                          <hr className="mt-6 border-b-1 border-blueGray-300" />
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                          <form onSubmit={handleSubmit}>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Email
                              </label>
                              <input
                                
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                type="email"
                                id="email"
                                name="email"
                                placeholder=""
                                onChange={handleChange}
                              />
                              
                            </div>

                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Password
                              </label>
                              <input                                
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                type="password"
                                id="password"
                                name="password"
                                placeholder=""
                                onChange={handleChange}
                              />
                            </div>
                            <div>
                              <label className="inline-flex items-center cursor-pointer">
                                <input
                                  id="customCheckLogin"
                                  type="checkbox"
                                  className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                />
                                <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                  Recordar
                                </span>
                              </label>
                            </div>

                            <div className="text-center mt-6">
                              <button
                                className="text-white bg-lightBlue-400 rounded-full border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                              >
                                Iniciar
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="flex flex-wrap mt-6 relative">
                        <div className="w-1/2">
                          <a
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            className="text-white hover:text-blueGray-300"
                          >
                            <small>Olvido su contraseña?</small>
                          </a>
                        </div>
                        <div className="w-1/2 text-right">
                          <a
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            className="text-white hover:text-blueGray-300"
                          >
                            <small>Crear nueva cuenta</small>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          
              <FooterSmall absolute />
            </section>
          </main>
          </>        
      )}
    </LoginDominio>
  );
}
