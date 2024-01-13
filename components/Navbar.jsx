import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './MobileSidebar';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4'>
      <MobileSidebar />

      <div>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
