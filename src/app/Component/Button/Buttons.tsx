import { FC } from 'react';

interface ButtonsProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: FC<{ size: number; className?: string }>;
}

const Buttons: FC<ButtonsProps> = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        flex
        items-center
        justify-center
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        transition
        duration-300
        ease-in-out
        px-4
        ${outline ? 'bg-white' : 'bg-[#0370F7]'}
        ${outline ? 'border-[#002540]' : 'border-[#0370F7]'}
        ${outline ? 'text-[#002540]' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-2 px-4' : 'py-3 px-6'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        hover:${outline ? 'bg-[#F60301]' : 'bg-[#0052CC]'}
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-[#0370F7]
      `}
    >
      {Icon && (
        <Icon
          size={small ? 16 : 24}
          className='absolute left-4'
        />
      )}
      <span className={Icon ? 'pl-10' : ''}>{label}</span>
    </button>
  );
};

export default Buttons;
