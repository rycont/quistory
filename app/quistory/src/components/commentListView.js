import React from 'react'
import {View, FlatList} from 'react-native'
import CommentListByQuestion from './commentListByQuestion'

import {gql} from 'apollo-boost'
import {useQuery, useMutation} from 'react-apollo'

const GET_COMMENTS_BY_USER = gql`
  query getCommentsByUser($userId: String!) {
    questions {
      comments(where: {user: $userId}, sort: "question") {
        contents
        created_at
      }
      contents
      user {
        name
      }
      created_at
    }
  }
`

const CommentListView = ({
  navigation: {
    state: {
      params: {userId},
    },
  },
}) => {
  const {data, error, loading} = useQuery(GET_COMMENTS_BY_USER, {
    variables: {
      userId: String(userId),
    }
  })
  if (loading) return <></>
  if(error) console.log(error)
  const questionsWithComments = data.questions.filter(e => e.comments.length)
  return (
    <FlatList
      data={questionsWithComments}
      renderItem={({item}) => (
        <CommentListByQuestion
          question={item.contents}
          created_at={new Date(item.created_at)}
          user={item.user.name}
          comments={item.comments}
        />
      )}
      keyExtractor={i => i.id}
      style={{
        marginTop: 10,
        paddingLeft: 9,
        paddingRight: 9,
      }}
    />
  )
}

CommentListView.navigationOptions = () => ({
  title: '작성한 댓글',
})

export default CommentListView
