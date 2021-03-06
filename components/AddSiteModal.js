import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { useToast } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createSite } from '@/lib/db';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const auth = useAuth();
  const initialRef = useRef();

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      ...data,
    };
    createSite(newSite);
    toast({
      title: `${data.site} added`,
      description: `We have added site: ${data.url}`,
      position: 'top-right',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    mutate(
      '/api/sites',
      async (data) => {
        return { sites: [...data.sites, newSite] };
      },
      false
    );
    onClose();
  };

  return (
    <>
      <Button
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.800', transfrom: 'scale(0.95)' }}
        onClick={onOpen}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                ref={register({ required: true, maxLength: 80 })}
                placeholder="My Site"
                name="name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="http://wwww.google.com"
                ref={register({ required: true, maxLength: 80 })}
                name="url"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="teal">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
