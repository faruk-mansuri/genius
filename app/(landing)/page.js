import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <p>Landing Page (UnProtected)</p>
      <div>
        <Link href='sign-up'>
          <Button>Register</Button>
        </Link>
        <Link href='sign-in'>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
