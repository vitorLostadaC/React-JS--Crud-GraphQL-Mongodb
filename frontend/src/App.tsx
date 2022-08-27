import { Container, Item } from "./AppStyle";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { BiPencil } from "react-icons/bi";
import { useState } from "react";
import { ModalClient } from "./Components/ModalClient/ModalClient";
import { useQuery, useMutation, gql } from "@apollo/client";
import { client } from "./lib/apollo";

interface Client {
  id: string;
  name: string;
  email: string;
}

export const GET_CLIENTS = gql`
  query clients {
    clients {
      id
      name
      email
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($deleteClientId: String!) {
    deleteClient(id: $deleteClientId)
  }
`;

export default function App() {
  const getClients = useQuery<{ clients: Client[] }>(GET_CLIENTS);
  const [deleteClient, deleteClientInfo] = useMutation<
    { deleteClient: string },
    { deleteClientId: string }
  >(DELETE_CLIENT);
  const [modalInfo, setModalInfo] = useState({
    open: false,
    isEdit: false,
    currentId: "",
  });

  const handleCloseModal = () => {
    setModalInfo({
      open: false,
      isEdit: false,
      currentId: "",
    });
  };

  const handleDeleteClient = (id: string) => {
    deleteClient({
      variables: {
        deleteClientId: id,
      },
      update: (cache, { data }) => {
        const clientsReponse = client.readQuery<{ clients: Client[] }>({
          query: GET_CLIENTS,
        });

        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: clientsReponse?.clients.filter(
              (client) => client.id !== id
            ),
          },
        });
      },
    });
  };

  return (
    <>
      <ModalClient info={modalInfo} closeModal={handleCloseModal} />
      <Container>
        <Item
          isAddCard={true}
          onClick={() =>
            setModalInfo({
              open: true,
              isEdit: false,
              currentId: "",
            })
          }
          data-testid="open-modal-add"
        >
          <IoAdd size={25} />
          <p>Adicionar novo cliente</p>
        </Item>
        {getClients.data?.clients.map((client) => (
          <Item key={client.id}>
            <div className="info">
              <p className="title">{client.name}</p>
              <p className="sub-title">{client.email}</p>
            </div>
            <div className="icons">
              <BiPencil
                data-testid="open-modal-edit"
                size={25}
                onClick={() =>
                  setModalInfo({
                    open: true,
                    isEdit: true,
                    currentId: client.id,
                  })
                }
              />
              <IoTrashOutline
                size={25}
                onClick={() => handleDeleteClient(client.id)}
                data-testid="delete-client"
              />
            </div>
          </Item>
        ))}
      </Container>
    </>
  );
}
