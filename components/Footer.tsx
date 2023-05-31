import { IconBrandTwitter, IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import { FC } from "react";
import Image from "next/image";
import { Subscribe } from "./input-form";

export const Footer: FC = () => {
  return (
    <>
      <Subscribe />
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full max-w-7xl grow items-center gap-y-8 py-4 px-4 md:py-12 md:px-6 border-t border-gray-300 py-4 px-8 items-center sm:justify-between text-gray-500 ">
        <div className="flex flex-col sm:w-full">
          <Image
            alt="Mighty deals AI"
            src="https://www.mightydeals.com/web/css/2015/new_images/blogoX2.png"
            width={150}
            height={75}
            decoding="async"
            data-nimg="1"
            loading="lazy"
            style={{ color: "transparent" }}
          />
          <h6 className="">Daily Deals for Web Professionals</h6>
          <p className="italic text-sm text-gray-700">
            MightyDeals is a daily deal website that offers massive discounts for web and creative professionals. Generally, our customers can save
            from 50% to 90% off on fonts, ebooks, icons, templates and much more. Deals are available for a limited time only.{" "}
            <a href="">Read more</a>
          </p>
        </div>
        <div></div>
        <div></div>
        <div className="flex-1 flex flex-col">
          <div className="">
            <p className="">
              Follow us We update frequently, <br /> follow us via social media to receive our latest updates.
            </p>
          </div>
          <div className="flex flex-row">
            <a
              className="flex justify-center items-center rounded-full bg-gray-200 w-10 h-10 space-x-4 mr-2 hover:opacity-50"
              href="https://www.twitter.com/mightydeals"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandTwitter size={15} />
            </a>
            <a
              className="flex justify-center items-center rounded-full bg-gray-200 w-10 h-10 space-x-4 mr-2  hover:opacity-50"
              href="https://www.twitter.com/mightydeals"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandFacebook size={15} />
            </a>
            <a
              className="flex justify-center items-center rounded-full bg-gray-200 w-10 h-10 space-x-4 mr-2  hover:opacity-50"
              href="https://www.twitter.com/mightydeals"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandInstagram size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className="text-center italic text-xs text-gray-500 shadow mt-4 py-4 border-t border-gray-300">
          © 2010-2023 - All rights reserved. MightyDeals® is a registered trademark in the United States, Canada and Australia.
        </p>
      </div>
    </>
  );
};
