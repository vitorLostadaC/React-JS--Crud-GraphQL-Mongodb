import { Container, Item } from "./AppStyle";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { BiPencil } from "react-icons/bi";
import { useState } from "react";
import { ModalClient } from "./Components/ModalClient/ModalClient";

interface Client {
  id: string;
  name: string;
  email: string;
}

export default function App() {
  const [modalInfo, setModalInfo] = useState({
    open: false,
    isEdit: false,
    currentId: "",
  });

  const clientsDataTest: Client[] = [
    {
      id: "1",
      name: "Vitor",
      email: "vitorlostada@hotmail.com",
    },
  ];

  const handleCloseModal = () => {
    setModalInfo({
      open: false,
      isEdit: false,
      currentId: "",
    });
  };

  const handleDeleteClient = () => {};

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
        {clientsDataTest?.map((client) => (
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
                onClick={handleDeleteClient}
                data-testid="delete-client"
              />
            </div>
          </Item>
        ))}
      </Container>
    </>
  );
}
