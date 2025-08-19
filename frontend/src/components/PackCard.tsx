// src/components/PackCard.tsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

type Pack = {
  id: number;
  name: string;
  price: number;
  description: string;
  videoThumbnail: string;
  details: { label: string; value: string }[];
};

type Props = {
  pack: Pack;
  onBuy: (pack: Pack) => void;
};

export default function PackCard({ pack, onBuy }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      $hovered={hovered}
      tabIndex={0}
      aria-label={`Pack ${pack.name}, ${pack.price} euros`}
    >
      <ThumbnailWrapper>
        <Thumbnail src={pack.videoThumbnail} alt={`Vidéo du pack ${pack.name}`} />
        <Overlay $hovered={hovered}>
          {pack.details.map(({ label, value }) => (
            <DetailRow key={label}>
              <strong>{label}:</strong> {value}
            </DetailRow>
          ))}
        </Overlay>
      </ThumbnailWrapper>

      <CardContent>
        <PackName>{pack.name}</PackName>
        <Description>{pack.description}</Description>
        <BuyRow>
          <Price>{pack.price}€</Price>
          <BuyButton onClick={() => onBuy(pack)}>Acheter</BuyButton>
        </BuyRow>
      </CardContent>
    </Card>
  );
}

const fadeIn = css`
  opacity: 1;
  pointer-events: auto;
`;

const Card = styled.li<{ $hovered: boolean }>`
  width: 280px;
  height: 320px;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  outline: none;
  transition: transform 0.3s ease;

  &:hover,
  &:focus {
    transform: translateY(-8px);
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  padding-top: 56.25%;
  position: relative;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  
  ${Card}:hover &,
  ${Card}:focus & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div<{ $hovered: boolean }>`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(40,40,40,0.8);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  ${({ $hovered }) => $hovered && fadeIn}
`;

const DetailRow = styled.div`
  margin-bottom: 6px;
`;

const CardContent = styled.div`
  padding: 16px 20px 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PackName = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: 20px;
  color: #2c3e50;
`;

const Description = styled.p`
  margin: 8px 0 16px;
  color: #7f8c8d;
  font-size: 14px;
  flex-grow: 1;
`;

const BuyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: #27ae60;
`;

const BuyButton = styled.button`
  background-color: #82b1ff;
  border: none;
  border-radius: 28px;
  padding: 10px 24px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(130,177,255,0.5);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4f8fff;
  }
  &:focus {
    outline: 3px solid #4f8fff;
  }
`;
