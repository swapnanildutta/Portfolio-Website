import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import 'intersection-observer';
import { AppContext } from '../app/App';
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import BellsGC from '../assets/BellsGC/BellsGC.png';
import BellsGCPlaceholder from '../assets/BellsGC/BellsGCPlaceholder.png';
import BellsGCBackground from '../assets/BellsGC/background.webp';
import MystGang from '../assets/MystGang/MystGang.webp';
import MystGangPlaceholder from '../assets/MystGang/MystGangPlaceholder.png';
import MystGangBackground from '../assets/MystGang/mystGangBack.gif';
import ArMTG from '../assets/ARMTG/ARMTGWeb.webp';
import ArMTGPlaceholder from '../assets/ARMTG/ARMTGWebPlaceHolder.png';
import ArMTGBackground from '../assets/ARMTG/background.webp';
import Robotics from '../assets/Robotics/robotics.webp';
import RoboticsPlaceholder from '../assets/Robotics/roboticsPlaceholder.png';
import RoboticsBackground from '../assets/Robotics/background.webp';
const disciplines = ['Developer'];

export default function Home(props) {
  const { status } = useContext(AppContext);
  const { location } = props;
  const { hash } = location;
  const initHash = useRef(hash);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const activeSection = useRef();
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const about = useRef();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, projectFour, about];

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          activeSection.current = section.id;
          //sectionObserver.unobserve(section);
          //if (visibleSections.includes(section)) return;
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
        background={BellsGCBackground}
        customColor={'rgba(251, 201, 98, 1)'}
        active={activeSection.current === 'work' || activeSection.current === 'work2'}
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
        background={MystGangBackground}
        customColor={'rgba(181, 155, 105, 1)'}
        active={activeSection.current === 'work' || activeSection.current === 'work2' || activeSection.current === 'work3'}
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
        background={ArMTGBackground}
        customColor={'rgba(101, 154, 247, 1)'}
        active={activeSection.current === 'work2' || activeSection.current === 'work3' || activeSection.current === 'work4'}
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
        background={RoboticsBackground}
        customColor={'rgba(54, 210, 120, 1)'}
        active={activeSection.current === 'work3' || activeSection.current === 'work4' || activeSection.current === 'about'}
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
