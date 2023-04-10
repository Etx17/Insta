import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from '../Carousel/Carousel';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { Post } from '../../API';
import styles from './styles';
import { Storage } from 'aws-amplify';

interface IContent {
    post: Post;
    isVisible: boolean;
}

const Content = ({post, isVisible}: IContent) => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imagesUri, setImagesUri] = useState<string[] | null>(null);

    useEffect(() => {
        downloadMedia()
    }, [])

    const downloadMedia = async () => {
        console.log('post.image', post.image);
        
        if(post.image){
            // Download the image
            const uri = await Storage.get(post.image);
            setImageUri(uri);
        } else if(post.images){
            const uris = await Promise.all(post.images.map(image => Storage.get(image)));
            setImagesUri(uris);
        }
    };

    if (imageUri) { /// HERE
     return (
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.image}
          />
     );
    } else if (imagesUri) {
      return <Carousel images={imagesUri} onDoublePress={()=>("")} />;
    } else if (post.video){
      return (
          <VideoPlayer uri={post.video} paused={!isVisible}/>
      )
    }

  return (
    <View>
      <ActivityIndicator/>
    </View>
  )
}

export default Content