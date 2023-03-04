import { Image, FlatList } from 'react-native'
import React from 'react'
import user from '../../assets/data/user.json'
import { IPost } from '../../types/models'
import FeedGridItem from './FeedGridItem';

interface IFeedGridView {
    data: IPost[];
    ListHeaderComponent?:  | React.ComponentType<any> | React.ReactElement | null | undefined;
}

const FeedeGridView = ({data, ListHeaderComponent}: IFeedGridView) => {
  return (
    <FlatList
    data = {data}
    renderItem={({item}) => <FeedGridItem post={item}/> }
    numColumns={3}
    showsVerticalScrollIndicator={false}
    ListHeaderComponent={ListHeaderComponent}
    style={{marginHorizontal: -1}}
  />
  )
}

export default FeedeGridView