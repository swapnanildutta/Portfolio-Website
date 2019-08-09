import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppContext } from '../app/App';
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import { usePrefersReducedMotion } from '../utils/Hooks';
import Cube from '../assets/Lab/Cube.webp';
import CubePlaceholder from '../assets/Lab/CubePlaceholder.png';
import ArMTG from '../assets/Lab/ArMTG.mp4';
import ArMTGPlaceholder from '../assets/Lab/ArMTGPlaceholder.png';
import Rainbow from '../assets/Lab/rainbow.mp4';
import RainbowPlaceholder from '../assets/Lab/rainbowPlaceholder.png';
import Cold from '../assets/Lab/cold.mp4';
import ColdPlaceholder from '../assets/Lab/coldPlaceholder.png';
import World from '../assets/Lab/world.mp4';
import WorldPlaceholder from '../assets/Lab/worldPlaceholder.png';
import Tunnel from '../assets/Lab/tunnel.mp4';
import TunnelPlaceholder from '../assets/Lab/tunnelPlaceholder.png';
import Flames from '../assets/Lab/flames.mp4';
import FlamesPlaceholder from '../assets/Lab/flamesPlaceholder.png';
import Frames from '../assets/Lab/frames.mp4';
import FramesPlaceholder from '../assets/Lab/framesPlaceholder.png';

const disciplines = ['Lab'];

export default function Home(props) {
  const { status } = useContext(AppContext);
  const { location } = props;
  const { hash, state } = location;
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const experiment1 = useRef();
  const experiment2 = useRef();
  const experiment3 = useRef();
  const experiment4 = useRef();
  const experiment5 = useRef();
  const experiment6 = useRef();
  const experiment7 = useRef();
  const experiment8 = useRef();
  const about = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, experiment1, experiment2, experiment3, experiment4, experiment5, experiment6, experiment7, experiment8, about];

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          sectionObserver.unobserve(section);
          if (visibleSections.includes(section)) return;
          setVisibleSections(prevSections => [...prevSections, section]);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    const indicatorObserver = new IntersectionObserver(([entry]) => {
      setScrollIndicatorHidden(!entry.isIntersecting);
    }, { rootMargin: '-100% 0px 0px 0px' });

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return function cleanUp() {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

    const handleHashchange = (hash, scroll) => {
      const hashSections = [intro, experiment1, experiment2, experiment3, experiment4, experiment5, experiment6, experiment7, experiment8, about];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      const scrollObserver = new IntersectionObserver(entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          element.current.focus();
          scrollObserver.unobserve(entry.target);
        }
      }, { rootMargin: '-20% 0px -20% 0px' });

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <React.Fragment>
      <Helmet
        title="Cody Bennett - Lab"
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
        sectionRef={experiment1}
        visible={visibleSections.includes(experiment1.current)}
        index="01"
        title="RGB Color Cube"
        description="A 3D cube map of the color spectrum of RGB in ThreeJS."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/Xwvxgy"
        imageSrc={useMemo(() => [`${Cube}`], [])}
        imageAlt={useMemo(() => ['A 3D cube graph of RGB colors'], [])}
        imagePlaceholder={useMemo(() => [CubePlaceholder], [])}
        imageType="laptop"
        still
      />
      <ProjectItem
        id="experiment2"
        sectionRef={experiment2}
        visible={visibleSections.includes(experiment2.current)}
        index="02"
        title="ArMTG"
        description="Bringing the future to the renowned card game: Magic, the Gathering."
        buttonText="Launch Experiment"
        buttonLink="https://github.com/CodyJasonBennett/ArMTG"
        imageSrc={useMemo(() => [`${ArMTG}`], [])}
        imageAlt={useMemo(() => ['ArMTG Website'], [])}
        imagePlaceholder={useMemo(() => [ArMTGPlaceholder], [])}
        imageType="laptop"
        video
      />
	    <ProjectItem
        id="experiment3"
        sectionRef={experiment3}
        visible={visibleSections.includes(experiment3.current)}
        index="03"
        title="Explosions of Color"
        description="A colorful experiment with BAS Utilities and ThreeJS."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/YBoPRo"
        imageSrc={useMemo(() => [`${Rainbow}`], [])}
        imageAlt={useMemo(() => ["A colorful experiment with BAS Utilities and ThreeJS."], [])}
        imagePlaceholder={useMemo(() => [RainbowPlaceholder], [])}
        imageType="laptop"
        video
      />
      <ProjectItem
		    id="experiment4"
        sectionRef={experiment4}
        visible={visibleSections.includes(experiment4.current)}
        index="04"
        title="It's Cold Outside"
        description="Another animation in ThreeJS with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/ywBLMQ"
        imageSrc={useMemo(() => [`${Cold}`], [])}
        imageAlt={useMemo(() => ['Another animation in ThreeJS with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [ColdPlaceholder], [])}
        imageType="laptop"
        video
      />
	    <ProjectItem
        id="experiment5"
		    sectionRef={experiment5}
        visible={visibleSections.includes(experiment5.current)}
        index="05"
        title="A World of Shapes"
        description="The fourth take on a series of ThreeJS experiments toying with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/rZKPjj"
        imageSrc={useMemo(() => [`${World}`], [])}
        imageAlt={useMemo(() => ['The fourth take on a series of ThreeJS experiments toying with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [WorldPlaceholder], [])}
        imageType="laptop"
        video
      />
	    <ProjectItem
        id="experiment6"
		    sectionRef={experiment6}
        visible={visibleSections.includes(experiment6.current)}
        index="06"
        title="Tunnel Vision"
        description="The third take on a series of ThreeJS experiments toying with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/dqKaXm"
        imageSrc={useMemo(() => [`${Tunnel}`], [])}
        imageAlt={useMemo(() => ['The third take on a series of ThreeJS experiments toying with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [TunnelPlaceholder], [])}
        imageType="laptop"
        video
      />
	    <ProjectItem
        id="experiment7"
		    sectionRef={experiment7}
        visible={visibleSections.includes(experiment7.current)}
        index="07"
        title="Up in Flames"
        description="The second take on a series of ThreeJS experiments toying with BAS Utilities."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/EeRrPW"
        imageSrc={useMemo(() => [`${Flames}`], [])}
        imageAlt={useMemo(() => ['The second take on a series of ThreeJS experiments toying with BAS Utilities.'], [])}
        imagePlaceholder={useMemo(() => [FlamesPlaceholder], [])}
        imageType="laptop"
        video
      />
	    <ProjectItem
        id="experiment8"
		    sectionRef={experiment8}
        visible={visibleSections.includes(experiment8.current)}
        index="08"
        title="In Between Frames"
        description="First take on a series of ThreeJS experiments toying with BAS Utilites."
        buttonText="Launch Experiment"
        buttonLink="https://codepen.io/cbenn/full/KxeJpK"
        imageSrc={useMemo(() => [`${Frames}`], [])}
        imageAlt={useMemo(() => ['First take on a series of ThreeJS experiments toying with BAS Utilites.'], [])}
        imagePlaceholder={useMemo(() => [FramesPlaceholder], [])}
        imageType="laptop"
        video
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
