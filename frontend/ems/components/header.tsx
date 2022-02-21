import Link from "next/link"

const Header: React.FC = () => {
  return (
    <header className='h-[10vh] mx-6'>
        <nav className='h-full'>
            <ul className='h-full flex flex-row items-center text-slate-700'>
                <li className='flex-grow text-xl'>
                <Link href='/'>
                    <a className='hover:text-slate-900 focus:outline-none'>Event Management System</a>
                </Link>
                </li>
                <li className='text-lg'>
                    <Link href='/login'>
                        <a className='inline-block px-3 py-1 bg-slate-200 rounded-md hover:bg-slate-300 hover:text-slate-900 focus:outline-none' >Login</a>
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;