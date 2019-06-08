import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import 'intersection-observer';
import { AppContext } from '../app/App';
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import { usePrefersReducedMotion } from '../utils/Hooks';
import BellsGC from '../assets/BellsGC/BellsGC.webp';
import BellsGCPlaceholder from '../assets/BellsGC/BellsGCPlaceholder.png';
import BellsGCStill from '../assets/BellsGC/BellsGCStill.webp';
import MystGang from '../assets/MystGang/MystGang.mp4';
import MystGangPlaceholder from '../assets/MystGang/MystGangPlaceholder.png';
import MystGangStill from '../assets/MystGang/MystGangStill.webp';
import ArMTG from '../assets/ARMTG/ARMTGWeb.mp4';
import ArMTGPlaceholder from '../assets/ARMTG/ARMTGWebPlaceHolder.png';
import ArMTGStill from '../assets/ARMTG/ARMTGStill.webp';
import Robotics from '../assets/Robotics/robotics.mp4';
import RoboticsPlaceholder from '../assets/Robotics/roboticsPlaceholder.png';
import RoboticsStill from '../assets/Robotics/roboticsStill.webp';
const disciplines = ['Developer'];

export default function Home(props) {
  const { status, updateTheme } = useContext(AppContext);
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
  const about = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if ((status === 'entered' || status === 'exiting')) {
      updateTheme();
    }
  }, [updateTheme, status]);

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, projectFour, about];

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

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

    const handleHashchange = (hash, scroll) => {
      const hashSections = [intro, projectOne, projectTwo, projectThree, projectFour, about];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = hashString === 'intro' ? 0 : element.current.offsetTop;

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
  }, [hash, prefersReducedMotion, status]);

  return (
    <React.Fragment>
      <Helmet
        title="Cody Bennett"
        meta={[{
          name: 'description',
          content: "Portfolio of Cody Bennett – I’m a student developer based in Austin. I create compelling designs that I bring to life with the web's coolest technologies that look perfect on every screen.",
        }]}
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectItem
        id="work"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index="01"
        title="Bell's Gaming Center"
        description="A website featuring a storefront, events calendar, and games' dashboard for a local game store."
        buttonText="View Project"
        buttonTo="/projects/bellsgc"
        imageSrc={useMemo(() => [`${BellsGC}`], [])}
        imageAlt={useMemo(() => ['Bell\'s GC Website'], [])}
        imagePlaceholder={useMemo(() => [BellsGCPlaceholder], [])}
        customColor={'rgba(251, 201, 98, 1)'}
        still={prefersReducedMotion ? BellsGCStill : false}
      />
      <ProjectItem
        id="work2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index="02"
        title="MystGang"
        description="Bringing an epic content creator's portfolio to life with ThreeJS."
        buttonText="View Project"
        buttonTo="/projects/mystgang"
        imageSrc={useMemo(() => [`${MystGang}`], [])}
        imageAlt={useMemo(() => ['MystGang Website'], [])}
        imagePlaceholder={useMemo(() => [MystGangPlaceholder], [])}
        customColor={'rgba(181, 155, 105, 1)'}
        still={prefersReducedMotion ? MystGangStill : false}
        video
      />
      <ProjectItem
        id="work3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index="03"
        title="ArMTG"
        description="Bringing the future to the renowned card game: Magic, the Gathering."
        buttonText="View Project"
        buttonTo="/projects/armtg"
        imageSrc={useMemo(() => [`${ArMTG}`], [])}
        imageAlt={useMemo(() => ['ArMTG Website'], [])}
        imagePlaceholder={useMemo(() => [ArMTGPlaceholder], [])}
        customColor={'rgba(101, 154, 247, 1)'}
        still={prefersReducedMotion ? ArMTGStill : false}
        video
      />
      <ProjectItem
    		id="work4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index="04"
        title="GCPS Robotics"
        description="Creating the website and the robot core that won the BEST Robotics State Competition Website Award."
        buttonText="View Project"
        buttonTo="/projects/gcpsrobotics"
        imageSrc={useMemo(() => [`${Robotics}`], [])}
        imageAlt={useMemo(() => ['Gateway Robotics Website'], [])}
        imagePlaceholder={useMemo(() => [RoboticsPlaceholder], [])}
        customColor={'rgba(54, 210, 120, 1)'}
        still={prefersReducedMotion ? RoboticsStill : false}
        video
      />
      <Profile
        id="about"
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
      />
      <Footer />
    </React.Fragment>
  );
};
