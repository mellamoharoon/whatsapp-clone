import styled from 'styled-components'
import {Avatar} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import {Button} from '@material-ui/core'
import * as EmailValidator from 'email-validator'
import {auth, db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from './Chat'

const Sidebar = () => {
  const [user] = useAuthState(auth)
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
  const [chatSnapshot] = useCollection(userChatRef)

  const createChat = () => {
    const input = prompt("Please enter an email address for the user you wish to chat with")

    if (!input) return null;

    if (EmailValidator.validate(input) && !chatAlreadyExits(input) && input !== user.email) {
      // We add the chat into the DB 'chats' collection if it doesnt already exist and is valid
      db.collection('chats').add({
        users: [user.email, input],
      })
    }
  }

  const chatAlreadyExits = (recipientEmail) => 
    !!chatSnapshot?.docs.find(chat => chat.data().users.find(user => user === recepientEmail)?.length > 0)

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

        <IconContainer>
        <IconButton>
          <ChatIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
        </IconContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of chats */}
      {chatSnapshot?.docs.map(chat => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  )
}

export default Sidebar

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {boder-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover (
    opacity: 0.8;
  )
`;

const IconContainer = styled.div``;