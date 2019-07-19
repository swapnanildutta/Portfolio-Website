import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppContext } from '../app/App';
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import { usePrefersReducedMotion } from '../utils/hooks';
import DTTProject from '../assets/DTT/dtt-project.png';
import DTTProjectLarge from '../assets/DTT/dtt-project-large.png';
import DTTProjectPlaceholder from '../assets/DTT/dtt-project-placeholder.png';
import BellsProject from '../assets/BellsGC/bells-project.png';
import BellsProjectLarge from '../assets/BellsGC/bells-project-large.png';
import BellsProjectPlaceholder from '../assets/BellsGC/bells-project-placeholder.png';
import MystGangProject from '../assets/MystGang/mystgang-project.png';
import MystGangProjectLarge from '../assets/MystGang/mystgang-project-large.png';
import MystGangProjectPlaceholder from '../assets/MystGang/mystgang-project-placeholder.png';
import ARMTGProject from '../assets/ARMTG/armtg-project.png';
import ARMTGProjectLarge from '../assets/ARMTG/armtg-project-large.png';
import ARMTGProjectPlaceholder from '../assets/ARMTG/armtg-project-placeholder.png';
import RoboticsProject from '../assets/Robotics/robotics-project.png';
import RoboticsProjectLarge from '../assets/Robotics/robotics-project-large.png';
import RoboticsProjectPlaceholder from '../assets/Robotics/robotics-project-placeholder.png';

const disciplines = ['Developer', 'Creator', 'Animator', 'Student'];

export default function Home(props) {
  const { status } = useContext(AppContext);
  const { location } = props;
  const { hash, state } = location;
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const about = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, projectFour, projectFive, about];

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
      const hashSections = [intro, projectOne, projectTwo, projectThree, projectFour, projectFive, about];
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
        title="Cody Bennett"
        meta={[{
          name: 'description',
          content: "Portfolio of Cody Bennett – a creator of web &amp; mobile solutions with a focus on motion and user experience.",
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
        title="A Tool for Everything"
        description="Creating a platfrom to help developers build better software."
        buttonText="View Project"
        buttonTo="/projects/devtech"
        imageSrc={useMemo(() => [`${DTTProject} 980w, ${DTTProjectLarge} 1376w`], [])}
        imageAlt={useMemo(() => ['DevTech Tools Landing Page'], [])}
        imagePlaceholder={useMemo(() => [DTTProjectPlaceholder], [])}
        imageType="laptop"
      />
      <ProjectItem
        id="work2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index="02"
        title="Bell's Gaming Center"
        description="A website featuring a storefront, events calendar, and games dashboard for a local game store."
        buttonText="View Project"
        buttonTo="/projects/bells"
        imageSrc={useMemo(() => [`${BellsProject} 980w, ${BellsProjectLarge} 1376w`], [])}
        imageAlt={useMemo(() => ['Bell\'s GC Website'], [])}
        imagePlaceholder={useMemo(() => [BellsProjectPlaceholder], [])}
        imageType="laptop"
      />
      <ProjectItem
        id="work3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index="03"
        title="MystGang"
        description="Bringing an epic content creator's portfolio to life with ThreeJS."
        buttonText="View Project"
        buttonTo="/projects/mystgang"
        imageSrc={useMemo(() => [`${MystGangProject} 980w, ${MystGangProjectLarge} 1376w`], [])}
        imageAlt={useMemo(() => ['MystGang Website'], [])}
        imagePlaceholder={useMemo(() => [MystGangProjectPlaceholder], [])}
        imageType="laptop"
      />
      <ProjectItem
        id="work4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index="04"
        title="ArMTG"
        description="Bringing the future to the renowned card game: Magic, the Gathering."
        buttonText="View Project"
        buttonTo="/projects/armtg"
        imageSrc={useMemo(() => [`${ARMTGProject} 980w, ${ARMTGProjectLarge} 1376w`], [])}
        imageAlt={useMemo(() => ['ArMTG Website'], [])}
        imagePlaceholder={useMemo(() => [ARMTGProjectPlaceholder], [])}
        imageType="laptop"
      />
      <ProjectItem
        id="work5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index="05"
        title="GCPS Robotics"
        description="Creating the website and the robot core that won the BEST Robotics State Competition Website Award."
        buttonText="View Project"
        buttonTo="/projects/robotics"
        imageSrc={useMemo(() => [`${RoboticsProject} 980w, ${RoboticsProjectLarge} 1376w`], [])}
        imageAlt={useMemo(() => ['Gateway Robotics Website'], [])}
        imagePlaceholder={useMemo(() => [RoboticsProjectPlaceholder], [])}
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
