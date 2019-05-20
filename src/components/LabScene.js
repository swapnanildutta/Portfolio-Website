import React, { useEffect, useRef, useContext } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import {
  Vector2, WebGLRenderer, PerspectiveCamera, Scene, SphereBufferGeometry, Mesh, Color, Fog, HemisphereLight,
  Geometry, Vector3, CatmullRomCurve3, Line, LineBasicMaterial, MeshBasicMaterial, BackSide, TubeGeometry,
  MeshPhongMaterial, BoxBufferGeometry, IcosahedronBufferGeometry
} from 'three';
import { media } from '../utils/StyleUtils';
import { AppContext } from '../app/App';

function LabScene() {
  const { currentTheme } = useContext(AppContext);
  const initialThemeRef = useRef(currentTheme);
  const container = useRef();
  let isRendered = useRef(false);
  let ww = window.innerWidth;
  let wh = window.innerHeight;
  let isMobile = ww < media.mobile;

  function Lab3D() {
    this.init();
    this.createMesh();
    this.handleEvents();
    window.requestAnimationFrame(this.render.bind(this));
  }

  Lab3D.prototype.init = function() {

    this.speed = 1;
    this.prevTime = 0;

    this.mouse = {
      position: new Vector2(ww * 0.5, wh * 0.7),
      ratio: new Vector2(0, 0),
      target: new Vector2(ww * 0.5, wh * 0.7)
    };

    this.renderer = new WebGLRenderer({
      antialias: true
    });
    container.current.appendChild(this.renderer.domElement);
    this.renderer.setSize(ww, wh);

    this.camera = new PerspectiveCamera(15, ww / wh, 0.01, 100);
    this.camera.rotation.y = Math.PI;
    this.camera.position.z = 0.35;

    this.scene = new Scene();
    this.scene.fog = new Fog(initialThemeRef.current.colorAccent ? initialThemeRef.current.colorAccent : 0x00E5FF,0.05,1.6);

    var light = new HemisphereLight(initialThemeRef.current.colorWhite ? initialThemeRef.current.colorWhite : 0xffffff, initialThemeRef.current.id === 'light' ? 0.8 : 0.1);
    this.scene.add( light );

    this.addParticle();
  };

  Lab3D.prototype.addParticle = function() {
    this.particles = [];
    for(var i = 0; i < (isMobile?70:150); i++){
      this.particles.push(new Particle(this.scene));
    }
  };

  Lab3D.prototype.createMesh = function() {
    var points = [];
    var i = 0;
    var geometry = new Geometry();

    this.scene.remove(this.tubeMesh)

    for (i = 0; i < 5; i += 1) {
      points.push(new Vector3(0, 0, 2.5 * (i / 4)));
    }
    points[4].y = -0.06;

    this.curve = new CatmullRomCurve3(points);
    this.curve.type = "catmullrom";

    geometry = new Geometry();
    geometry.vertices = this.curve.getPoints(70);
    this.splineMesh = new Line(geometry, new LineBasicMaterial());

    this.tubeMaterial = new MeshBasicMaterial({
      side: BackSide,
      color: initialThemeRef.current.colorBackground ? initialThemeRef.current.colorBackground : 0x111111
    });

    this.tubeGeometry = new TubeGeometry(this.curve, 70, 0.02, 30, false);
    this.tubeGeometry_o = this.tubeGeometry.clone();
    this.tubeMesh = new Mesh(this.tubeGeometry, this.tubeMaterial);

    this.scene.add(this.tubeMesh);
  };

  Lab3D.prototype.handleEvents = function() {
    window.addEventListener('resize', this.onResize.bind(this), false);

    document.body.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    document.body.addEventListener('touchmove', this.onMouseMove.bind(this), false);
  };

  Lab3D.prototype.onResize = function() {
    ww = window.innerWidth;
    wh = window.innerHeight;

    isMobile = ww < 500;

    this.camera.aspect = ww / wh;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(ww, wh);
  };

  Lab3D.prototype.onMouseMove = function(e) {
    if (e.type === "mousemove"){
      this.mouse.target.x = e.clientX;
      this.mouse.target.y = e.clientY;
    } else {
      this.mouse.target.x = e.touches[0].clientX;
      this.mouse.target.y = e.touches[0].clientY;
    }
  };

  Lab3D.prototype.updateCameraPosition = function() {
    this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 30;
    this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 30;

    this.mouse.ratio.x = (this.mouse.position.x / ww);
    this.mouse.ratio.y = (this.mouse.position.y / wh);

    this.camera.rotation.z = ((this.mouse.ratio.x) * 1 - 0.05);
    this.camera.rotation.y = Math.PI - (this.mouse.ratio.x * 0.3 - 0.15);
    this.camera.position.x = ((this.mouse.ratio.x) * 0.044 - 0.025);
    this.camera.position.y = ((this.mouse.ratio.y) * 0.044 - 0.025);
  };

  Lab3D.prototype.updateCurve = function() {
    var i = 0;
    var index = 0;
    var vertice_o = null;
    var vertice = null;
    for (i = 0; i < this.tubeGeometry.vertices.length; i += 1) {
      vertice_o = this.tubeGeometry_o.vertices[i];
      vertice = this.tubeGeometry.vertices[i];
      index = Math.floor(i / 30);
      vertice.x += ((vertice_o.x + this.splineMesh.geometry.vertices[index].x) - vertice.x) / 15;
      vertice.y += ((vertice_o.y + this.splineMesh.geometry.vertices[index].y) - vertice.y) / 15;
    }
    this.tubeGeometry.verticesNeedUpdate = true;

    this.curve.points[2].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;
    this.curve.points[3].x = 0;
    this.curve.points[4].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;

    this.curve.points[2].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;
    this.curve.points[3].y = 0;
    this.curve.points[4].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;

    this.splineMesh.geometry.verticesNeedUpdate = true;
    this.splineMesh.geometry.vertices = this.curve.getPoints(70);
  };

  Lab3D.prototype.render = function(time) {

    this.updateCameraPosition();

    this.updateCurve();

    for(var i = 0; i < this.particles.length; i++){
      this.particles[i].update(this);
    }

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.render.bind(this));
  };

  function Particle(scene, burst, time) {
    var radius = Math.random()*0.002 + 0.0003;
    var geom = this.icosahedron;
    var random = Math.random();
    if(random > 0.9){
      geom = this.cube;
    } else if(random > 0.8){
      geom = this.sphere;
    }
    var range = 50;
    var offset = 180;
    this.color = new Color("hsl("+(Math.random()*range+offset)+",100%,80%)");
    var mat = new MeshPhongMaterial({
      color: this.color,
      flatShading: true
    });
    this.mesh = new Mesh(geom, mat);
    this.mesh.scale.set(radius, radius, radius);
    this.mesh.position.set(0,0,1.5);
    this.percent = Math.random();
    this.offset = new Vector3((Math.random()-0.5)*0.025, (Math.random()-0.5)*0.025, 0);
    this.speed = Math.random()*0.004 + 0.0002;
    this.rotate = new Vector3(-Math.random()*0.1+0.01,0,Math.random()*0.01);
    this.pos = new Vector3(0,0,0);
    scene.add(this.mesh);
  }

  Particle.prototype.cube = new BoxBufferGeometry(1, 1, 1);
  Particle.prototype.sphere = new SphereBufferGeometry(1, 6, 6 );
  Particle.prototype.icosahedron = new IcosahedronBufferGeometry(1,0);
  Particle.prototype.update = function (Lab3D) {
    this.percent += this.speed * Lab3D.speed;
    this.pos = Lab3D.curve.getPoint(1 - (this.percent%1)).add(this.offset);
    this.mesh.position.x = this.pos.x;
    this.mesh.position.y = this.pos.y;
    this.mesh.position.z = this.pos.z;
    this.mesh.rotation.x += this.rotate.x;
    this.mesh.rotation.y += this.rotate.y;
    this.mesh.rotation.z += this.rotate.z;
  };

  useEffect(() => {
    if (!isRendered.current) {
      window.Lab3D = new Lab3D();
      isRendered.current = true;
    }
  });

  return (
    <SceneContainer ref={container} aria-hidden />
  );
}

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const SceneContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  canvas {
    position: absolute;
    animation-duration: 3s;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    animation-fill-mode: forwards;
    opacity: 0;
    animation-name: ${AnimBackgroundFade};
  }
`;

export default React.memo(LabScene);
