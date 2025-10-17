import React, { FC } from "react";

import {
  BannerContainer,
  BookIcon,
  ContentContainer,
  MainTitle,
  SubTitle,
} from "./Banner.styles";

/**
 * @component
 * @description Banner component that displays the main hero section with animated floating book icons and welcome text
 * @returns JSX element representing the banner section with gradient text effects and floating animations
 */
export const Banner: FC = () => {
  return (
    <BannerContainer>
      {/* Floating Book Icons */}
      <BookIcon delay={0} size={32} top="15%" left="8%">
        📚
      </BookIcon>
      <BookIcon delay={1} size={28} top="25%" left="85%">
        📖
      </BookIcon>
      <BookIcon delay={0.5} size={24} top="60%" left="12%">
        📝
      </BookIcon>
      <BookIcon delay={1.5} size={30} top="70%" left="88%">
        📕
      </BookIcon>
      <BookIcon delay={0.8} size={26} top="40%" left="5%">
        📘
      </BookIcon>
      <BookIcon delay={2} size={22} top="80%" left="90%">
        📙
      </BookIcon>
      <BookIcon delay={1.2} size={28} top="10%" left="45%">
        📗
      </BookIcon>
      <BookIcon delay={0.3} size={24} top="85%" left="15%">
        📔
      </BookIcon>
      <BookIcon delay={1.8} size={26} top="30%" left="92%">
        📓
      </BookIcon>
      <BookIcon delay={0.6} size={30} top="50%" left="3%">
        📒
      </BookIcon>

      <ContentContainer maxWidth="md">
        <MainTitle variant="h1">Join the Reading Club!</MainTitle>
        <SubTitle variant="h2">Read Together, Grow Together.</SubTitle>
      </ContentContainer>
    </BannerContainer>
  );
};
