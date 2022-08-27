import { useLazyQuery, useMutation, gql } from "@apollo/client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GET_CLIENTS } from "../../App";
import { client } from "../../lib/apollo";
import { Overlay, Content } from "./ModalClientStyle";

interface Props {
  info: {
    open: boolean;
    isEdit: boolean;
    currentId: string;
  };
  closeModal: () => void;
}

type Client = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  adress: string;
  tel: string;
};

type ClientWithoutId = Omit<Client, "id">;

const GET_CLIENT = gql`
  query client($clientId: String!) {
    client(id: $clientId) {
      id
      name
      email
      cpf
      adress
      tel
    }
  }
`;

const ADD_CLIENT = gql`
  mutation CreateClient($createClientObject: CreateClientInput!) {
    createClient(createClientObject: $createClientObject) {
      id
      name
      email
      cpf
      adress
      tel
    }
  }
`;

const EDIT_CLIENT = gql`
  mutation editClient($editClientObject: EditClientInput!) {
    editClient(editClientObject: $editClientObject) {
      id
      name
      email
      cpf
      adress
      tel
    }
  }
`;

export function ModalClient({ info, closeModal }: Props) {
  const [getClient, getClientInfo] = useLazyQuery<
    { client: Client },
    { clientId: string }
  >(GET_CLIENT);

  const [createClient, createClientInfo] = useMutation<
    { createClient: Client },
    { createClientObject: ClientWithoutId }
  >(ADD_CLIENT);

  const [editClient, editClientInfo] = useMutation<
    { editClient: Client },
    { editClientObject: Client }
  >(EDIT_CLIENT);

  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    adress: "",
    tel: "",
    cpf: "",
  });

  useEffect(() => {
    if (!info.isEdit) return;

    async function getValues() {
      const currentClient = await getClient({
        variables: { clientId: info.currentId },
      });

      setValues({
        id: currentClient.data?.client.id,
        name: currentClient.data?.client.name,
        email: currentClient.data?.client.email,
        adress: currentClient.data?.client.adress,
        cpf: currentClient.data?.client.cpf,
        tel: currentClient.data?.client.tel,
      } as Client);
    }
    getValues();
  }, [info]);

  function handleChangeValues(event: ChangeEvent<HTMLInputElement>) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.id]: event.target.value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (info.isEdit) handleEditClient();
    else handleAddNewClient();
  }

  async function handleAddNewClient() {
    await createClient({
      variables: {
        createClientObject: {
          tel: values.tel,
          name: values.name,
          adress: values.adress,
          cpf: values.cpf,
          email: values.email,
        },
      },
      update: (cache, { data }) => {
        const clientsReponse = client.readQuery<{ clients: Client[] }>({
          query: GET_CLIENTS,
        });

        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: [
              ...(clientsReponse?.clients as any),
              {
                id: data?.createClient.id,
                name: data?.createClient.name,
                email: data?.createClient.email,
              },
            ],
          },
        });
      },
    });

    closeModal();
    setValues({
      id: "",
      name: "",
      email: "",
      adress: "",
      tel: "",
      cpf: "",
    });
  }

  async function handleEditClient() {
    await editClient({
      variables: {
        editClientObject: values,
      },
      update: (cache, { data }) => {
        const clientsReponse = client.readQuery<{ clients: Client[] }>({
          query: GET_CLIENTS,
        });

        cache.writeQuery({
          query: GET_CLIENT,
          data: {
            clients: clientsReponse?.clients.map((client) => {
              if (client.id === data?.editClient.id)
                return {
                  id: data?.editClient.id,
                  name: data?.editClient.name,
                  email: data?.editClient.email,
                };
              return client;
            }),
          },
        });
      },
    });

    closeModal();
    setValues({
      id: "",
      name: "",
      email: "",
      adress: "",
      tel: "",
      cpf: "",
    });
  }

  if (!info.open) return <></>;

  return (
    <>
      <Overlay>
        <Content>
          <h2>{info.isEdit ? "Editar " : "Cadastrar "}cliente</h2>
          <form onSubmit={handleSubmit}>
            <div className="box">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                title="teste"
                id="name"
                value={values.name}
                required
                onChange={handleChangeValues}
              />
            </div>
            <div className="box">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={values.email}
                required
                onChange={handleChangeValues}
              />
            </div>
            <div className="box">
              <label htmlFor="adress">Endereço:</label>
              <input
                type="text"
                id="adress"
                value={values.adress}
                required
                onChange={handleChangeValues}
              />
            </div>
            <div className="box">
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                value={values.cpf}
                required
                onChange={handleChangeValues}
              />
            </div>
            <div className="box">
              <label htmlFor="tel">Telefone:</label>
              <input
                type="text"
                id="tel"
                value={values.tel}
                required
                onChange={handleChangeValues}
              />
            </div>

            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  setValues({
                    id: "",
                    name: "",
                    email: "",
                    adress: "",
                    tel: "",
                    cpf: "",
                  });
                }}
              >
                Cancelar
              </button>
              <button type="submit">Salvar</button>
            </div>
          </form>
        </Content>
      </Overlay>
    </>
  );
}
