import React from 'react'
import Marquee from "react-fast-marquee";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import JellyText from './JellyText';

const word = "Fresh fast delivered "
const repeatCount = 10;
const repeatWord = Array(repeatCount).fill(word);

export const Footer = () => {
  return (
    <div className='bg-black w-full relative overflow-hidden flex flex-col'>
        
        <style>
          {`
          :root {
                --ongots-url: url('https://media0.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3N2x3NXh1d2xhMmc0ZTNmMDlra3U4aWZ5dGkxNGdmd20zZ2JhdGs2ZCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/p3ZPIe8QV4YlPc255b/200.webp');
              }
              .dark {
                --ongots-url: url('https://media2.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3azl6NzV2d2wzbmdtNTl4OHJibXU0NTNoeGYwZHpnbHRoYnN3aWdmbCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/dpgP3EIluED4FOXScQ/giphy.webp');
              }

              @keyframes moving {
                0% { left: -25%; }
                100% { left: 100%; }
              }
              .animate-ongots { 
                animation: moving 13s linear infinite; 
                background-image: var(--ongots-url); 
              }


            @keyframes myfirst {
              0% { left: -25%; }
              100% { left: 100%; }
            }
            .animate-ongots { animation: myfirst 13s linear infinite; }
            .animate-car { animation: myfirst 20s linear infinite; }
            .animate-bike { animation: myfirst 30s linear infinite; }
            .animate-moto { animation: myfirst 25s linear infinite; }
          `},
           {`

            @keyframes moving {

              0% { left: -25%; }

              100% { left: 100%; }

            }

            .animate-delivery-fast { animation: moving 15s linear infinite; }

            .animate-delivery-slow { animation: moving 25s linear infinite; }

            .animate-delivery-normal { animation: moving 20s linear infinite; }

        @keyframes aitf {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
          }
          .animated-text-fill {
            background: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf7duDGQmwlFim7f14_0utCkdtodcRscYU2A&s) repeat-y;
            -webkit-background-clip: text;    
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: aitf 10s linear infinite;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
          }
               .animated-text-fill-dark {
            background: url(https://thumbcdn.123freevectors.com/wp-content/resized/210977-abstract-grey-and-yellow-gradient-diagonal-lines-and-stripes-background.jpg) repeat-x;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: aitf 10s linear infinite;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
          }
             .animated-text-fill-1 {
            background: url(data:image/jpeg;base64,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) repeat-x;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: aitf 10s linear infinite;
            -webkit-transform: translate3d(0,0,0);
            backface-visibility: hidden;
          }
          

            @keyframes ongots {
        0% { left: -30%; transform: translateY(0px); }
        50% { transform: translateY(-20px); } 
        100% { left: 110%; transform: translateY(0px); }
      }


            .social-icon-box:hover i {

              transform: rotate(360deg);

              transition: all 0.6s ease;

              color: white !important;

            }

          `}
        </style>
         
        <div className='bg-red-500 w-full py-6 z-20'>
          <Marquee speed={100} gradient={false}>
            {repeatWord.map((item, index) => (
              <h2 key={index} className='text-white font-bold text-6xl md:text-8xl mx-10'> 
                {item} 
              </h2>
            ))}
          </Marquee>
        </div>

        <div className='relative w-full h-188.75 bg-white dark:bg-black'>
          <div className='relative z-10 flex p-10 items-center justify-center md:justify-start'>
            <img src="FoodIcon.png" className='w-12 h-10 mr-3' alt="Food Icon" />
            <div className='flex flex-col'>
                <div className='flex leading-tight text-4xl font-black italic tracking-tighter'>
                  <p className="animated-text-fill ">Yam</p>
                  <p className="animated-text-fill-1 ml-1">Yam</p>
                </div>
              <JellyText text="Food Delivery" flavorIndex={3} className='text-gray-500 text-sm font-bold tracking-widest uppercase'/>
            </div>
          </div>

<div className='relative z-10 flex flex-col md:flex-row justify-between items-start p-10 gap-10'>
    <div className='flex flex-col gap-3'>
        <JellyText text="YAMYAM" flavorIndex={0} className="text-red-500 font-bold text-xl mb-2 tracking-tighter" />
        <JellyText text="Home" flavorIndex={3} className="font-medium hover:text-red-500 transition-colors" />
        <JellyText text="Contact us" flavorIndex={3} className="font-medium hover:text-red-500 transition-colors" />
        <JellyText text="Delivery zone" flavorIndex={3} className="font-medium hover:text-red-500 transition-colors" />
    </div>
    <div className='flex flex-col gap-3'>
      <JellyText text="MENU" className="text-red-500 font-bold text-xl mb-2 tracking-tighter" />
      <JellyText text="Home" flavorIndex={3} className="font-medium hover:text-red-500 transition-colors" />
      <JellyText text="Contact us" flavorIndex={3} className="font-medium hover:text-red-500 transition-colors" />
      <JellyText text="Delivery zone" flavorIndex={3} className="font-medium hover:text-red-500 transition-colors" />
  </div>

  <div className='flex flex-col gap-4 items-center md:items-end'>
    <JellyText text="Food Delivery" flavorIndex={3} className="font-bold text-black text-xs uppercase tracking-[0.2em] dark:text-white hover:text-gray-700 transition-colors" />
    
    <div className='flex gap-4'>
      <a href="#" className="social-icon-box w-12 h-12 rounded-full bg-gray-300 dark:bg-white flex items-center justify-center transition-all duration-300 hover:bg-[#3B5998] group">
        <i className="fa fa-facebook text-[#595959] text-xl transition-all duration-500 group-hover:rotate-360 group-hover:text-white">
          <FaFacebook />
        </i>
      </a>
      <a href="#" className="social-icon-box w-12 h-12 rounded-full bg-gray-300 dark:bg-white flex items-center justify-center transition-all duration-300 hover:bg-gray-500 group">
        <i className="fa fa-linkedin text-[#595959] text-xl transition-all duration-500 group-hover:rotate-360 group-hover:text-white"><FaGithub /></i>
      </a>

      <a href="#" className="social-icon-box w-12 h-12 rounded-full bg-gray-300 dark:bg-white flex items-center justify-center transition-all duration-300 hover:bg-[#E1306C] group">
        <i className="fa fa-instagram text-[#595959] text-xl transition-all duration-500 group-hover:rotate-360 group-hover:text-white"><FaInstagram /></i>
      </a>
    </div>
  </div>
</div>

<div className='border-t border-black/50 mr-0 ml-0 dark:border-white'></div>

          <div className="absolute bottom-0 left-0 w-full h-66.5 pointer-events-none">
              <div className="absolute bottom-62.5 w-[288px] h-40 animate-ongots bg-no-repeat bg-contain z-0" />
              
            <div className="absolute inset-0 bg-repeat-x bg-bottom h-full w-full" 
              style={{ 
                backgroundImage: "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigB8iI5tb8WSVBuVUGc9UjjB8O0708X7Fdic_4O1LT4CmLHoiwhanLXiRhe82yw0R7LgACQ2IhZaTY0hhmGi0gYp_Ynb49CVzfmXtYHUVKgXXpWvJ_oYT8cB4vzsnJLe3iCwuzj-w6PeYq_JaHmy_CoGoa6nw0FBo-2xLdOPvsLTh_fmYH2xhkaZ-OGQ/s16000/footer_bg.png')",
                backgroundSize: 'auto 100%'
              }}>
            </div>
            
            <div className="absolute bottom-0 w-82.5 h-26.25 animate-car bg-no-repeat bg-contain"
              style={{ backgroundImage: "url('https://media4.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NXZmMjA2MjVxdXJyc2dtNmUwcjRkajBwOXQ1cTQzMGhteW4xZ2x3ayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/gKx8NdL6pZIcsGmJHL/200.webp')" }}>
            </div>
 
            <div className="absolute bottom-0 w-22 h-25 animate-bike bg-no-repeat bg-contain"
              style={{ backgroundImage: "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyLGwEUVwPK6Vi8xXMymsc-ZXVwLWyXhogZxbcXQYSY55REw_0D4VTQnsVzCrL7nsyjd0P7RVOI5NKJbQ75koZIalD8mqbMquP20fL3DxsWngKkOLOzoOf9sMuxlbyfkIBTsDw5WFUj-YJiI50yzgVjF8cZPHhEjkOP_PRTQXDHEq8AyWpBiJdN9SfQA/s16000/cyclist.gif')" }}>
            </div>
            

            <div className="absolute bottom-0 w-42 h-30 animate-moto bg-no-repeat bg-contain"
              style={{ backgroundImage: "url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTJ5ZDVkeWFlMjFqc2JxNHNqNWhnd3l0cjJxc3diMG10cm81OHl0bCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/LcCmLpLLF84xBvThSv/giphy.webp')" }}>
            </div>
          </div>

        </div>

        <div className='bg-black py-4 text-center text-gray-400 text-xs border-t border-gray-100 relative z-30 '>
          © 2026 YamYam Food Delivery created by mo131-yo.
        </div>    
    </div>
  )
}