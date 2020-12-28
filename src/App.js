import React, { Component } from "react";
import { Scene } from "three";
import { Model } from "./mga/model";
import { View } from "./mga/view"
import 'rsuite/dist/styles/rsuite-dark.css';
import { Container, Content, Header, Sidebar } from 'rsuite';
import Top from './ui/Top';
import Side from './ui/Side';


class App extends Component {
  scene; model; view;

  controller = () => {
    this.scene = new Scene();
    this.model = new Model();
    this.view = new View();

    this.view.set(this.scene);
    this.model.loadSample(this.scene);

    this.mount.appendChild(this.view.renderer.domElement);

    const render = () => {
      requestAnimationFrame(render);
      this.view.update(this.scene);
    }

    const addListeners = () => {

      document.body.style.overflow = "hidden"

      window.addEventListener('resize', () => {
        this.view.resetAspect();
      });

      document.addEventListener('fullscreenchange', () => {
        this.view.resetAspect();
      });


      document.body.onkeydown = (e) => {
        var key = e.keyCode;
        //spacebar
        if (key == 32) {
          this.view.toggleCameraRotation();
        }
        //a
        if (key == 65) {
          this.view.toggleAxes(this.scene);
        }
        //g
        if (key == 71) {
          this.view.toggleGrid(this.scene);
        }
      }
    }

    render();
    addListeners();
  }

  componentDidMount() {
    this.controller();
  }

  render() {
    return (
      <div >

        <Container>
          <Top />

          <Container>
            <Side />
            <Content>
              <div ref={ref => (this.mount = ref)} />
            </Content>
          </Container>

        </Container>

      </div>
    )
  }
}

export default App;




