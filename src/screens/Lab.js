import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import 'intersection-observer';
import { AppContext } from '../app/App';
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import placeholder2 from '../assets/placeholder.png';
import ArMTG from '../assets/Lab/ArMTG.webp';
import Rainbow from '../assets/Lab/rainbow.webp';
import Cold from '../assets/Lab/cold.webp';
import World from '../assets/Lab/world.webp';
import Tunnel from '../assets/Lab/tunnel.webp';
import Flames from '../assets/Lab/flames.webp';
import Frames from '../assets/Lab/frames.webp';
const disciplines = ['Lab'];

export default function Lab(props) {
  const status = useContext(AppContext);
  const { location } = props;
  const { hash } = location;
  const initHash = useRef(hash);
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

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, projectFour, projectFive, projectSix, projectSeven, about];

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          sectionObserver.unobserve(section);
          if (visibleSections.includes(section)) return;
          setVisibleSections(prevSections => [...prevSections, section]);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });

    const indicatorObserver = new IntersectionObserver(([entry]) => {
      setScrollIndicatorHidden(!entry.isIntersecting);
    }, { rootMargin: "-100% 0px 0px 0px" });

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return function cleanUp() {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  const handleHashchange = useCallback((hash, scroll) => {
    const hashSections = [intro, projectOne, projectTwo, projectThree, projectFour, projectFive, projectSix, projectSeven, about];
    const hashString = hash.replace('#', '');
    const element = hashSections.filter(item => item.current.id === hashString)[0];

    if (element) {
      window.scroll({
        top: element.current.offsetTop,
        left: 0,
        behavior: scroll ? 'smooth' : 'instant',
      });
    }
  }, []);

  useEffect(() => {
    if (status === 'entered') {
      handleHashchange(hash, true);
    }
  }, [handleHashchange, hash, status]);

  useEffect(() => {
    if (initHash.current && status === 'entered') {
      handleHashchange(initHash.current, false);
    } else if (status === 'entered') {
      window.scrollTo(0, 0);
    }
  }, [handleHashchange, status]);

  return (
    <React.Fragment>
      <Helmet
        title="Cody Bennett"
        meta={[{
          name: 'description',
          content: "This is my lab where I experiment with the latest technologies to create beautiful experiences.",
        }]}
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectItem
        id="experiment1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index="01"
        title="ArMTG"
        description="Bringing the future to the renowned card game: Magic, the Gathering."
        buttonText="Launch Experiment"
        buttonLink="https://github.com/CodyJasonBennett/ArMTG"
        imageSrc={useMemo(() => [`${ArMTG}`], [])}
        imageAlt={useMemo(() => ['ArMTG Website'], [])}
        imagePlaceholder={useMemo(() => [placeholder2], [])}
      />
	    <ProjectItem
        id="experiment2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index="02"
        title="Explosions of Color"
        description="A colorful experiment with BAS Utilities and ThreeJS."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/YBoPRo"
        imageSrc={useMemo(() => [`${Rainbow}`], [])}
        imageAlt={useMemo(() => ["A colorful experiment with BAS Utilities and ThreeJS."], [])}
        imagePlaceholder={useMemo(() => [placeholder2], [])}
      />
      <ProjectItem
		    id="experiment3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index="03"
        title="It's Cold Outside"
        description="Another animation in ThreeJS with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/ywBLMQ"
        imageSrc={useMemo(() => [`${Cold}`], [])}
        imageAlt={useMemo(() => ['Another animation in ThreeJS with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [placeholder2], [])}
      />
	    <ProjectItem
        id="experiment4"
		    sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index="04"
        title="A World of Shapes"
        description="The fourth take on a series of ThreeJS experiments toying with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/rZKPjj"
        imageSrc={useMemo(() => [`${World}`], [])}
        imageAlt={useMemo(() => ['The fourth take on a series of ThreeJS experiments toying with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [placeholder2], [])}
      />
	    <ProjectItem
        id="experiment5"
		    sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index="05"
        title="Tunnel Vision"
        description="The third take on a series of ThreeJS experiments toying with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/dqKaXm"
        imageSrc={useMemo(() => [`${Tunnel}`], [])}
        imageAlt={useMemo(() => ['The third take on a series of ThreeJS experiments toying with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [placeholder2], [])}
      />
	    <ProjectItem
        id="experiment6"
		    sectionRef={projectSix}
        visible={visibleSections.includes(projectSix.current)}
        index="06"
        title="Up in Flames"
        description="The second take on a series of ThreeJS experiments toying with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/EeRrPW"
        imageSrc={useMemo(() => [`${Flames}`], [])}
        imageAlt={useMemo(() => ['The second take on a series of ThreeJS experiments toying with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [placeholder2], [])}
      />
	    <ProjectItem
        id="experiment7"
		    sectionRef={projectSeven}
        visible={visibleSections.includes(projectSeven.current)}
        index="07"
        title="In Between Frames"
        description="First take on a series of ThreeJS experiments toying with BAS Utilites."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/KxeJpK"
        imageSrc={useMemo(() => [`${Frames}`], [])}
        imageAlt={useMemo(() => ['First take on a series of ThreeJS experiments toying with BAS Utilites.'], [])}
        imagePlaceholder={useMemo(() => [placeholder2], [])}
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
