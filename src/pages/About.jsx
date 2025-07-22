import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import ReviewSlider from "../components/common/ReviewSlider"

const About = () => {
  return (
    <div className=''>
      {/* section 1 */}
      <section className='bg-richblack-700'>
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white'>
            <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'>
            Fostering Innovation in Online Learning at KIIT
                <HighlightText text={"Shaping the Future of Education"}/>
                <p className='mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]'>CampusHive is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </header>
            <div className="sm:h-[70px] lg:h-[150px]"></div>
            <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5'>
                <img src={BannerImage1} />
                <img src={BannerImage2} />
                <img src={BannerImage3} />
            </div>
        </div>
      </section>

      {/* section 2 */}

      <section className='border-b border-richblack-700'>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>   
        <div className="h-[100px] "></div>
            <Quote/>
        </div>
      </section>


      {/* section 3 */}

      <section>
  <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
    {/* founding story div */}
    <div className='flex flex-col items-center gap-10 lg:flex-row justify-between '>
      {/* founding story left box */}
      <div className='my-24 flex lg:w-[50%] flex-col gap-10'>
        <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>
          Our Journey at KIIT
        </h1>

        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
          The vision for our e-learning platform took root within the vibrant and innovation-driven ecosystem of <strong>KIIT University</strong>. Inspired by the institute’s culture of academic excellence and technological advancement, our journey began with a group of passionate students, mentors, and educators determined to redefine the learning experience.
        </p>

        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
          At KIIT, we saw both the opportunities and limitations of traditional education. We understood that the future of learning needed to be more <em>accessible</em>, <em>flexible</em>, and <em>inclusive</em> — not confined to classrooms or campus boundaries. Motivated by this belief, we set out to build a platform that reflects KIIT's spirit: one that empowers learners everywhere to grow, upskill, and thrive in an increasingly digital world.
        </p>
      </div>

      {/* founding story right box */}
      <div>
        <img className='shadow-[0_0_20px_0] shadow-[#FC6767]' src={FoundingStory} />
      </div>
    </div>

    {/* vision and mission parent div */}
    <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
      {/* left box - vision */}
      <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
        <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>
          Our Vision
        </h1>
        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
          Rooted in KIIT's progressive values, our vision was to create an e-learning platform that reimagines the way knowledge is shared. We set out to develop a space that combines intuitive design with cutting-edge tech — enabling students to engage, explore, and evolve from anywhere in the world.
        </p>
      </div>

      {/* right box - mission */}
      <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
        <h1 className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] '>
          Our Mission
        </h1>
        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
          More than just delivering digital courses, our mission at KIIT is to build a connected, collaborative community of learners. Through live sessions, forums, and peer-driven interaction, we aim to spark curiosity and lifelong learning — where students don’t just study, but grow together.
        </p>
      </div>
    </div>
  </div>
</section>
 

      {/* section 4 */}
      <StatsComponent/>  
      
      {/* section 5 */}
      <section className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white'>
        <LearningGrid />
        <ContactFormSection />
      </section>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />

    </div>
  )
}

export default About
