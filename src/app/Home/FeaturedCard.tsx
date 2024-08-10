import { Button } from '@mui/material';
import Image from 'next/image';

const cardData = [
  {
    id: 1,
    title: 'Hand Sanitizer',
    description:
      'Stay clean and protected with our high-quality hand sanitizer. Perfect for on-the-go use.',
    imgSrc:
      'https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 2,
    title: 'Discover the Hidden Gems of Bali',
    description:
      'Bali offers a rich cultural experience with stunning beaches, lush forests, and a vibrant arts scene. Perfect for a rejuvenating getaway.',
    imgSrc:
      'https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 3,
    title: 'Experience the Serenity of the Maldives',
    description:
      'The Maldives is renowned for its crystal-clear waters, luxury resorts, and unparalleled underwater beauty. Ideal for a romantic escape.',
    imgSrc:
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
];

const FeaturedCard: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-8 p-6 bg-[#002540]">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="relative flex flex-col md:flex-row rounded-xl shadow-lg p-5 bg-[#000000] transform transition duration-500 hover:scale-105"
        >
          <div className="w-full md:w-1/3 flex-shrink-0">
            <Image
              src={card.imgSrc}
              alt={card.title}
              width={500}
              height={500}
              className="rounded-xl object-cover"
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col space-y-4 p-4">
            <h3 className="font-bold text-[#0370F7] md:text-2xl text-xl">{card.title}</h3>
            <p className="text-[#fff] md:text-lg text-base">{card.description}</p>
            <Button
              variant="contained"
              sx={{
                px: 4,
                py: 1.5,
                alignSelf: 'start',
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
  );
};

export default FeaturedCard;
