import React from 'react';
import {
  Environment,
  AppRegistry,
    asset,
  StyleSheet,
    Image,
  Text,
  View,
    VrButton,
    NativeModules
} from 'react-360';
import {VideoPlayer, VideoControl} from "./src/VideoExtra";

const {surfaceModule, AudioModule, VideoModule} = NativeModules



class InfoPanel extends React.Component {
  state = {
    img: {
      name: 'info.jpg',
      height:100,
      width:100
    },
    isPlaying: false
  }

  transformDisplay(id) {
    this._changeSurfaceDimension(500, 300, id)
    this.setState({img: {
          name: null,
          width:500,
          height:300,
    }});
  }

  resetPanel(id){
    this._changeSurfaceDimension(100, 100, id)
    this.setState({img: {
        name: `info.jpg`,
        width:100,
        height:100,
      }});
  }

  _changeSurfaceDimension(width, height, id){
    surfaceModule.resizeSurface(width, height, id)
  }

  pauseAudio(){

  }

  playSound(){
    this.setState({
      isPlaying: !this.state.isPlaying
    }, function(){
      if (this.state.isPlaying) {
        AudioModule.createAudio(this.props.id, {
          source: asset(this.props.url),
          volume: 0.5
        });

        AudioModule.play(this.props.id);
      }
      else {
        AudioModule.stop(this.props.id);
      }
    });


  }

  loadVideo = () => {

    // Play fish video
    VideoModule.createPlayer('myplayer');
    VideoModule.play('myplayer', { source: {url: asset(this.props.url).uri}, muted: false });
    Environment.setScreen('default', 'myplayer', 'default', 0, 0, 400, 200);
  };


  render(){
    const { img, isPlaying } = this.state


    return (
        <View style={styles.displayPanel} onEnter={() => this.transformDisplay(this.props.id)} onExit={() => this.resetPanel(this.props.id)}>
          {img.name && (<Image source={asset(`${img.name}`)} style={{borderRadius: 50, width: img.width, height: img.height}}/>)}

            {this.props.contentType === 'text' && (
                <View style={styles.attractionBox}>
                  <Text style={styles.attractionText}>
                     {this.props.text}
                  </Text>
                </View>
            )}

            {this.props.contentType === 'video' && (
                <View style={{flex:1}}>
                  <VideoPlayer
                      muted={true}
                      source={{url: asset(this.props.url).uri}}
                      stereo={'2D'}
                      style={{
                        width: 450,
                        height: 220
                      }}
                  />
                </View>
            )}

            {this.props.contentType === 'audio' && (
              <View style={{height:150, marginTop: 50}}>
                <VrButton
                    onClick={() => this.playSound()}
                    style={styles.greetingBox}>
                    <Text style={styles.greeting}>
                      {`${isPlaying ? 'PAUSE' : 'PLAY'} AUDIO`}
                    </Text>
                </VrButton>
              </View>
            )}

        </View>
    )
  }
}

class NavigationPanel extends React.Component {
  state = {
    img: {
      name: 'up.png',
      height:100,
      width:100
    }
  }

  goToPage(id){
    if(id === 'lobby'){
      surfaceModule.openLobby();
    }else if(id === 'exterior'){
      surfaceModule.openExterior();
    }
  }

  render(){
    const { img } = this.state

    return (
        <VrButton style={styles.displayPanel} onClick={() => this.goToPage(this.props.id)}>
          <Image source={asset(`${img.name}`)} style={{borderRadius: 50, width: img.width, height: img.height}}/>
          <View style={styles.attractionBox}>
            <Text style={styles.attractionText}>
              {this.props.text}
            </Text>
          </View>
        </VrButton>
    )
  }
}


export default class webtips_virtual_tour extends React.Component {


  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      currentState: "exterior",

      // Note: think carefully before initializing
      // state based on props!
      someInitialValue: this.props.initialValue
    }
  }

  render() {
    return (
      <View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 2000,
    height: 600,
    overflow:'visible',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayPanel: {
    width:100,
    height:100,
    flexDirection: 'column'
  },
  buttonExterior: {
    position:'absolute',
    top:300,
    left:1000,
    width:50,
    height:50,
    borderRadius: 50,
    backgroundColor: '#000000'
  },
  attractionBox: {
    padding:20,
    backgroundColor: 'white',
    width:500,
    borderWidth:2
  },
  attractionText: {
    fontSize: 30,
    color: 'black'
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('webtips_virtual_tour', () => webtips_virtual_tour);
AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
AppRegistry.registerComponent('NavigationPanel', () => NavigationPanel);
