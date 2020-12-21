import { auth } from 'firebase';
import { useAuth } from '../lib/auth';
import { Text, Button, ButtonGroup, Icon, Flex } from '@chakra-ui/react';
import { DiTerminal } from 'react-icons/di';
import { Head } from 'next/head';

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        height="100vh"
      >
        <Icon as={DiTerminal} color="cyan.500" boxSize="32" />

        <div style={{ display: 'flex' }}>
          {!auth.user ? (
            <Button onClick={(e) => auth.signinWithGithub()}>Log In</Button>
          ) : (
            <Button colorScheme="red" onClick={(e) => auth.signOut()}>
              Sign Out
            </Button>
          )}
        </div>
        <div>
          {auth.user ? (
            <div>
              <Text color="cyan">Hello {auth.user.displayName}</Text>{' '}
              <img src={auth.user.photoURL} alt="pic of user" />{' '}
            </div>
          ) : (
            <Text color="tomato"></Text>
          )}
        </div>
      </Flex>
    </div>
  );
}
