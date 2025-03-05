"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const DiscoverSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={containerVariants}
      className="py-12 bg-white mb-16"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div variants={itemVariants} className="my-12 text-center">
          <h2 className="text-3xl font-semibold leading-tight text-gray-800">
            کاوش
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            بهترین جا برای اجاره رو پیدا کن!
          </p>
          <p className="mt-2 text-gray-500 max-w-3xl mx-auto">
          خونه راه رو آسان پیدا کن!
          دیگه نیازی نیست کلی سایت بگردی یا استرس داشته باشی. با ابزار جستجوی هوشمند و کاربرپسند ما، خونه‌ای که می‌خوای رو تو چشم به هم زدن پیدا کن. همین حالا شروع کن و خونه‌ی رویاییت رو پیدا کن!          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center">
          {[
            {
              imageSrc: "/landing-icon-wand.png",
              title: "جستجو برای املاک",
              description:
              "بین مجموعه‌ی گسترده‌ی املاک اجاره‌ای در منطقه‌ی مورد نظرت بچرخ و بهترین‌ها رو پیدا کن"
            },
            {
              imageSrc: "/landing-icon-calendar.png",
              title: "رزرو خونه‌ی مورد علاقه‌ات",
              description:
              "وقتی خونه‌ی مناسب رو پیدا کردی، فقط با چند کلیک ساده آنلاین رزروش کن"
            },
            {
              imageSrc: "/landing-icon-heart.png",
              title: "از خونه‌ی جدیدت لذت ببر",
              description:
                "به خونه‌ی اجاره‌ای جدیدت نقل مکان کن و از زندگی در خونه‌ی رویاییت لذت ببر",
            },
          ].map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <DiscoverCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DiscoverCard = ({
  imageSrc,
  title,
  description,
}: {
  imageSrc: string;
  title: string;
  description: string;
}) => (
  <div className="px-4 py-12 shadow-lg rounded-lg bg-primary-10 md:h-72">
    <div className="bg-primary-30 p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto">
      <Image
        src={imageSrc}
        width={30}
        height={30}
        className="w-full h-full"
        alt={title}
      />
    </div>
    <h3 className="mt-4 text-xl font-medium text-primary-900">{title}</h3>
    <p className="mt-2 text-base text-primary-800">{description}</p>
  </div>
);

export default DiscoverSection;