import { FlatList, ActivityIndicator } from 'react-native'
import UserListItem from '../../components/UserListItem/UserListItem'
import { listUsers } from './queries'
import { useQuery } from '@apollo/client'
import ApiErrorMessage from '../../components/ApiErrorMessage'
import { ListCommentsQueryVariables, ListUsersQuery } from '../../API'
const UserSearchScreen = () => {
  const {data, loading, error, refetch} = useQuery<ListUsersQuery, ListCommentsQueryVariables>(listUsers)

  if(loading){ return <ActivityIndicator/> }
  if(error){ return <ApiErrorMessage title="Error fetching users" message={error.message} /> }

  //pb : Appsync is still returning to us the deleted users. We need to filter them out. But true solution would be to not querying them in the first place
  const users = (data?.listUsers?.items || []).filter(user => user && !user._deleted)
  console.log(users, 'lets go')
  return (
    <FlatList
        data={users}
        renderItem={({item}) => item && <UserListItem user={item}/>} 
        onRefresh={() =>refetch()}
        refreshing={loading}
    />
  )
}

export default UserSearchScreen