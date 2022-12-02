// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Module} from 'react-360-web';

let r360, lobbyPanel, exteriorPanel, marketPanel, museumPanel, shoppingPanel, lmuseumPanel, lmarketPanel, lshoppingPanel, marketPanelRender, shoppingPanelRender, museumPanelRender, lobbyPanelRender, exteriorPanelRender, lmarketPanelRender, lmuseumPanelRender, lshoppingPanelRender;
function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
    nativeModules: [surfaceModule => new SurfaceModule()]
  });

  marketPanel = new Surface(100, 100, Surface.SurfaceShape.Flat);

  marketPanel.setAngle(0.2, 0);

  museumPanel = new Surface(100, 100, Surface.SurfaceShape.Flat)

  museumPanel.setAngle(Math.PI / 2, 0)

  shoppingPanel = new Surface(100, 100, Surface.SurfaceShape.Flat)

  shoppingPanel.setAngle(3.6, 0)

  lmarketPanel = new Surface(100, 100, Surface.SurfaceShape.Flat);

  lmarketPanel.setAngle(0.5, 0);

  lmuseumPanel = new Surface(100, 100, Surface.SurfaceShape.Flat)

  lmuseumPanel.setAngle(Math.PI / 2, 0)

  lshoppingPanel = new Surface(100, 100, Surface.SurfaceShape.Flat)

  lshoppingPanel.setAngle(5, 0)

  lobbyPanel = new Surface(100, 100, Surface.SurfaceShape.Flat);

  lobbyPanel.setAngle(3.8, 0);

  exteriorPanel = new Surface(100, 100, Surface.SurfaceShape.Flat);

  exteriorPanel.setAngle(4.5, 0);

  lobbyPanelRender = r360.renderToSurface(
      r360.createRoot('NavigationPanel', {id: 'lobby'}),
      lobbyPanel
  );

  marketPanelRender = r360.renderToSurface(
      r360.createRoot('InfoPanel', {id: 'market', contentType: 'video', url: 'Section1_ES.mp4'}),
      marketPanel
  );

  shoppingPanelRender = r360.renderToSurface(
      r360.createRoot('InfoPanel', {id: 'shopping', contentType: 'audio', url: 'song.mp3'}),
      shoppingPanel
  );

  museumPanelRender = r360.renderToSurface(
      r360.createRoot('InfoPanel', {id: 'museum', contentType: 'text', text: 'Es importante descansar bien la noche antes de la cirugía.\n' +
            'Asegúrese de que usted y su hijo descansen. El sueño ayudará a su hijo a recuperarse más rápidamente de la cirugía.'}),
      museumPanel
  );


  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('childrens-orange-county-Hospital-Exterior.jpeg'));
}

class SurfaceModule extends Module {
  constructor(){
    super('surfaceModule')
  }

  resizeSurface(width, height, id){
    if(id === 'museum'){
      museumPanel.resize(width, height)
    } else if (id === 'market'){
      marketPanel.resize(width, height)
    } else if(id === 'shopping'){
      shoppingPanel.resize(width, height)
    }else if(id === 'lshopping'){
      lshoppingPanel.resize(width, height)
    }else if(id === 'lmarket'){
      lmarketPanel.resize(width, height)
    }else if(id === 'lmuseum'){
      lmuseumPanel.resize(width, height)
    }
  }

  openLobby(){

    r360.compositor.setBackground(r360.getAssetURL('lobby.jpeg'));

    exteriorPanelRender = r360.renderToSurface(
        r360.createRoot('NavigationPanel', {id: 'exterior'}),
        exteriorPanel
    );

    lmarketPanelRender = r360.renderToSurface(
        r360.createRoot('InfoPanel', {id: 'lmarket', contentType: 'audio', url: 'song.mp3'}),
        lmarketPanel
    );

    lshoppingPanelRender = r360.renderToSurface(
        r360.createRoot('InfoPanel', {id: 'lshopping', contentType: 'video', url: 'Section1_ES.mp4'}),
        lshoppingPanel
    );

    lmuseumPanelRender = r360.renderToSurface(
        r360.createRoot('InfoPanel', {id: 'lmuseum', contentType: 'text', text: 'Es importante descansar bien la noche antes de la cirugía.\n' +
              'Asegúrese de que usted y su hijo descansen. El sueño ayudará a su hijo a recuperarse más rápidamente de la cirugía.'}),
        lmuseumPanel
    );


    r360.detachRoot(museumPanelRender)
    r360.detachRoot(shoppingPanelRender)
    r360.detachRoot(lobbyPanelRender)
    r360.detachRoot(marketPanelRender)
  }

  openExterior(){

    r360.compositor.setBackground(r360.getAssetURL('childrens-orange-county-Hospital-Exterior.jpeg'));

    lobbyPanelRender = r360.renderToSurface(
        r360.createRoot('NavigationPanel', {id: 'lobby'}),
        lobbyPanel
    );

    marketPanelRender = r360.renderToSurface(
        r360.createRoot('InfoPanel', {id: 'market', contentType: 'video', url: 'Section1_ES.mp4'}),
        marketPanel
    );

    shoppingPanelRender = r360.renderToSurface(
        r360.createRoot('InfoPanel', {id: 'shopping', contentType: 'audio', url: 'song.mp3'}),
        shoppingPanel
    );

    museumPanelRender = r360.renderToSurface(
        r360.createRoot('InfoPanel', {id: 'museum', contentType: 'text', text: 'Es importante descansar bien la noche antes de la cirugía.\n' +
              'Asegúrese de que usted y su hijo descansen. El sueño ayudará a su hijo a recuperarse más rápidamente de la cirugía.'}),
        museumPanel
    );


    r360.detachRoot(lmuseumPanelRender)
    r360.detachRoot(lshoppingPanelRender)
    r360.detachRoot(exteriorPanelRender)
    r360.detachRoot(lmarketPanelRender)

  }
}


window.React360 = {init};
