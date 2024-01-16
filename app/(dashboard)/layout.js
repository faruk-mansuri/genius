import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const DashBoardLayout = async ({ children }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className='h-full relative'>
      {/* md:inset-y-0 */}
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:inset-y-0 md:fixed  bg-gray-900'>
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>

      <main className='md:pl-72'>
        <Navbar apiLimitCount={apiLimitCount} isPro={isPro} />
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
