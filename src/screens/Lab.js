import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Intro from '../screens/IntroLab';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import ArMTG from '../assets/ArMTG.gif';
import ArMTGPlaceHolder from '../assets/ArMTGPlaceholder.png';
import Rainbow from '../assets/rainbow.gif';
import RainbowPlaceholder from '../assets/rainbowPlaceholder.png';
import Cold from '../assets/cold.gif';
import ColdPlaceholder from '../assets/coldPlaceholder.png';
import One from '../assets/one.gif';
import OnePlaceholder from '../assets/onePlaceholder.png';
import Two from '../assets/two.gif';
import TwoPlaceholder from '../assets/twoPlaceHolder.png';
import Three from '../assets/three.gif';
import ThreePlaceholder from '../assets/threePlaceholder.png';
import Four from '../assets/four.gif';
import FourPlaceholder from '../assets/fourPlaceholder.png';
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
      this.projectSix,
      this.projectSeven,
      this.details,
    ];

    import('../components/DisplacementSphere').then(DisplacementSphere => {
      this.setState({ backgroundLoaded: true });
      this.sphere = new DisplacementSphere.default(threeCanvas);
      requestAnimationFrame(() => this.sphere.init());
    });

    window.addEventListener('scroll', this.handleScroll);
    this.setState({ visibleSections: [this.intro] });
    //this.switchDiscipline();
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
    const { hideScrollIndicator, visibleSections, backgroundLoaded } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Cody Bennett | Lab</title>
          <meta
            name="description"
            content="This is my lab where I experiment with the latest technologies to create beautiful experiences."
          />
        </Helmet>
        <Intro
          id="intro"
          sectionRef={section => this.intro = section}
          threeCanvas={canvas => this.threeCanvas = canvas}
          disciplines={disciplines}
          //disciplineIndex={disciplineIndex}
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
          description="An augmented reality solution to the card game: Magic, the Gathering."
          buttonText="View Project"
          buttonLink="https://github.com/CodyJasonBennett/ArMTG"
          imageSrc={[`${ArMTG} 980w, ${ArMTG} 1376w`]}
          imageAlt={["An augmented game in progress."]}
          imagePlaceholder={[ArMTGPlaceHolder]}
          imageType="laptop"
        />
        <ProjectItem
          tabIndex={0}
          sectionRef={section => this.projectTwo = section}
          visible={visibleSections.includes(this.projectTwo)}
          index="02"
          title="Explosions of Color"
          description="A colorful experiment with BAS Utilities and ThreeJS."
          buttonText="Launch Experiment"
          buttonLink="https://codepen.io/cbenn/pen/YBoPRo"
          imageSrc={[`${Rainbow} 980w, ${Rainbow} 1376w`]}
          imageAlt={["A colorful experiment with BAS Utilities and ThreeJS."]}
          imagePlaceholder={[RainbowPlaceholder]}
          imageType="laptop"
        />
        <ProjectItem
          tabIndex={0}
          sectionRef={section => this.projectThree = section}
          visible={visibleSections.includes(this.projectThree)}
          index="03"
          title="It's Cold Outside"
          description="Another animation in ThreeJS with BAS Utilities."
          buttonText="Launch Experiment"
          buttonLink="https://codepen.io/cbenn/pen/ywBLMQ"
          imageSrc={[`${Cold} 980w, ${Cold} 1376w`]}
          imageAlt={["A colorful experiment with BAS Utilities and ThreeJS."]}
          imagePlaceholder={[ColdPlaceholder]}
          imageType="laptop"
        />
        <ProjectItem
          tabIndex={0}
          sectionRef={section => this.projectFour = section}
          visible={visibleSections.includes(this.projectFour)}
          index="04"
          title="A World of Shapes"
          description="The fourth take on a series of ThreeJS experiments toying with BAS Utilities."
          buttonText="Launch Experiment"
          buttonTo="https://codepen.io/cbenn/pen/rZKPjj"
          imageSrc={[`${Four} 980w, ${Four} 1376w`]}
          imageAlt={['Project3']}
          imagePlaceholder={[FourPlaceholder]}
          imageType="laptop"
        />
        <ProjectItem
          tabIndex={0}
          sectionRef={section => this.projectFive = section}
          visible={visibleSections.includes(this.projectFive)}
          index="05"
          title="Tunnel Vision"
          description="The third take on a series of ThreeJS experiments toying with BAS Utilities."
          buttonText="Launch Experiment"
          buttonTo="https://codepen.io/cbenn/pen/dqKaXm"
          imageSrc={[`${Three} 980w, ${Three} 1376w`]}
          imageAlt={['Project3']}
          imagePlaceholder={[ThreePlaceholder]}
          imageType="laptop"
        />
        <ProjectItem
          tabIndex={0}
          sectionRef={section => this.projectSix = section}
          visible={visibleSections.includes(this.projectSix)}
          index="06"
          title="Up in Flames"
          description="The second take on a series of ThreeJS experiments toying with BAS Utilities."
          buttonText="Launch Experiment"
          buttonTo="https://codepen.io/cbenn/full/EeRrPW"
          imageSrc={[`${Two} 980w, ${Two} 1376w`]}
          imageAlt={['Project3']}
          imagePlaceholder={[TwoPlaceholder]}
          imageType="laptop"
        />
        <ProjectItem
          tabIndex={0}
          sectionRef={section => this.projectSeven = section}
          visible={visibleSections.includes(this.projectSeven)}
          index="07"
          title="In Between Frames"
          description="First take on a series of ThreeJS experiments toying with BAS Utilites."
          buttonText="Launch Experiment"
          buttonTo="https://codepen.io/cbenn/full/KxeJpK"
          imageSrc={[`${One} 980w, ${One} 1376w`]}
          imageAlt={['Project3']}
          imagePlaceholder={[OnePlaceholder]}
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
