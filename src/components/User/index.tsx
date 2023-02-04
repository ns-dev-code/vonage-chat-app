import React, { useEffect, useState } from 'react';
import { Button, Grid, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import { useCreateUserMutation, useGetUsersQuery } from '../../store/api/vonage/usersSlice';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUserId } from '../../store/api/vonage/usersLocalSlice';
import { RootState } from '../../store/store';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 200px;
  height: 40px;
  margin: 10px;
  padding: 0 10px;
  font-size: 16px;
`;

const StyledButton = styled(Button)`
  height: 40px;
  margin: 10px;
  font-size: 16px;
  text-transform: none;
`;

const Select = styled.select`
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
  margin-bottom: 10px;
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px;
`;
/**
 * @description User Form Componet
 */
const CreateUserForm = () => {
  const [username, setUsername] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [createUser, { isLoading, isError, error, isSuccess }] = useCreateUserMutation();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(error['data'].description, { variant: 'error' });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('User Created Successfully', { variant: 'success' });
    }
  }, [isSuccess]);

  /**
   *
   * @param event
   * @description Create's user
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser({
      body: {
        name: username,
        display_name: username,
      },
    });
    setUsername('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <StyledButton color='primary' variant='contained' disabled={!username || isLoading} type='submit'>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
        Create User
      </StyledButton>
    </Form>
  );
};

type User = {
  id: string;
  name: string;
};
type UserListPageProps = {
  users: User[];
  handleUser: (user: string) => void;
  selectedUserId: string;
};

/**
 *
 * @Component to render user's list
 */
const UserListPage = ({ users, handleUser, selectedUserId }: UserListPageProps) => {
  return (
    <>
      <Select value={selectedUserId} onChange={(event) => handleUser(event.target.value)}>
        <option value=''>Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Select>
    </>
  );
};

const UserComponent = () => {
  const { data, isLoading, isError } = useGetUsersQuery({ page_size: 100, order: 'asc' });
  const selectedUserId = useSelector((state: RootState) => state.usersLocalSlice.selectedUserId);
  const dispatch = useDispatch();

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  if (isError) {
    return <h2>Unable to load users.</h2>;
  }

  return (
    <Grid container alignItems={'center'} display='flex' direction='column'>
      <UserListPage
        selectedUserId={selectedUserId}
        handleUser={(userId) => {
          dispatch(setSelectedUserId(userId));
        }}
        users={data?.users}
      />
      {selectedUserId && (
        <UserItem>{`Connected as : ${data?.users?.find((user) => user?.id === selectedUserId)?.name}`}</UserItem>
      )}
      <CreateUserForm />
    </Grid>
  );
};

export default React.memo(UserComponent);
