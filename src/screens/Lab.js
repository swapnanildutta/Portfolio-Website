import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import Helmet from 'react-helmet-async';
import 'intersection-observer';
import { AppContext } from '../app/App';
import Intro from '../screens/IntroLab';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import ArMTG from '../assets/Lab/ArMTG.webp';
import ArMTGPlaceHolder from '../assets/Lab/ArMTGPlaceholder.png';
import Rainbow from '../assets/Lab/rainbow.webp';
import RainbowPlaceholder from '../assets/Lab/rainbowPlaceholder.png';
import Cold from '../assets/Lab/cold.webp';
import ColdPlaceholder from '../assets/Lab/coldPlaceholder.png';
import One from '../assets/Lab/one.webp';
import OnePlaceholder from '../assets/Lab/onePlaceholder.png';
import Two from '../assets/Lab/two.webp';
import TwoPlaceholder from '../assets/Lab/twoPlaceHolder.png';
import Three from '../assets/Lab/three.webp';
import ThreePlaceholder from '../assets/Lab/threePlaceholder.png';
import Four from '../assets/Lab/four.webp';
import FourPlaceholder from '../assets/Lab/fourPlaceholder.png';
const disciplines = ['Student'];

export default function Home(props) {
  const { status } = useContext(AppContext);
  const { location } = props;
  const { hash } = location;
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const projectSix = useRef();
  const projectSeven = useRef();
  const about = useRef();
  const disciplineTimeout = useRef();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, projectFour, projectFive, projectSix, projectSeven, about];

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          sectionObserver.unobserve(section);
          if (visibleSections.includes(section)) return;
          setVisibleSections((prevSections) => [...prevSections, section]);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });

    const indicatorObserver = new IntersectionObserver(([entry]) => {
      setScrollIndicatorHidden(!entry.isIntersecting);
    }, { rootMargin: "-100% 0px 0px 0px" });

    revealSections.forEach((section) => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return function cleanUp() {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    if (status === 'entered') {
      handleHashchange(hash, true);
    }
  }, [location]);

  useEffect(() => {
    if (hash && status === 'entered') {
      handleHashchange(hash, false);
    } else if (status === 'entered') {
      window.scrollTo(0, 0);
    }
  }, [status]);

  useEffect(() => {
    disciplineTimeout.current = setTimeout(() => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    }, 5000);

    return function cleanUp() {
      clearTimeout(disciplineTimeout.current);
    };
  }, [disciplineIndex]);

  const handleHashchange = useMemo(() => (hash, scroll) => {
    const hashSections = [intro, projectOne, about];
    const hashString = hash.replace('#', '');
    const element = hashSections.filter(item => item.current.id === hashString)[0];

    if (element) {
      element.current.scrollIntoView({
        behavior: scroll ? 'smooth' : 'instant',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Helmet
        title="Cody Bennett | Lab"
        meta={[{
          name: 'description',
          content: "This is my lab where I experiment with the latest technologies to create beautiful experiences.",
        }]}
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        //disciplineIndex={disciplineIndex}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectItem
        id="projects"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index="01"
        title="ArMTG"
        description="Bringing the future to the renowned card game: Magic, the Gathering."
        buttonText="Launch Experiment"
        buttonLink="https://github.com/CodyJasonBennett/ArMTG"
        imageSrc={useMemo(() => [`${ArMTG}`], [])}
        imageAlt={useMemo(() => ['ArMTG Website'], [])}
        imagePlaceholder={useMemo(() => [ArMTGPlaceHolder], [])}
        imageType="laptop"
      />
	    <ProjectItem
        id="project2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index="02"
        title="Explosions of Color"
        description="A colorful experiment with BAS Utilities and ThreeJS."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/YBoPRo"
        imageSrc={useMemo(() => [`${Rainbow}`], [])}
        imageAlt={useMemo(() => ["A colorful experiment with BAS Utilities and ThreeJS."], [])}
        imagePlaceholder={useMemo(() => [RainbowPlaceholder], [])}
        imageType="laptop"
      />
      <ProjectItem
    		id="project3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index="03"
        title="It's Cold Outside"
        description="Another animation in ThreeJS with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/ywBLMQ"
        imageSrc={useMemo(() => [`${Cold}`], [])}
        imageAlt={useMemo(() => ['Another animation in ThreeJS with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [ColdPlaceholder], [])}
        imageType="laptop"
      />
	    <ProjectItem
        id="project4"
		    sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index="04"
        title="A World of Shapes"
        description="The fourth take on a series of ThreeJS experiments toying with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/rZKPjj"
        imageSrc={useMemo(() => [`${Four}`], [])}
        imageAlt={useMemo(() => ['The fourth take on a series of ThreeJS experiments toying with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [FourPlaceholder], [])}
        imageType="laptop"
      />
	    <ProjectItem
        id="project5"
		    sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index="05"
        title="Tunnel Vision"
        description="The third take on a series of ThreeJS experiments toying with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/dqKaXm"
        imageSrc={useMemo(() => [`${Three}`], [])}
        imageAlt={useMemo(() => ['The third take on a series of ThreeJS experiments toying with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [ThreePlaceholder], [])}
        imageType="laptop"
      />
	    <ProjectItem
        id="project6"
		    sectionRef={projectSix}
        visible={visibleSections.includes(projectSix.current)}
        index="06"
        title="Up in Flames"
        description="The second take on a series of ThreeJS experiments toying with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/EeRrPWe"
        imageSrc={useMemo(() => [`${Two}`], [])}
        imageAlt={useMemo(() => ['The second take on a series of ThreeJS experiments toying with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [TwoPlaceholder], [])}
        imageType="laptop"
      />
	    <ProjectItem
        id="project7"
		    sectionRef={projectSeven}
        visible={visibleSections.includes(projectSeven.current)}
        index="07"
        title="In Between Frames"
        description="First take on a series of ThreeJS experiments toying with BAS Utilites."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/KxeJpK"
        imageSrc={useMemo(() => [`${One}`], [])}
        imageAlt={useMemo(() => ['First take on a series of ThreeJS experiments toying with BAS Utilites.'], [])}
        imagePlaceholder={useMemo(() => [OnePlaceholder], [])}
        imageType="laptop"
      />
      <Profile
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
      <Footer />
    </React.Fragment>
  );
};
