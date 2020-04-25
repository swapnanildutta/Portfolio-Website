import React, { useState, useEffect, useRef, useMemo, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Intro from 'screens/Intro';
import ProjectItem from 'screens/ProjectItem';
import Profile from 'screens/Profile';
import Footer from 'components/Footer';
import { usePrefersReducedMotion, useRouteTransition } from 'hooks';
import dttProject from 'assets/dtt-project.png';
import dttProjectLarge from 'assets/dtt-project-large.png';
import dttProjectPlaceholder from 'assets/dtt-project-placeholder.png';
import mystgangProject from 'assets/mystgang-project.png';
import mystgangProjectLarge from 'assets/mystgang-project-large.png';
import mystgangProjectPlaceholder from 'assets/mystgang-project-placeholder.png';

const disciplines = ['Engineer', 'ML Enthusiast', 'Cloud Dev', 'Coder'];

export default function Home(props) {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const about = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, about];

    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          observer.unobserve(section);
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
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [intro, projectOne, projectTwo, about];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver((entries, observer) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          scrollTimeout = setTimeout(() => {
            element.current.focus();
          }, prefersReducedMotion ? 0 : 400);
          observer.unobserve(entry.target);
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

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <Fragment>
      <Helmet
        title="Swapnanil Dutta | Developer + Engineer"
        meta={[{
          name: "description",
          content: "Portfolio of Swapnanil Dutta – a Python developer who loves to explore data and enthusiastic about Cloud Development and Machine Learning Application.",
        }]}
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectItem
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index="01"
        title="A Tool for Everything"
        description="Creating a platfrom to help developers build better software."
        buttonText="View Project"
        buttonTo="/projects/dtt"
        imageSrc={useMemo(() => [`${dttProject} 980w, ${dttProjectLarge} 1376w`], [])}
        imageAlt={useMemo(() => ['DevTech Tools Landing Page'], [])}
        imagePlaceholder={useMemo(() => [dttProjectPlaceholder], [])}
        imageType="laptop"
      />
      <ProjectItem
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index="02"
        title="MystGang"
        description="A personal site for a gaming content creator."
        buttonText="View Project"
        buttonTo="/projects/mystgang"
        imageSrc={useMemo(() => [`${mystgangProject} 980w, ${mystgangProjectLarge} 1376w`], [])}
        imageAlt={useMemo(() => ['MystGang Website'], [])}
        imagePlaceholder={useMemo(() => [mystgangProjectPlaceholder], [])}
        imageType="laptop"
      />
      <Profile
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
      <Footer />
    </Fragment>
  );
}
