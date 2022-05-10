import React, { useState, useReducer, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { TwitterVideoEmbed } from 'react-twitter-embed';
import { SocialIcon } from 'react-social-icons';

const projects = [
  {
    name: 'Helping Hands',
    id: 'hh-card',
    subtitle: 'Food delivery during the pandemic',
    color: "bg-sky-400",
    linkcolor: "#f87838",
    span: "col-span-8",
    show: false,
    details: {
      link_title: "helpinghands.community",
      link: "https://helpinghands.community",
      descriptions: [
        "I co-founded Helping Hands with my brother and two former executives from Facebook and Uber.",
        "Helping Hands is a nonprofit tech platform that streamlines how food banks and social service organizations deliver food. Organizations can schedule deliveries to be fulfilled by volunteers and ride-share drivers en masse.",
        "As of 05/01/2021, we've delivered over 700,000 meals through our platform and partnered with logistics providers like Uber, Lyft, and Axlehire to deliver food at scale.",
        "Helping Hands has been featured in \
          <a target='_blank' class='text-black' href='https://cbsaustin.com/news/local/two-austin-brothers-develop-program-to-connect-the-most-vulnerable-with-volunteers-to-help'>CBS</a>, \
          <a target='_blank' class='text-black' href='https://www.fox7austin.com/news/austin-brothers-help-build-website-to-connect-immunocompromised-with-volunteers'>FOX</a>, \
          <a target='_blank' class='text-black' href='https://www.mercurynews.com/2020/04/17/coronavirus-bay-area-seniors-vulnerable-people-can-get-help-with-shopping-errands/'>The Mercury News</a>, \
          <a target='_blank' class='text-black' href='https://www.forbes.com/sites/chelseadavis/2020/04/15/helping-hands-the-bay-areas-grassroots-response-to-covid-19/?sh=620bbedc1951'>Forbes</a>, \
          <a target='_blank' class='text-black' href='https://www.entrepreneur.com/video/350031'>Entrepreneur</a>, \
          <a target='_blank' class='text-black' href='https://www.nbclosangeles.com/news/sports/dodgers-deliver-over-22000-meals-to-families-in-inglewood/2404188/'>NBC</a>, \
          and more."
      ],
      logo: "./assets/images/helping_hands_photos/hh_logo.png",
      image_display: "grid-cols-2",
      images: [
        "./assets/images/helping_hands_photos/HelpingHands1.png",
        "./assets/images/helping_hands_photos/HelpingHands2.png"
      ]
    }
  },
  {
    name: 'Boba Tea Vending Machine',
    id: 'boba-card',
    subtitle: 'A machine that makes bubble tea',
    descriptions: [
    ],
    color: "bg-blue-500",
    span: "col-span-4",
    show: false,
    details: {
      link_title: "Github",
      link: "https://github.com/cs107e/ypat125-skhanna03-project",
      descriptions: [
        "I built a machine that dispenses bubble tea."
      ],
      logo: "",
      image_display: "grid-cols-2",
      images: [],
      boba: true
    }
  },
  {
    name: 'ERCOT Grid Modeling',
    id: 'ercot-card',
    subtitle: "Digital model of Texas's electric grid",
    descriptions: [
    ],
    color: "bg-red-500",
    span: "col-span-5",
    show: false,
    details: {
      link_title: "",
      link: "",
      descriptions: [
        "In 2019 I started as a researcher at the Webber Energy Group—a research group in the Mechanical Engineering Department at UT Austin that focuses on critical energy and environmental issues.",
        "My work primarly consists of creating open source digital models of Texas’ power grid using Python for Power Systems Analysis and SWITCH: Power Systems Planning model."
      ],
      logo: "./assets/images/webberenergy_photos/webberenergy_logo.png",
      image_display: "grid-cols-2",
      images: [],
      gif: "https://media.giphy.com/media/QAys7CJQL6qbef6Qbx/giphy.gif"
    }
  },
  {
    name: 'Science Olympiad',
    id: 'scio-card',
    subtitle: 'Fun engineering challenges',
    descriptions: [
    ],
    color: "bg-rose-500",
    span: "col-span-7",
    show: false,
    details: {
      link_title: "lasascioly.com",
      link: "https://www.lasascioly.com/",
      descriptions: [
        "I've been competing in Science Olympiad, with a primary focus in engineering, for the past 7 years. My sophmore year (10th) I was elected as the captain of the LASA Science Olympiad team.",
      ],
      logo: "./assets/images/science_olympiad_photos/square_scio.png",
      image_display: "grid-cols-2",
      images: [],
      gif: "",
      scio: true
    }
  },
  {
    name: 'Swiftgift',
    id: 'swiftgift-card',
    subtitle: 'Tracking donations of securities for colleges and non-profits',
    color: "bg-indigo-500",
    linkcolor: "#f87838",
    span: "col-span-12",
    show: false,
    details: {
      link_title: "swiftgift.io",
      link: "https://swiftgift.io",
      descriptions: [
        "Swiftgift helps non-profits and colleges track incoming donations of stock.",
        "We're working with Stanford as a design partner to implemnent our system.",
      ],
      image_display: "grid-cols-12",
      images: []
    }
  },
  {
    name: 'Stanny Eats',
    id: 'eats-card',
    subtitle: 'Dining hall voting',
    descriptions: [
    ],
    color: "bg-teal-500",
    span: "col-span-4",
    show: false,
    details: {
      link_title: "stannyeats.live",
      link: "https://stannyeats.live",
      descriptions: [
        "A simple progressive webapp where students can vote on dining halls that have the best food for the current meal."
      ],
      logo: "./assets/images/stanny_eats_photos/stannyeats_logo.png",
      image_display: "grid-cols-2",
      images: [
        "./assets/images/stanny_eats_photos/stannyeats1.PNG",
        "./assets/images/stanny_eats_photos/stannyeats2.PNG"
      ]
    }
  },
  {
    name: 'Stanford Social',
    id: 'stanfordsocial-card',
    subtitle: 'Interest based friend matching',
    descriptions: [
    ],
    color: "bg-emerald-500",
    span: "col-span-4",
    show: false,
    details: {
      link_title: "stanfordsocial.com",
      link: "https://stanfordsocial.com",
      descriptions: [
        "Matches stanford students for weekly chats based on their interests. Gives them $5 to go get coffee together."
      ],
      logo: "",
      image_display: "grid-cols-1",
      images: [
        "./assets/images/stanfordsocial_photos/stanfordsocial.png"
      ]
    }
  },
  {
    name: 'Classcollab',
    id: 'classcollab-card',
    subtitle: 'Share your classes and make group chats',
    descriptions: [
    ],
    color: "bg-yellow-500",
    span: "col-span-4",
    show: false,
    details: {
      link_title: "classcollab.net",
      link: "https://classcollab.net",
      descriptions: [
        "A platform where Stanford students can see whose in their classes and instantly create texting group chats with them."
      ],
      logo: "",
      image_display: "grid-cols-1",
      images: [
        "./assets/images/classcollab_photos/classcollab.png"
      ]
    }
  },
  {
    name: 'New Reads',
    id: 'newreads-card',
    subtitle: "Share what you're reading. Discover what to read next.",
    descriptions: [
    ],
    color: "bg-orange-500",
    span: "col-span-4",
    show: false,
    details: {
      link_title: "NewReads.xyz",
      link: "https://newreads.xyz",
      descriptions: [
        "Share what you're reading. Discover what to read next.",
        "NewReads lets you save your favorite web articles, youtube videos, podcasts, etc. in a publicly shareable reading list along with your thoughts about each one. You can also view other users' reading lists and discover what to read next!"
      ],
      logo: "./assets/images/newreads_photos/newreads_logo.png",
      image_display: "grid-cols-3",
      images: [
        "./assets/images/newreads_photos/shot1.png",
        "./assets/images/newreads_photos/shot2.png",
        "./assets/images/newreads_photos/shot3.png"
      ]
    }
  },
  {
    name: 'Rinc.ai',
    id: 'rinc-card',
    subtitle: 'Plug-and-play Content Moderation',
    descriptions: [
    ],
    color: "bg-indigo-500",
    span: "col-span-4",
    show: false,
    details: {
      link_title: "Rinc.ai",
      link: "https://rinc.ai",
      descriptions: [
        "We are building a human-in-the-loop solution for moderating user-generated content. We train ML models on content from customer applications to create filters that enforce platform-specific guidelines. We also provide a plug-and-play user reporting flow for applications that connects with our moderator dashboard."
      ],
      logo: "",
      image_display: "grid-cols-2",
      images: []
    }
  },
  {
    name: 'Nomo',
    id: 'nomo-card',
    subtitle: 'Events app for stanford',
    descriptions: [
    ],
    color: "bg-pink-500",
    span: "col-span-4",
    show: false,
    details: {
      link_title: "getnomo.info",
      link: "https://getnomo.info",
      descriptions: [
        "An app that lets Stanford students see events happening on campus, recommends events based on user preferences, and allows users to rsvp and add events to their calendar in one click."
      ],
      logo: "./assets/images/nomo_photos/appstore.png",
      image_display: "grid-cols-3",
      images: [
        "./assets/images/nomo_photos/nomo_discover.png",
        "./assets/images/nomo_photos/nomo_rsvp.png",
        "./assets/images/nomo_photos/nomo_agenda.png"
      ],
      gif: "",
    }
  },
  {
    name: 'Echo',
    id: 'echo-card',
    subtitle: 'Make shortform podcasts',
    descriptions: [
    ],
    color: "bg-lime-500",
    span: "col-span-6",
    show: false,
    details: {
      link_title: "getecho.app",
      link: "https://getecho.app",
      descriptions: [
        `Echo is an app that allows any user to start their own short-form podcast series. Users can gain followers, promote their content, and join the conversation by participating in back in forth "audio conversation threads".`
      ],
      logo: "./assets/images/echo_photos/echoWhale_square.png",
      image_display: "grid-cols-4",
      images: [
        "./assets/images/echo_photos/1.png",
        "./assets/images/echo_photos/2.png",
        "./assets/images/echo_photos/3.png",
        "./assets/images/echo_photos/4.png"
      ],
      gif: "",
    }
  },
  {
    name: 'Ecuisina',
    id: 'ecuisina-card',
    subtitle: 'Food trading platform for neighbors',
    descriptions: [
    ],
    color: "bg-indigo-500",
    span: "col-span-6",
    show: false,
    details: {
      link_title: "ecuisina.com",
      link: "https://ecuisina.com",
      descriptions: [
        "Ecuisina is an online food trading platform designed to help neighbors barter home-cooked foods and experience authentic cuisines locally and affordably. You simply create a post about the homemade foods that you make and schedule trades with others in your area."
      ],
      logo: "./assets/images/ecuisina_photos/square_ecuisina.png",
      image_display: "grid-cols-1",
      images: [
        "./assets/images/ecuisina_photos/ecuisinaScreenshot.png",
      ],
      gif: "",
    }
  },
  {
    name: 'GimmeSMS',
    id: 'gimmesms-card',
    subtitle: 'Search the internet through SMS texting',
    descriptions: [
    ],
    color: "bg-emerald-500",
    span: "col-span-8",
    show: false,
    details: {
      link_title: "gimmesms.com",
      link: "https://gimmesms.com",
      descriptions: [
        "A service for users that don't have cellular data plans to simply text a phone number and receive essential information—like turn-by-turn directions, address locations, and weather information—scraped from the web."
      ],
      logo: "./assets/images/gimmesms_photos/square_gimmesms.png",
      image_display: "grid-cols-2",
      images: [
        "./assets/images/gimmesms_photos/GimmeSMS1.png",
        "./assets/images/gimmesms_photos/GimmeSMS2.png",
      ],
      gif: "",
    }
  },
  {
    name: 'Orgo Problem Database',
    id: 'orgo-card',
    subtitle: 'Search Organic Chemistry Challenge Problems',
    descriptions: [
    ],
    color: "bg-blue-500",
    span: "col-span-4",
    show: false,
    details: {
      link_title: "orgodb-d7768.firebaseapp.com",
      link: "https://orgodb-d7768.firebaseapp.com",
      descriptions: [
        "After the database a teacher of mine used to source problems for his Organic Chemistry course was taken down, I reconstructed an in-house version that is searchable."
      ],
      logo: "./assets/images/orgo_photos/orgoDB.png",
      image_display: "grid-cols-1",
      images: [
        "./assets/images/orgo_photos/orgoDBscreenshot.png"
      ],
      gif: "",
    }
  },
]

const YoutubeSlide = ({ url, isSelected }) => (
  <ReactPlayer width="100%" url={url} playing={isSelected} />
);

function App() {
  const [projectsList, setProjects] = useState(projects);
  const [previouslyViewedProjectIndex, setPreviouslyViewedProjectIndex] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const showMore = (index) => {
    let temp = projectsList;

    if (previouslyViewedProjectIndex != null) {
      temp[previouslyViewedProjectIndex].show = false;
      temp[previouslyViewedProjectIndex].span = temp[previouslyViewedProjectIndex].prev_span;
      delete temp[previouslyViewedProjectIndex].prev_span;
    }

    temp[index].prev_span = temp[index].span;
    temp[index].span = "col-span-12";
    temp[index].show = true;
    window.location = `#${temp[index].id}`;

    setPreviouslyViewedProjectIndex(index);
    setProjects(temp);

    forceUpdate();
  }

  //  Video Carousel
  const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;

  const getVideoThumb = (videoId) => `https://img.youtube.com/vi/${videoId}/default.jpg`;

  const getVideoId = (url) => url.substr('https://www.youtube.com/embed/'.length, url.length);

  const customRenderThumb = (children) =>
    children.map((item) => {
      const videoId = getVideoId(item.props.url);
      return <img src={getVideoThumb(videoId)} />;
    });

  return (
    <div className="pt-20 pb-20 bg-slate-900 max-h-screen flex overflow-y-scroll justify-center">
      <div className="max-w-screen-lg p-8">
        <div className='relative'>
          <img src={require("./assets/profile_photo.jpeg")} className="w-20 rounded-full absolute right-5 -top-5 border-2 border-slate-800"></img>
          <h1 className='font-semibold text-4xl text-slate-50'>Yash Patil</h1>
          <p className='text-lg text-slate-50 font-normal pt-12'>Hi there! I'm Yash, a freshman at <span className='text-red-400'>Stanford</span> studying Computer Science.</p>
          <p className='text-lg text-slate-50 font-normal pt-4'>Currently, I'm a fullstack engineer at <a className="text-teal-400" href="https://actively.ai" target="_blank">Actively.ai</a> building software that enables every knowledge worker to be a data scientist. I'm also co-directing <a className="text-teal-400" href="https://www.treehacks.com/" target="_blank">TreeHacks 2023</a>, Stanford's largest annual hackathon.</p>
          <p className='text-lg text-slate-50 font-normal pt-4'>During the pandemic, I co-founded <a target='_blank' className="text-teal-400" href="https://helpinghands.community">Helping Hands</a>, a startup that streamlines how food banks and social service organizations deliver food at scale (over 2,000,000 meals delivered).</p>
          <p className='text-lg text-slate-50 font-normal pt-4 pb-8'>This summer (2022), I'll be interning at <a className="text-teal-400" href="https://officetogether.com">OfficeTogether</a> in NYC. Previously, I've worked as a software engineering intern at <a target='_blank' className="text-teal-400" href="https://bit.io">bit.io</a> and <a className="text-teal-400" href="https://getpei.com">Pei</a> as well as a grid modeling researcher at the <a className="text-teal-400" href="http://www.webberenergygroup.com/people/yash-patil/">Webber Energy Group</a> at UT Austin.</p>
          <SocialIcon network="twitter" url="https://twitter.com/ypatil125" fgColor="#ffffff" className="mr-4" />
          <SocialIcon network="github" url="https://github.com/ypat125" fgColor="#ffffff" className="mr-4" />
          <SocialIcon network="linkedin" url="https://www.linkedin.com/in/yash-s-patil" fgColor="#ffffff" className="mr-4" />
          <span className='text-lg text-slate-50 font-normal'>[<a target="_blank" href="./Resume.pdf" className="text-orange-400">Resume</a>]</span>
        </div>

        <h2 className='font-semibold text-2xl text-slate-50 pt-16 pb-4'>Projects <span className="text-slate-400">(click on each to expand)</span></h2>
        <div className="grid max-w-full sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-4">
          {projectsList.map((project, index) =>
            <div id={project.id} className={`${isMobile ? 'col-span-12' : project.span} ${project.color} ${project.show ? 'p-8' : 'p-4'} ${project.show ? 'ring-offset-1 ring-2 ring-white' : ''} flex cursor-pointer flex-col shadow-2xl rounded-sm`}
              onClick={() => showMore(index)}>
              {project.show && project.details.logo && <div>
                <img src={require(`${project.details.logo}`)} className="w-20 rounded-full bg-white p-4 mb-6"></img>
              </div>}
              <div className={`${project.show ? 'text-2xl' : 'text-lg'} font-semibold`}>
                <span className={`text-slate-50`}>{project.name}</span><span className='text-slate-50'> — {project.subtitle}</span>
              </div>
              {project.show && <div>
                <a target='_blank' href={project.details.link} className={`text-slate-50 text-lg underline`}>{project.details.link_title}</a>
                {project.details.descriptions.map((description) =>
                  <p className='text-lg text-slate-50 font-normal pt-4' dangerouslySetInnerHTML={{ __html: description }}></p>
                )}
                <div className={`grid ${project.details.image_display} gap-4 mt-4`}>
                  {project.details.images.map((image) =>
                    <img src={require(`${image}`)} className="h-100 rounded-md"></img>
                  )}
                </div>
                {project.details.gif && <img src={project.details.gif} className="w-full rounded-md"></img>}
                {project.details.boba &&
                  <div className="w-full justify-center align-middle text-center">
                    <TwitterVideoEmbed id={'1503571971249893378'} />
                  </div>}
                {project.details.scio && <Carousel renderItem={customRenderItem} renderThumbs={customRenderThumb}>
                  <YoutubeSlide key="mission-possible" url="https://www.youtube.com/embed/EhfatoRAiEc" />
                  <YoutubeSlide key="mousetrap-vehicle" url="https://www.youtube.com/embed/ZkYCkzl9gTA" />
                  <YoutubeSlide key="air-trajectory" url="https://www.youtube.com/embed/pJ17PN2uRyw" />
                  <YoutubeSlide key="scrambler" url="https://www.youtube.com/embed/eRRIGAWF3BQ" />
                  <YoutubeSlide key="ping-pong-parachute" url="https://www.youtube.com/embed/msWRiuodZIg" />
                  <YoutubeSlide key="gravity-vehicle" url="https://www.youtube.com/embed/pJkYwY7tObI" />
                </Carousel>}
              </div>}
            </div>
          )}
        </div>
        <br />
        <br />
        <br />
      </div>
    </div >
  );
}

export default App;
