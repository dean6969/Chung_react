import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
      <div>
        <Link className="w-full text-3xl font-bold text-[#00df9a]">
          Carbon.
        </Link>
        <p className="py-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit
          ullam iste repellat consequatur libero reiciendis, blanditiis
          accusantium.
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <Link>
            <FaFacebookSquare size={30} />
          </Link>
          <Link>
            <FaInstagram size={30} />
          </Link>
          <Link>
            <FaTwitterSquare size={30} />
          </Link>
          <Link>
            <FaGithubSquare size={30} />
          </Link>
          <Link>
            <FaDribbbleSquare size={30} />
          </Link>
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className="font-medium text-gray-400">Solutions</h6>
          <div className="flex flex-col">
            <Link className="py-2 text-sm">Analytics</Link>
            <Link className="py-2 text-sm">Marketing</Link>
            <Link className="py-2 text-sm">Commerce</Link>
            <Link className="py-2 text-sm">Insights</Link>
          </div>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Support</h6>
          <div className="flex flex-col">
            <Link className="py-2 text-sm">Pricing</Link>
            <Link className="py-2 text-sm">Documentation</Link>
            <Link className="py-2 text-sm">Guides</Link>
            <Link className="py-2 text-sm">API Status</Link>
          </div>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Company</h6>
          <div className="flex flex-col">
            <Link className="py-2 text-sm">About</Link>
            <Link className="py-2 text-sm">Blog</Link>
            <Link className="py-2 text-sm">Jobs</Link>
            <Link className="py-2 text-sm">Press</Link>
            <Link className="py-2 text-sm">Careers</Link>
          </div>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Legal</h6>
          <div className="flex flex-col">
            <Link className="py-2 text-sm">Claim</Link>
            <Link className="py-2 text-sm">Policy</Link>
            <Link className="py-2 text-sm">Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
