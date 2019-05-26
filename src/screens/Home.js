import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import 'intersection-observer';
import { AppContext } from '../app/App';
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import { usePrefersReducedMotion } from '../utils/Hooks';
import BellsGC from '../assets/BellsGC/BellsGC.webp';
import BellsGCPlaceholder from '../assets/BellsGC/BellsGCPlaceholder.webp';
import BellsGCStill from '../assets/BellsGC/bells-project.png'
import MystGang from '../assets/MystGang/MystGang.webp';
import MystGangPlaceholder from '../assets/MystGang/mystGangPlaceholder.webp';
import MystGangStill from '../assets/MystGang/mystgang-project.png';
import ArMTG from '../assets/ARMTG/ARMTGWeb.webp';
import ArMTGPlaceholder from '../assets/ARMTG/ARMTGWebPlaceHolder.webp';
import ArMTGStill from '../assets/ARMTG/armtg-project.png';
import Robotics from '../assets/Robotics/robotics.webp';
import RoboticsPlaceholder from '../assets/Robotics/roboticsPlaceholder.webp';
import RoboticsStill from '../assets/Robotics/dash-project.png';
const disciplines = ['Developer'];

export default function Home(props) {
  const { status } = useContext(AppContext);
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

  const handleHashchange = useCallback((hash, scroll) => {
    const hashSections = [intro, projectOne, projectTwo, projectThree, projectFour, about];
    const hashString = hash.replace('#', '');
    const element = hashSections.filter(item => item.current.id === hashString)[0];

    if (element) {
      window.scroll({
        top: hashString === 'intro' ? 0 : element.current.offsetTop,
        left: 0,
        behavior: scroll && !prefersReducedMotion ? 'smooth' : 'instant',
      });
    }
  }, [prefersReducedMotion]);

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
          content: "Portfolio of Cody Bennett – I’m a student developer based in Austin, currently looking for an internship. I create compelling designs that I bring to life with the web's coolest technologies that look perfect on every screen.",
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
        still={BellsGCStill}
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
        still={MystGangStill}
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
        still={ArMTGStill}
      />
      <ProjectItem
    		id="work4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index="04"
        title="GCPS Robotics"
        description="Creating the website and the robot core that won the BEST Robotics State Competition."
        buttonText="View Project"
        buttonTo="/projects/gcpsrobotics"
        imageSrc={useMemo(() => [`${Robotics}`], [])}
        imageAlt={useMemo(() => ['Gateway Robotics Website'], [])}
        imagePlaceholder={useMemo(() => [RoboticsPlaceholder], [])}
        customColor={'rgba(54, 210, 120, 1)'}
        still={RoboticsStill}
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
