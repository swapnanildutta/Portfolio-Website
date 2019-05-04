import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import Helmet from 'react-helmet-async';
import 'intersection-observer';
import { AppContext } from '../app/App';
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import BellsGC from '../assets/BellsGC/BellsGC.png';
import BellsGCPlaceholder from '../assets/BellsGC/BellsGCPlaceholder.png';
import MystGang from '../assets/MystGang/MystGang.webp';
import MystGangPlaceholder from '../assets/MystGang/MystGangPlaceholder.png';
import ArMTG from '../assets/ARMTG/ARMTGWeb.webp';
import ArMTGPlaceholder from '../assets/ARMTG/ARMTGWebPlaceHolder.png';
import BotProject from '../assets/BattleBots/botProject.webp';
import BotProjectPlaceholder from '../assets/BattleBots/botProjectPlaceholder.png';
import Robotics from '../assets/Robotics/robotics.webp';
import RoboticsPlaceholder from '../assets/Robotics/robotics.min.png';

const disciplines = ['Developer'];

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
  const about = useRef();
  const disciplineTimeout = useRef();
  const revealSections = [intro, projectOne, projectTwo, projectThree, projectFour, projectFive, about];

  useEffect(() => {

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
    const hashString = hash.replace('#', '');
    const element = revealSections.filter(item => item.current.id === hashString)[0];

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
        title="Cody Bennett"
        meta={[{
          name: 'description',
          content: "I’m a student based in Austin, currently looking for an internship. I create compelling designs that I bring to life with the web's coolest technologies that look perfect on every screen.",
        }]}
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        disciplineIndex={disciplineIndex}
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
        imageType="laptop"
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
        imageType="laptop"
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
        imageType="laptop"
      />
	     <ProjectItem
        id="work4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index="04"
        title="BattleBots 2019 Competition Website"
        description="A fully responsive website in a 3d playground, made with ThreeJS."
        buttonText="View Project"
        buttonTo="/projects/battlebots"
        imageSrc={useMemo(() => [`${BotProject}`], [])}
        imageAlt={useMemo(() => ["Gateway's BattleBots competition website."], [])}
        imagePlaceholder={useMemo(() => [BotProjectPlaceholder], [])}
        imageType="laptop"
      />
      <ProjectItem
    		id="work5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index="05"
        title="Gateway Robotics State-Winning Website"
        description="A fully responsive 3d website of the Gateway Robotics team all under 10MB (~3 images in size). This website brought the team to Texas state competition through the BEST Website Award."
        buttonText="View Project"
        buttonTo="/projects/gcpsrobotics"
        imageSrc={useMemo(() => [`${Robotics}`], [])}
        imageAlt={useMemo(() => ['Gateway Robotics Website'], [])}
        imagePlaceholder={useMemo(() => [RoboticsPlaceholder], [])}
        imageType="laptop"
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
