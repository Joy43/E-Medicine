


import Marquee from 'react-fast-marquee';
import strethoscope from "../assets/Category/strethoscope.jpg";
import medikit from "../assets/Category/medikit.jpeg";
import pharmach from "../assets/Category/pharmach.jpeg";
import mask from "../assets/Category/sergeryumask.jpeg";
import Image from 'next/image';

interface Testimonial {
    name: string;
    image: any;
    item: number;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="min-w-full flex-shrink-0 p-6">
        <div className="bg-[#002540] rounded-lg shadow-lg overflow-hidden">
            <Image
                className="w-80 h-64 object-cover"
                src={testimonial.image}
                alt={`${testimonial.name}'s testimonial`}
            />
            <div className="p-6 flex items-center">
                <Image
                    className="w-20 h-20 rounded-full border-4 border-[#0370F7] shadow-md object-cover"
                    src={testimonial.image}
                    alt={`${testimonial.name}'s avatar`}
                />
                <div className="ml-4">
                    <p className="text-white font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-gray-300 text-sm">Item: {testimonial.item}</p>
                </div>
            </div>
        </div>
    </div>
);

const Category: React.FC = () => {
    const array: Testimonial[] = [
        { name: 'strethoscope', image: strethoscope, item: 3 },
        { name: 'medikits', image: medikit, item: 4 },
        { name: 'pharmacy', image: pharmach, item: 5 },
        { name: 'sugical mask', image: mask, item: 6 }
    ];

    return (
        <div className="relative max-w-full min-w-[350px] mx-auto h-[500px] overflow-hidden">
            <Marquee pauseOnHover={true} speed={50}>
                {array.map((testimonial, idx) => (
                    <TestimonialCard key={idx} testimonial={testimonial} />
                ))}
            </Marquee>
        </div>
    );
};

export default Category;
