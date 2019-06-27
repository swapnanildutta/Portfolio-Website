import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppContext } from '../app/App';
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import { usePrefersReducedMotion } from '../utils/hooks';
import dttProject from '../assets/dtt-project.png';
import dttProjectLarge from '../assets/dtt-project-large.png';
import dttProjectPlaceholder from '../assets/dtt-project-placeholder.png';

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
  const about = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne, about];

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
      const hashSections = [intro, projectOne, about];
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
        buttonTo="/projects/devtech-tools"
        imageSrc={useMemo(() => [`${dttProject} 980w, ${dttProjectLarge} 1376w`], [])}
        imageAlt={useMemo(() => ['DevTech Tools Landing Page'], [])}
        imagePlaceholder={useMemo(() => [dttProjectPlaceholder], [])}
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
