import { auth } from 'firebase';
import { useAuth } from '../lib/auth';
import { Text, Button, ButtonGroup } from '@chakra-ui/react';

export default function Home() {
  const auth = useAuth();
  console.log(auth);
  return (
    <div>
      <main>
        <h1>
          Hi Dawn <a href="https://nextjs.org"> I edited my live page</a>
        </h1>

        <p>
          Get started by <code>loging In</code>
        </p>

        <div style={{ display: 'flex' }}>
          {!auth.user ? (
            <Button colorScheme="blue" onClick={(e) => auth.signinWithGithub()}>
              Log In
            </Button>
          ) : (
            <Button colorScheme="green" onClick={(e) => auth.signOut()}>
              Sign Out
            </Button>
          )}
        </div>
        <div>
          {auth.user ? (
            <div>
              {' '}
              <Text color="cyan">Hello {auth.user.displayName}</Text>{' '}
              <img src={auth.user.photoURL} alt="pic of user" />{' '}
            </div>
          ) : (
            <Text color="tomato">not logged in</Text>
          )}
        </div>
      </main>
    </div>
  );
}
