import { FlatList, ViewabilityConfig, ViewToken, Text, ActivityIndicator} from "react-native";
import { useRef, useState } from "react";
import FeedPost from "../../components/FeedPost/FeedPost";
import { useQuery } from "@apollo/client";
import { listPosts } from "./queries";



const HomeScreen = () => {
  
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const {data, loading, error} = useQuery(listPosts);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );

  if (loading) { return <ActivityIndicator/>; }

  if (error) { return <Text>{error.message}</Text>; }

  const posts = data.listPosts.items;

  return (
      <FlatList
        data = {posts}
        renderItem={({item}) => <FeedPost post={item} isVisible={activePostId === item?.id}/>}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />

  )
};


export default HomeScreen;