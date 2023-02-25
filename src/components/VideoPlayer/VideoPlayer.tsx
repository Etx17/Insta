import Video from 'react-native-video';
import {StyleSheet, View, Pressable} from 'react-native';
import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface IVideoPlayer {
    uri: string;
    paused: boolean;
}

const VideoPlayer = ({uri, paused}: IVideoPlayer) => {
  const [muted, setMuted] = useState(true);
//   Only play video if it is on screen (on actual focus) and that user can see it

  return (
    <View>
        <Video 
          source={{uri}} 
          style={styles.video} 
          resizeMode="cover" 
          repeat 
          muted={muted}
          paused={paused}
        />
        <Pressable onPress={() => setMuted(v => !v)} style={styles.muteButton}>
            <Ionicons 
              name={muted ? 'volume-mute' : 'volume-high'}
              size={15} 
              color="white" 
              style={{position: 'absolute', alignSelf: 'center'}} 
              
            />
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    video: {
        width: '100%',
        aspectRatio: 1,
    },
    muteButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 30,
        height: 30,
        backgroundColor: 'black',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default VideoPlayer