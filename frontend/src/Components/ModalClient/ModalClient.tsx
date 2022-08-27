import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Overlay, Content } from "./ModalClientStyle";

interface Props {
  info: {
    open: boolean;
    isEdit: boolean;
    currentId: string;
  };
  closeModal: () => void;
}

export function ModalClient({ info, closeModal }: Props) {
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

    //? recuperar os dados do cliente
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
    //?
  }

  async function handleEditClient() {
    //?
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
