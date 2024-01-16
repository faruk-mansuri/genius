import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './MobileSidebar';

const Navbar = ({ apiLimitCount, isPro }) => {
  return (
    <div className='flex justify-between items-center p-4'>
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />

      <div>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
