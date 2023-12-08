import React, { useRef, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
// import { Video, ResizeMode } from "expo-av";
import { height, width } from "../../utils/Dimention";
import { useRecoilValue } from "recoil";
import { briefUploadUrl } from "../../atom/eventState";
import VideoPlayer from "react-native-video-player";

const ReadVideo = ({ item }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const urlUpload = useRecoilValue(briefUploadUrl);
  const videoUrl = `${urlUpload}${item}`;
  console.log("nameeeeeeeeeeeeeeeeeee mp4",item);
  return (
    <View style={styles.container}>
    <VideoPlayer video={{uri: `http://149.202.214.99:8085/PAC/Brief/${item}`}}   // Can be a URL or a local file.
      />
      {/* <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onError={()=> console.log('no thing to display here ')}
      /> */}
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
};

export default ReadVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  video: {
    alignSelf: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});
