import styled from 'styled-components/native'
import React from 'react'
const Comment = styled.View`
    background-color: white;
    padding: 12px;
    border: 0px solid rgba(0, 0, 0, 0.1);
    border-top-width: 1px;
    `
const Author = styled.Text`
    color: #202020;
    font-weight: bold;
    margin-bottom: 2px;
    `
const Content = styled.Text`
    color: #202020;
    `
export default ({author, content}) => <Comment>
<Author>{author.name}</Author>
<Content>{content}</Content>
</Comment>