import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Wikitude from 'react-native-wikitude';
import { NativeEventEmitter, NativeModules } from 'react-native'

const landmarkSize = 2;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
    faces: [],
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality["288p"],
    },
    isRecording: false
  };

  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    Wikitude.startAR(
      'http://192.168.15.18/~tomas/wikitude-sdk-samples-master/04_CloudRecognition_2_ContinuousImageRecognition/index.html',
       true, true, true, 
       "InQzAh2G6f/gJqZluqwQemFT6jEsP+2QXTHZ4gmqxp9WT5yiDsIMIv8dZZPDwGiztFOnXVL7J8BU21ByRV3CxL923k9SLdKjRvtlN9nTj7nxBGLrK9zGrdlI8eYSM0an1J7HKCgo4kznVeOiY4910o1GT8dw4gs6ZN5SWZ7XmuRTYWx0ZWRfX2E1yuA4aeg+A0ikT1OJVMZZAv/04eyqPz39iN8Ot8XgYmthegJxnaZduQqB5hut0elhksNVQ14mkLLGiUuBA+idcqd99vFarJYLXaNwXT4HW1FZSSt/NdTiXXgANWnul9Uaj/1qFKM0ajMwUTDlgIzZ6OOi+eQvqDcbvk8DFhS9zOEcb3NNQfNwxoR5LEfmjSYIv5r3d6FRPRayd6wtCenY2NSnPIXlDcmYeXL6liL1GjvSo++XfEJ1WVB3hyr2gR8MUzp3JzEbbz6N/s6uUoSfpRKIFGwWcJOjhD9+cIo+j680M274qkm2whz75JUTTlzjOq91yc/usfKUPkk3l2N/Qu2s9k9Zu4dx9IWj1A2P0xsVwVbIzZuDp0D0dH/TiXa0OkboDYT7g/ZXV5D4nIYjgClBOVUknhXMQTB9E+gMO60msIPZnPkWcMScpLnbATQmiYexMjJybLrPqySdRo79HThmC/k+0wVdhF+fdTEI6NErV4ohK3C8S2gEKfWNkhM1vGwUzQr4xu8e9TE6N6OPudBrF+2fmQ=="

       //"sjBcpdQjTky0I/LdId5SvJysjSDyMqhiL2noR8kJsvjxfP3Q7BfqtVvX6LRoPjHJnR09+emEwH45C2B8/iQzXdw/mbyFk30WEjSj7XcwV7xb2uxgvaIDtuTiOCtywEvC5bBI9FZj8uNIUdDk1EUl7mShAksowOCIQCGo98Ogjv5TYWx0ZWRfX2QuNoGeqWNy/o1ES2mHThh6+ZmEtVgFu7hA8Hd65HPiATRvMrXrfV/REvEBAjg8AZ1SgqpQAYOQLYe9qP7DEWTwydVM+Puoqr2e068Pz1v6uStsK/9D8PHjyRHpuKV80McSJOSYUu+Cs4csfnIrfsLxUz8Qi14tCWm0gm5zpPttWW1oKGO8gVra/rVz6GekIhdkOAVgn1XZn60fuGhissKT8p7sKR2yUT2hzT1MLXkYm8rQbjjco+gXB+4bNfnPX+9dQ1FuHzZ4Tr21nZrn0ff509uzWgCSKGTc4HseaF5sFWSTwx1nwREMGmKl5eQqkXD36V1pSARmTIy+qjPOI8qBBQ+vNeIjl70isUoHQbDL+8ZnPDvmWDpPoVbI3Fds1oHaWV9Vg2wB8Pkl6gFz6C/0OOxa6Kc7cwCVjywlYejdPyT2muJ/AiUOGFvobMYjDUYL23pUruQhQviA8e0LmjA8vyclYpvF6Ub71MZbX9+VfiAXmSv2/MIFeTymnUfjpaQKmqD1kun/I0HzAMLuYNWS5DCq0RoyjA=="
      )


    const wikitude = NativeModules.Wikitude
    const wikitudeEmitter = new NativeEventEmitter(Wikitude)
    const subscription = wikitudeEmitter.addListener('json-sent', (data) => { 
      // Read json
      console.log(data);
      // Dismiss
      Wikitude.stopAR();
    })


    // this.setState({
    //   flash: flashModeOrder[this.state.flash],
    // });
  }


  


  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        console.log('data: ', data);
      });
    }
  };

  takeVideo = async function() {
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          this.setState({ isRecording: false });
          console.warn(data);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

  onFacesDetected = ({ faces }) => this.setState({ faces });
  onFaceDetectionError = state => console.warn('Faces detection error:', state);

  renderFace({ bounds, faceID, rollAngle, yawAngle }) {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      >
        <Text style={styles.faceText}>ID: {faceID}</Text>
        <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
        <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
      </View>
    );
  }

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces() {
    return (
      <View style={styles.facesContainer} pointerEvents="none">
        {this.state.faces.map(this.renderFace)}
      </View>
    );
  }

  renderLandmarks() {
    return (
      <View style={styles.facesContainer} pointerEvents="none">
        {this.state.faces.map(this.renderLandmarksOfFace)}
      </View>
    );
  }

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        // faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        // onFacesDetected={this.onFacesDetected}
        // onFaceDetectionError={this.onFaceDetectionError}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
            <Text style={styles.flipText}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
            <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
            <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <Slider
            style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={[styles.flipButton, { 
              flex: 0.3, 
              alignSelf: 'flex-end',
              backgroundColor: this.state.isRecording ? 'white' : 'darkred',
            }]}
            onPress={this.state.isRecording ? () => {} : this.takeVideo.bind(this)}
          >
            {
              this.state.isRecording ?
              <Text style={styles.flipText}> ☕ </Text>
              :
              <Text style={styles.flipText}> REC </Text>
            }
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.galleryButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleView.bind(this)}
          >
            <Text style={styles.flipText}> Gallery </Text>
          </TouchableOpacity>
        </View>
        {this.renderFaces()}
        {this.renderLandmarks()}
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
});
