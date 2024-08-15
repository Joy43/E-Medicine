import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const cardData = [
  {
    id: 1,
    title: 'Hand Sanitizer',
    description: 'Stay clean and protected with our high-quality hand sanitizer.',
    imgSrc: 'https://i.postimg.cc/y6jrd03J/images.jpg',
  },
  {
    id: 2,
    title: ' Hidden Gems of Bali',
    description: 'Perfect for a rejuvenating getaway.',
    imgSrc: 'https://i.postimg.cc/KjGqf8wv/sepnil-instant-hand-sanitizer-200-ml.jpg',
  },
  {
    id: 3,
    title: ' Serenity of the Maldives',
    description: 'The Maldives is renowned for its crystal-clear waters.',
    imgSrc: 'https://i.postimg.cc/6qMHmNxV/Hand-Sanitizer-Yellow-Bottle-scaled.jpg',
  },
  {
    id: 4,
    title: 'Best product',
    description: 'The Maldives is renowned for its crystal-clear waters.',
    imgSrc: 'https://i.postimg.cc/fR4gJhjy/pexels-n-voitkevich-586340.jpg',
  },
];

const FeaturedCard: React.FC = () => {
  const router=useRouter()
  return (
    <div className='p-4'>
        <h1 className='font-serif text-2xl text-[#0370F7] mb-4 text-center sm:text-left'>Our Feature Products</h1>
        <hr className='bg-[#0370F7] m-3 w-56 mx-auto sm:mx-0' />
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8 p-6 bg-[#002540]">
    
    {cardData.map((card) => (
      <div
        key={card.id}
        className="flex flex-col h-96 w-[600px] md:h-80 md:flex-row rounded-xl shadow-lg bg-[#000000] transform transition duration-500 hover:scale-105"
      >
        <div className="w-1/3 md:w-1/2 relative">
          <Image
            src={card.imgSrc}
            alt={card.title}
            width={300}
            height={300}
            className="rounded-t-xl md:rounded-l-xl md:rounded-t-none object-cover h-full opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-xl md:rounded-l-xl md:rounded-t-none"></div>
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#0370F7] text-xl md:text-2xl mb-4">{card.title}</h3>
            <p className="text-[#fff] text-base md:text-lg mb-6">{card.description}</p>
          </div>
          <Button
          onClick={() => router.push('/product')}
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: '#0370F7',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#F60301',
              },
            }}
          >
            Shop Now
          </Button>
        </div>
      </div>
    ))}
  </div>
    </div>
  );
};

export default FeaturedCard;
