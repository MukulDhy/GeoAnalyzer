import React from "react";
// import Card from "../../Component/Card/Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserAction } from "../../Redux/actions/allAction";


const TeamMember = ({ name, title, imageSrc, url }) => (
  <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
    <div className="flex flex-col ">
      <Link to={"/upload" + url} className="mx-auto">
        <img
          className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 h-48 w-48 object-cover "
          src={imageSrc}
          alt={name}
        />
      </Link>
      <div className="text-center p-3 bg-white hover:bg-gray-300 rounded-lg  transition-all">
        <h1 className="text-gray-900 text-xl font-bold mb-1 ">{name}</h1>
        <div className="text-gray-700 font-light mb-2">{title}</div>
      </div>
    </div>
  </div>
);

const TeamSection = () => (
  <div className="flex flex-wrap">
    {/* Repeat this block for each team member */}
    <TeamMember
      name="Fractures Detection"
      // title="Founder & Specialist"
      imageSrc="https://onlinelibrary.wiley.com/cms/asset/b48880e4-456b-42ff-a96a-fb03d5f16cfa/mice12564-fig-0007-m.png"
      url={"/crack"}
    />
    <TeamMember
      name="Lithology Identification"
      // title="Tired & M. Specialist"
      imageSrc="https://images.squarespace-cdn.com/content/v1/623213cf300e416b63198e45/72f49cd4-71cd-44b2-ae4c-055659521fdd/GAI-IMG-220919-Auto-Lithology-Blog.jpg"
      url={"/lithology"}
    />
    {/* <TeamMember
      name="Rock Identification"
      // title="Tired & M. Specialist"
      imageSrc="https://images.squarespace-cdn.com/content/v1/623213cf300e416b63198e45/72f49cd4-71cd-44b2-ae4c-055659521fdd/GAI-IMG-220919-Auto-Lithology-Blog.jpg"
      url={"/rockIdentification"}
    /> */}
    <TeamMember
      name="Crack Detection"
      // title="Team Member"
      imageSrc="https://static.hindawi.com/articles/geofluids/volume-2021/6669016/figures/6669016.fig.001.jpg"
      url={"/discontinuity"}
    />
    <TeamMember
      name="Rock Identification"
      // title="Team Member"
      imageSrc="https://c8.alamy.com/comp/2ETA7H7/a-3d-rendering-illustration-of-the-question-mark-formed-with-cracked-rocks-isolated-on-a-white-background-2ETA7H7.jpg"
      url={"/rock"}
    />
    <TeamMember
      name="Mineral Identification"
      // title="Will be fired"
      imageSrc="https://geoetc.com/wp-content/uploads/2019/12/Hematite_streak_plate.jpg"
      url={"/mineral"}
    />
    <TeamMember
      name="Live Detection"
      // title="Will be fired"
      imageSrc="https://i.ibb.co/KFwKwRC/IMG-20231219-WA0007.jpg"
      url={"/live"}
    />
  </div>
);

const HomeScreen = () => {

  const dispatch = useDispatch();
  
  const fetch = () => {
    dispatch(checkUserAction());
    return;
  };

  setTimeout(fetch, 3000);


  return (
    <>
      <TeamSection />
    </>
  );
};

export default HomeScreen;
