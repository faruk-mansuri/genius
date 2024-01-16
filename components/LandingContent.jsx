import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const testimonials = [
  {
    name: 'Mirza',
    avatar: 'M',
    title: 'Software Engineer',
    description: "This is th best application I've used!",
  },
  {
    name: 'John',
    avatar: 'J',
    title: 'Web Developer',
    description: 'Great functionality and user-friendly interface!',
  },
  {
    name: 'Emily',
    avatar: 'E',
    title: 'Data Scientist',
    description: 'Awesome features and seamless experience!',
  },
  {
    name: 'Adam',
    avatar: 'A',
    title: 'UI/UX Designer',
    description: 'Incredible design and smooth navigation!',
  },
];
export const LandingContent = () => {
  return (
    <div className='text-px pb-20'>
      <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
        Testimonials
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4'>
        {testimonials.map((item, index) => {
          return (
            <Card
              key={index}
              className='bg-[#192339] border-none text-white tracking-wider'
            >
              <CardHeader>
                <CardTitle className='flex items-center gap-x-2'>
                  <div>
                    <p className='text-lg'>{item.name}</p>
                    <p className='text-sm text-zinc-400'>{item.title}</p>
                  </div>
                </CardTitle>
                <CardContent className='pt-4 px-0 tracking-normal'>
                  {item.description}
                </CardContent>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
