import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ isBlack }: { isBlack?: boolean}) => {
  return (
    <div className={`flex w-ful justify-center md:justify-between py-5 px-20 backdrop-blur-sm text-white mb-4 ${isBlack && "bg-black"}`}>
        <div>
            <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="scale-150"
            />
        </div>
        <div className="hidden md:flex gap-6">
            <NavLink
                to="/"
                className={({isActive}) => (isActive ? "underline text-xl": "text-xl")}
            >
                Home
            </NavLink>
            <NavLink
                to="/track"
                className={({isActive}) => (isActive ? "underline text-xl": "text-xl")}
            >
                Track Food
            </NavLink>
        </div>
    </div>
  )
}

export default Navbar