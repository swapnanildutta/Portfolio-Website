import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import BotProject from '../assets/botProject.gif';
import BotProjectPlaceholder from '../assets/botProjectPlaceholder.png';
import robotics from '../assets/robotics.gif';
import roboticsPlaceholder from '../assets/robotics.min.png';
import gcpsLaunch from '../assets/gcpsLaunch.gif';
import gcpsLaunchPlaceholder from '../assets/gcpsLaunchPlaceholder.png';
import gcpsNotebook from '../assets/gcpsNotebook.gif';
import gcpsNotebookPlaceholder from '../assets/gcpsNotebookPlaceholder.png';
import ArMTG from '../assets/ARMTGWeb.gif';
import ArMTGPlaceholder from '../assets/ARMTGWebPlaceHolder.png';
const disciplines = ['Student'];

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disciplineIndex: 0,
      hideScrollIndicator: false,
      backgroundLoaded: false,
      visibleSections: [],
    }

    this.scheduledAnimationFrame = false;
    this.lastScrollY = 0;
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;

    this.revealSections = [
      this.intro,
      this.projectOne,
      this.projectTwo,
      this.projectThree,
	    this.projectFour,
      this.projectFive,
      this.details,
    ];

    import('../components/DisplacementSphere').then(DisplacementSphere => {
      this.setState({ backgroundLoaded: true });
      this.sphere = new DisplacementSphere.default(threeCanvas);
      requestAnimationFrame(() => this.sphere.init());
    });

    window.addEventListener('scroll', this.handleScroll);
    this.setState({ visibleSections: [this.intro] });
    this.switchDiscipline();
    this.initScroll();
  }

  initScroll = () => {
    const { status, location } = this.props;
    const { hash } = location;

    if (status !== 'entered') {
      requestAnimationFrame(this.initScroll);
    } else if (hash && status === 'entered') {
      this.handleHashchange(hash, false);
    } else if (status === 'entered') {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.sphere.remove();
    clearInterval(this.disciplineInterval);
  }

  componentDidUpdate(prevProps) {
    const { key: currentKey } = prevProps.location;
    const { key: nextKey, hash: nextHash } = this.props.location;

    if (currentKey !== nextKey && prevProps.status === 'entered') {
      this.handleHashchange(nextHash, true);
    }
  }

  handleScroll = () => {
    this.lastScrollY = window.scrollY;
    if (this.scheduledAnimationFrame) return;
    this.scheduledAnimationFrame = true;

    requestAnimationFrame(() => {
      const { visibleSections } = this.state;

      const revealableSections = this.revealSections.filter(section => {
        if (visibleSections.includes(section)) return false;
        return this.isInViewport(section, this.lastScrollY);
      });

      this.setState({
        visibleSections: [...visibleSections, ...revealableSections],
        hideScrollIndicator: this.lastScrollY >= 50,
      });

      this.scheduledAnimationFrame = false;
    });
  }

  handleHashchange = (hash, scroll) => {
    const hashSections = [this.intro, this.projectOne, this.details];
    const hashString = hash.replace('#', '');
    const element = hashSections.filter(item => item.id === hashString)[0];

    if (element) {
      element.scrollIntoView({
        behavior: scroll ? 'smooth' : 'instant',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  isInViewport = (elem, scrollY) => {
    const rect = elem.getBoundingClientRect();
    const offsetY = window.pageYOffset;
    const revealOffset = window.innerHeight - 100;
    const top = rect.top + offsetY;
    return top - revealOffset <= scrollY;
  }

  switchDiscipline = () => {
    this.disciplineInterval = setInterval(() => {
      const { disciplineIndex } = this.state;
      const index = disciplineIndex >= disciplines.length - 1 ? 0 : disciplineIndex + 1;

      this.setState({
        disciplineIndex: index,
      });
    }, 5000);
  }

  render() {
    const { disciplineIndex, hideScrollIndicator,
      visibleSections, backgroundLoaded } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Cody Bennett</title>
          <meta
            name="description"
            content="Portfolio of Cody Bennett"
          />
        </Helmet>
        <Intro
          id="intro"
          sectionRef={section => this.intro = section}
          threeCanvas={canvas => this.threeCanvas = canvas}
          disciplines={disciplines}
          disciplineIndex={disciplineIndex}
          hideScrollIndicator={hideScrollIndicator}
          backgroundLoaded={backgroundLoaded}
        />
        <ProjectItem
          id="projects"
          tabIndex={0}
          sectionRef={section => this.projectOne = section}
          visible={visibleSections.includes(this.projectOne)}
          index="01"
          title="ArMTG"
          description="Bringing the future to the renowned card game: Magic, the Gathering."
          buttonText="View Project"
          buttonLink="/mtg"
          imageSrc={[`${ArMTG} 980w, ${ArMTG} 1376w`]}
          imageAlt={["ArMTG Website"]}
          imagePlaceholder={[ArMTGPlaceholder]}
          imageType="laptop"
        />
        <ProjectItem
          id="projects"
          tabIndex={0}
          sectionRef={section => this.projectTwo = section}
          visible={visibleSections.includes(this.projectTwo)}
          index="02"
          title="BattleBots 2019 Competition Website"
          description="A fully responsive website in a 3d playground, made with ThreeJS."
          buttonText="View Project"
          buttonTo="/projects/battlebots"
          imageSrc={[`${BotProject} 980w, ${BotProject} 1376w`]}
          imageAlt={["Gateway's BattleBots competition website."]}
          imagePlaceholder={[BotProjectPlaceholder]}
          imageType="laptop"
        />
		<ProjectItem
          id="project2"
          tabIndex={0}
          sectionRef={section => this.projectThree = section}
          visible={visibleSections.includes(this.projectThree)}
          index="03"
		      title="Gateway Robotics State-Winning Website"
          description="A fully responsive 3d website of the Gateway Robotics team all under 10MB (~3 images in size). This website brought the team to Texas state competition through the BEST Website Award."
          buttonText="View Project"
          buttonTo="/projects/gcpsrobotics"
		      imageSrc={[`${robotics} 980w, ${robotics} 1376w`]}
          imageAlt={['Gateway Robotics Website']}
          imagePlaceholder={[roboticsPlaceholder]}
          imageType="laptop"
        />
		<ProjectItem
          id="project3"
          tabIndex={0}
          sectionRef={section => this.projectFour = section}
          visible={visibleSections.includes(this.projectFour)}
          index="04"
		      title="Gateway CPS - Interactive Notebook"
          description="A responsive and interactive online platform for the masses."
          buttonText="View Project"
          buttonLink="https://gcps.cf/notebook"
		      imageSrc={[`${gcpsNotebook} 980w, ${gcpsNotebook} 1376w`]}
          imageAlt={['Gateway CPS Notebook']}
          imagePlaceholder={[gcpsNotebookPlaceholder]}
          imageType="laptop"
        />
        <ProjectItem
          id="project4"
          tabIndex={0}
          sectionRef={section => this.projectFive = section}
          visible={visibleSections.includes(this.projectFive)}
          index="05"
          title="GCPS Launch Initiative Website"
          description="Official website of the Gateway Cubesat Project of Nasa's Cubesat Initiative."
          buttonText="View Project"
          buttonLink="https://github.com/Gateway-Launch-Initiative/GateSat-Website"
          imageSrc={[`${gcpsLaunch} 980w, ${gcpsLaunch} 1376w`]}
          imageAlt={['Cubesat Project Website']}
          imagePlaceholder={[gcpsLaunchPlaceholder]}
          imageType="laptop"
        />
        <Profile
          tabIndex={0}
          sectionRef={section => this.details = section}
          visible={visibleSections.includes(this.details)}
          id="details"
        />
        <Footer />
      </React.Fragment>
    );
  }
}
