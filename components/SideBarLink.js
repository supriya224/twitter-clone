import React from 'react'

function SideBarLink({Icon, text, active}) {
  return (

    <div className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${active&&"font-bold52"}` }>
        <Icon className='text-white h-7 w-[25px]'/>
        <span className='hidden xl:inline'>{text}</span>
        </div>
  )
}

export default SideBarLink