import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const DashBoardLayout = ({ children }) => {
  return (
    <div className='h-full relative'>
      {/* md:inset-y-0 */}
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:inset-y-0 md:fixed z-[80] bg-gray-900'>
        <Sidebar />
      </div>

      <main className='md:pl-72'>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
