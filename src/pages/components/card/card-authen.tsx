import React, { useState } from "react";
interface ICardAuthenProps {
  label?: string;
  defaultImage?: string;
}

const CardAuthen: React.FC<ICardAuthenProps> = (props) => {
  const { label, defaultImage = "" } = props;

  const [image] = useState<string>(defaultImage);

  return (
    <div className="border border-gray-300 rounded-[8px] p-[12px]">
      {label && <p className="font-semibold text-[16px]">{label}</p>}
      <div>
        <img src={image} className="w-full h-[210px]" alt="img-id-card" />
      </div>
    </div>
  );
};

export default CardAuthen;
